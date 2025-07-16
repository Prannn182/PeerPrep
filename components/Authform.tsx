"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { email, z } from "zod"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import Link from "next/link";


import {Form} from "@/components/ui/form"

import { toast } from "sonner"
import Formfeild from "./formfeild"
import { useRouter } from "next/navigation"

const AuthFormSchema = (type:FormType) =>{
    return z.object({ 
        name:type==='sign-in' ? z.string().min(3):z.string().optional(),
        email:z.string().email(),
        password:z.string().min(3)
    })
}

const Authform = ({type}:{type:FormType}) => {
  const router=useRouter()
    const formSchema=AuthFormSchema(type);
     const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      password:""
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
   try{
   if(type==='sign-up'){
     toast.success('Account Created Sucessfully,Please Sign-in')
     router.push('/sign-in')
   }else{
    toast.success('Signed-in Successfully')
    router.push('/')
   }
   }catch(error)
   {
     console.log(error);
     toast.error(`There was an error: ${error}`)
   }
  }
  const isSignin = type === 'sign-in';
  return (
    <div className="card-border lg:min-w-[566px]">
        <div className="flex flex-col gap-6 card py-14 px-10">
            <div className="flex flex-row justify-center gap-2">
                <img src="/logo.svg" alt="logo" height={32} width={38}></img>
                <h2 className="text-primary-100">PeerPrep</h2>
            </div>
            <h3>Practice Interviews With AI</h3>
        
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
       {!isSignin && (<Formfeild 
       control={form.control}
        name="name" 
        label="Name" 
        placeholder="Your Name"/>)}
       <Formfeild 
       control={form.control}
        name="email" 
        label="Email" 
        placeholder="Your Email Address"
        type="email"/>
       <Formfeild 
       control={form.control}
        name="password" 
        label="Password" 
        placeholder="Enter Your Password "
        type="password"/>

        <Button className="btn" type="submit">{isSignin? 'Sign-in' : 'Create an Account'}</Button>
      </form>
    </Form>
    <p className="text-center">{isSignin? 'Don\'t have an account?': 'Already have an account?'}
        <Link href={!isSignin? '/sign-in' : '/sign-up' } className="text-user-primary ml-1 font-bold">{!isSignin? "Sign-in": "Sign-up"}</Link>
    </p>
    
    </div>
    </div>
  )
}

export default Authform
