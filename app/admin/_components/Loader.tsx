import { Loader2 } from 'lucide-react'
import React from 'react'


export default function Loader() {
  return (
    <div className=" w-full min-h-screen h-auto flex items-center justify-center bg-gradient-to-tr dark:from-[#383838] dark:via-green-400/50 dark:to-[#212121] from-[#5b5b5b] via-blue-500/80 to-[#1f1f1f]">
          <Loader2 size={35} className=' animate-spin' />
    </div>
  )
}