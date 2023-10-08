import Image from 'next/image'
import {Button} from "@/components/ui/button";
import {auth, UserButton} from "@clerk/nextjs";

export default async function Home() {


    const {userId} = await auth()
    const isAuth = !!userId


  return (
    <div className={'w-screen min-h-screen from-gray-900 to-gray-600 bg-gradient-to-r'}>
      <div className={'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}>
        <div className="flex flex-col items-center text-center ">
            <div className="flex items-center">
                <h1 className={'mr-3 text-5xl font-semibold text-slate-300'}>Chat with any pptx</h1>
                <UserButton afterSignOutUrl={'/'} />
            </div>
            <div className="flex mt-2">
                {isAuth && <Button>Go to chats!</Button>}
            </div>
            <p className={'max-w-xl mt-1 text-lg text-slate-400'}>
                join millions of students that save hours of notes re-writing
            </p>
        </div>
      </div>
    </div>
  )
}