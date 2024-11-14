import { Loader2 } from 'lucide-react'
import React from 'react'


function loading() {
  return (
    <div className=' w-full p-5 mt-10 flex justify-center items-center'>
             <Loader2 size={35} className=' animate-spin text-blue-500 dark:text-green-500' />
           </div>
  )
}

export default loading