'use client'
import Input from '@/app/admin/(dashboard)/project/_components/Input'
import TextArea from '@/app/admin/(dashboard)/project/_components/TextArea'
import React, { FormEvent, useState } from 'react'
import InputFIeldAnimation from '../../_components/Animations/InputFild-animation'
import toast from 'react-hot-toast'
import axios from 'axios'

// type Props = {}

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [ messageData, setMessageData ] = useState({
    userName:"",
    userEmail:"",
    message:""
  })
  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true);
    try {
      if(!messageData.userName || !messageData.userEmail || !messageData.message){
        toast.error("Please fill all the fields");
        return;
      }
      const response = await axios.post("/api/message",messageData);
      toast.success(response.data.message);
      setMessageData({
        message:"",
        userEmail: "",
        userName: ""
      })
    } catch (error: any) {
      console.error("Error in sending message: ", error);
      toast.error(error.response.data.message);
    }finally{
      setLoading(false);
    }
  }
  return (
    <div className=' w-full min-h-screen h-auto md:pt-[100px] pt-[90px]'>
       <div className=' px-3'>
       <p className=" md:text-2xl font-poppins text-xl max-400px:text-lg font-extrabold">
       Contact with me.
      </p>
      <p className=" max-sm:text-xs">fill all necessery fields to send a message.</p>
        <div className=' mt-5 w-full grid md:grid-cols-2 grid-cols-1 gap-5'>
        <form action="" onSubmit={handleSubmit} >
          <InputFIeldAnimation width='100%' delay={0.3}>
           <Input required placeholder='Enter your name' label='userName' state={messageData} setState={setMessageData} />
          </InputFIeldAnimation>
          <InputFIeldAnimation width='100%' delay={0.6}>
           <Input required placeholder='Enter your Email' label='userEmail' state={messageData} setState={setMessageData} />
          </InputFIeldAnimation>
          <InputFIeldAnimation width='100%' delay={0.9}>
           <TextArea required placeholder='Enter any  message here' label='message' state={messageData} setState={setMessageData} labelSupportedText='use many words to express better' />
          </InputFIeldAnimation>
           <button
          type="submit"
          disabled={loading}
          className={`p-2 w-[190px] rounded-lg border-2 max-400px:border text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white dark:border-green-500 dark:text-green-500 dark:hover:bg-green-500 dark:hover:text-white active:bg-blue-700 dark:active:bg-green-700 active:scale-95 duration-200 ease-in-out transition
       ${loading && " animate-pulse bg-blue-300/30 dark:bg-green-300/20"}
       `}
        >
          {loading ? "Loding.." : " Send Message"}
        </button>
        </form>
          <div className=' w-full h-full'>
          <div className=" w-full h-[78%] border-2 border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-700/30 flex justify-center items-center p-5 mt-10">
          <div className=" logo-bounce w-fit lg:p-5 sm:p-3 p-2 bg-[#83838348]  hover:bg-gradient-to-tl  to-indigo-500 dark:to-teal-400 dark:from-blue-500 from-pink-500 backdrop-blur rounded-xl ">
            <h1 className=" font-poppins xl:text-9xl md:text-8xl text-7xl font-extrabold text-white">
              H<span className=" text-blue-500 dark:text-green-500">.</span>
            </h1>
          </div>
        </div>
          </div>
        </div>
       </div>
      </div>
  )
}

export default Page