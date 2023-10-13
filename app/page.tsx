import { Button } from "@/components/ui/button";
import { auth, ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import AnimatedText from "@/components/ui/AnimatedText";
import { checkSubscription } from "@/lib/subscriptions";
import SubscriptionButton from "@/components/ui/SubscriptionButton";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import VersionPill from "@/components/ui/VersionPill";
import UserButtonSkeleton from "@/components/ui/UserButtonSkeleton";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  const isPro = await checkSubscription();
  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }
  return (
    <div
      className={
        "w-screen min-h-screen from-gray-900 to-gray-600 bg-gradient-to-r"
      }
    >
      <div className={"p-4 flex flex-row justify-end"}>
        <div className={"p-4"}>
          <VersionPill />
        </div>
        <ClerkLoading>
          <div className={"pt-4"}>
            <UserButtonSkeleton />
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <div className={"pt-4"}>
            <UserButton afterSignOutUrl={"/"} />
          </div>
        </ClerkLoaded>
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
            {isAuth && firstChat && (
              <Link href={`/chat/${firstChat.id}`}>
                <Button>
                  Go to Chats
                  <ArrowRight className={"ml-2"} />
                </Button>
              </Link>
            )}
            <div className="ml-3">
              <SubscriptionButton isPro={isPro} />
            </div>
          </div>
          <p className={"max-w-xl mt-1 text-lg text-slate-400"}>
            The <span className={"font-semibold"}>only</span> AI file tool you
            will ever need
          </p>
          <div className="mt-4 w-96">
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
