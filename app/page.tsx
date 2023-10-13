import { Button } from "@/components/ui/button";
import { auth, UserButton } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import { LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import AnimatedText from "@/components/ui/AnimatedText";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;

  return (
    <div
      className={
        "w-screen min-h-screen from-gray-900 to-gray-600 bg-gradient-to-r flex justify-end"
      }
    >
      <div className={"p-4"}>
        <UserButton afterSignOutUrl={"/"} />
      </div>
      <div
        className={
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        }
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className={"mr-3 text-5xl font-semibold text-slate-300"}>
              <AnimatedText />
            </h1>
          </div>
          <div className="mt-2 flex">
            {isAuth && <Button>Go to chats!</Button>}
          </div>
          <p className={"max-w-xl mt-1 text-lg text-slate-400"}>
            join millions of students that save hours of notes re-writing
          </p>

          <div className="mt-4 w-full">
            {isAuth ? (
              <FileUpload></FileUpload>
            ) : (
              <Link href={"/sign-in"}>
                <Button>
                  Log In
                  <LogIn className={"w-4 h-4 ml-2"} />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
