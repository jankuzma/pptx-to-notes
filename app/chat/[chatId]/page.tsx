import ChatSideBar from "@/components/ChatSideBar";

import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";

import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";
import PDFViewer from "@/components/PDFViewer";
import ChatComponent from "@/components/ChatComponent";
import { checkSubscription } from "@/lib/subscriptions";

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats) {
    return redirect("/");
  }
  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }

  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
  const isPro = await checkSubscription();

  return (
    <div className="flex max-h-screen">
      <div className="flex max-h-screen w-full">
        <div className="max-w-xs flex-[1]">
          <ChatSideBar chats={_chats} chatId={parseInt(chatId)} isPro={isPro} />
        </div>
        <div className="max-h-screen p-4 oveflow-y-scroll flex-[5]">
          <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
        </div>
        <div className="border-l-4 border-l-slate-200 flex-[3]">
          <ChatComponent chatId={parseInt(chatId)} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
