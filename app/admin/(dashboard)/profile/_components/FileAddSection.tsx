'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Facebook, File, Instagram, Linkedin, Upload } from 'lucide-react'
import { IUser } from '@/lib/models/userSchema';
import { useRouter } from 'next/navigation';

const MAX_FILE_SIZE = 50 * 1024;
type Props = {
    user:IUser
}
const FileAddSection = ({user}:Props) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [links, setLinks] = useState({
        faceBookLink:"",
        instaLink:"",
        linkdeenLink:""
    })
    const [pdf, setPdf] = useState("");
    const fileUploader = (e:ChangeEvent<HTMLInputElement>) => {
       const file = e.target.files?.[0]
       if(!file){
        return;
       }
       if(file.size > MAX_FILE_SIZE){
        toast.error("File size should not be exceded 50 KB")
        return
       }
       const fileReader = new FileReader();
       fileReader.onload = () => {
        if(fileReader.readyState === 2){
            const result = fileReader.result as string;
            setPdf(result);
        }
       }
       fileReader.readAsDataURL(file);
    }
     const handleAddLink = async () => {
        setLoading(true);
        try {
            const response = await axios.put("/api/user/add-links",links);
            toast.success(response.data.message);
            router.refresh()
        } catch (error: any) {
            console.log("Error in sending links: ", error.message)
            toast.error(error.response.data.message);
        }finally{
            setLoading(false);
        } 
     }
     const handleUpdateCV = async () => {
        setLoading(true);
        try {
            if(!pdf){
                return;
            }
            const response = await axios.put("/api/user/update-cv",{pdf});
            toast.success(response.data.message);
           router.refresh()
        } catch (error: any) {
            console.log("Error in sending links: ", error.message)
            toast.error(error.response.data.message);
        }finally{
            setLoading(false);
        } 
     }
    useEffect(() => {
    if(user){
        setLinks({
            faceBookLink: user.faceBookLink,
            instaLink: user.instaLink,
            linkdeenLink: user.linkdeenLink
        })
    }
    },[user])
   useEffect(() => {
    if(user?.cvFile?.url){
        setPdf(user.cvFile?.url);
    }
   },[user])
  return (
    <div className=" w-full md:p-4 p-2 md:mt-7 mt-4">
    <div className=" space-y-3 mx-auto flex flex-col xl:w-[50%] lg:w-[60%] md:w-[70%] sm:w-[80%] w-[90%] ">
        <h1 className=' text-sm font-mono mb-2'>Add social media links</h1>

        <div className=' mt-1 space-y-4'>
            <div className=" p-3 px-4 rounded-md bg-[#8b8b8b1e] flex gap-2 items-center">
            <Facebook />
            <input type="url" 
            value={links.faceBookLink}
            onChange={(e) => setLinks({...links, faceBookLink: e.target.value})}
            placeholder='fcabook link'
            className=' outline-none bg-transparent px-2 w-full'
            />
            </div>
            <div className=" md:p-3 p-2 md:px-4 px-3 rounded-md bg-[#8b8b8b1e] flex gap-2 items-center">
            <Instagram />
            <input type="url" 
            value={links.instaLink}
            onChange={(e) => setLinks({...links, instaLink: e.target.value})}
            placeholder='Insta link'
            className=' outline-none bg-transparent px-2 w-full'
            />
            </div>
            <div className=" p-3 px-4 rounded-md bg-[#8b8b8b1e] flex gap-2 items-center">
            <Linkedin />
            <input type="url" 
            value={links.linkdeenLink}
            onChange={(e) => setLinks({...links, linkdeenLink: e.target.value})}
            placeholder='Linkdeen link'
            className=' outline-none bg-transparent px-2 w-full'
            />
            </div>
            <div className=' flex justify-end'>
            <button type="button" className={` active:scale-95 duration-200 transition-all ease-in-out p-1 px-4 border-2 border-blue-500 dark:border-green-500 text-blue-500 dark:text-green-500 ${loading && "animate-pulse"}`}
            disabled={loading}
            onClick={handleAddLink}
            >
                save
            </button>
            </div>
        </div>
        <div className=' pt-0'>
            <label htmlFor="file-input">
            Select a CV to upload
            </label>
            <p className=' text-sm font-mono text-gray-500'> [file size must be under 50KB]</p>
            <br />
            {
                user?.cvFile?.url && (
                   <div className=' flex items-center gap-x-3 border border-dashed border-[#89898939]'>
                    <File size={18} />
                     <p className=' text-sm '>{user?.cvFile?.url.substring(0,30)}...</p>
                   </div>
                )
            }
            <div className=' flex flex-row gap-2 max-800px:flex-col justify-between items-center bg-[#8b8b8b1e] p-1'>
            <input type="file" name="" id="file-input"
            accept='.pdf'
            onChange={fileUploader}
            className=' w-fit max-sm:text-xs'
            />
            <button type="button" className={` active:scale-95 duration-200 transition-all ease-in-out p-2 rounded-full border-2 border-blue-500 dark:border-green-500 text-blue-500 dark:text-green-500 ${loading && "animate-pulse"}`}
            disabled={loading}
            onClick={handleUpdateCV}
            >
                <Upload size={20} />
            </button>
            </div>
        </div>
        </div>
        </div>
  )
}

export default FileAddSection