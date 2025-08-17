'use server';

import { auth, db } from "@/firebase/admin";
import { Auth } from "firebase-admin/auth";

import { cookies } from "next/headers";
import { any, success } from "zod";

type SignUpParams = {
  uid: string;
  name: string;
  email: string;
  password: string;
}

type SignInParams = {
  email: string;
  idToken: string;
}

export async function signUp(params:SignUpParams){
 const {uid, name, email}=params;
 try{
    const userRecord= await db.collection('users').doc(uid).get();
    if(userRecord.exists){
        return{
            success:false,
            message:'User already exists.Sign-in instead.',
        }
    }
    await db.collection('users').doc(uid).set({
        name,email
    });
    return{
        success:true,
        message:'User created successfully, Please sign-in',
    }
 }catch(e:any){
   console.log("Error creating a user",e);
   if(e.code==='auth/email-already-exists'){
    return {
        success:false,
        message:'Email already exists',
    }
   }
   return{
    success:false,
    message:'Failed to create an account',
   }
 }
}

export async function signIn(params:SignInParams) {
const {email, idToken}=params;
try{
const userRecord=await auth.getUserByEmail(email);
if(!userRecord){
    return {
        success:false,
        message:'User does not exist,Please create an account',
    }
}
    await setSessionCookies(idToken);
    return {
        success: true,
        message: 'Signed in successfully'
    };
}catch(e:any){
    console.log(e);
    return{
        success:false,
        message:'Failed to log into account',
    }
}
}

export async function setSessionCookies(idToken:string) {
    const ONE_WEEK=60*60*24*7;
    const cookieStore=await cookies();

    const sessionCookie=await auth.createSessionCookie(idToken,{
        expiresIn:ONE_WEEK*1000,
    })
    
    cookieStore.set('session',sessionCookie,{
      maxAge:ONE_WEEK,
      httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        path:'/',
        sameSite:'lax',
    })
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // get user info from db
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();
    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log(error);

    // Invalid or expired session
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}