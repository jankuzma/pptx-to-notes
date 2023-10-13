"use client";
import React, { useState } from "react";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import SubscriptionButton from "@/components/ui/SubscriptionButton";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
  isPro: boolean;
};

const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={"w-full h-screen p-4 text-gray-200 bg-gray-900"}>
      <div className={"flex flex-col justify-between max-h-screen h-full"}>
        <div>
          <div className={"flex"}>
            <Button
              className={
                "bg-slate-200 text-slate-950 w-full hover:bg-slate-300"
              }
            >
              <PlusCircle className={"w-4 h-4 mr-2"} />
              New Chat
            </Button>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            {chats.map((chat) => (
              <Link key={chat.id} href={`/chat/${chat.id}`}>
                <div
                  className={cn(
                    "rounded-lg p-3 text-slate-300 flex items-center",
                    {
                      "bg-blue-600 text-white": chat.id === chatId,
                      "hover:text-white": chat.id !== chatId,
                    },
                  )}
                >
                  <MessageCircle className={"mr-2"} />
                  <p
                    className={
                      "w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis"
                    }
                  >
                    {chat.pdfName}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className={"flex items-center justify-center"}>
          <SubscriptionButton isPro={isPro} />
        </div>
      </div>
    </div>
  );
};

export default ChatSideBar;
