import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { dummyInterviews } from "@/constants";
import InterviewCard from "@/components/InterviewCard";

const Page = () => {
  console.log("hey");
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice and Feedback</h2>
          <p className="text-lg">Practice on real interview questions and get instant feedback</p>
          <Button asChild className="btn-primary mx-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image src="/robot.png" alt="robot-dude" className="max-sm:hidden" width={400} height={400}></Image>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interview-section">
         {dummyInterviews.map((interview)=>(
          <InterviewCard { ...interview} key={interview.id} />
         ))}
        </div>
      </section>
    <section className="flex flex-col gap-6 mt-8">
      <h2>Take an Interview</h2>
      <div className="interview-section">
        {dummyInterviews.map((interview)=>(
          <InterviewCard { ...interview} key={interview.id}/>
         ))}
        {/* <p>There are no interviews available</p> */}
      </div>
    </section>
    </>
  );
};

export default Page;
