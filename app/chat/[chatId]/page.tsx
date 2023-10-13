import ChatSideBar from "@/components/ChatSideBar";

import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";

import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";
import PDFViewer from "@/components/PDFViewer";
import ChatComponent from "@/components/ChatComponent";

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

  return (
    <div className="flex max-h-screen overflow-scroll">
      <div className="flex max-h-screen w-full overflow-scroll">
        <div className="max-w-xs flex-[1]">
          <ChatSideBar chats={_chats} chatId={parseInt(chatId)} />
        </div>
        <div className="max-h-screen p-4 oveflow-scroll flex-[5]">
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
