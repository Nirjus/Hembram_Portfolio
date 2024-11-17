'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Plus, X } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { IUser } from '@/lib/models/userSchema';
import { updatePhotos } from '@/app/actions/userActions';
type Props = {
  user:IUser
}
const PicPage = ({user}:Props) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const maxFileSize = 50 * 1024; // 50KB in bytes

  const handleUploadImages = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (images.length >= 3) {
      return;
    }
    if (file.size > maxFileSize) {
      toast.error("Image size should not exceed 50KB.");
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const result = fileReader.result as string;
        setImages((prevImg) => [...prevImg, result]);
      }
    };
    fileReader.readAsDataURL(file);
  };
  const handleUpdateUserProfilePicture = async () => {
    setLoading(true);
      if (images.length === 0) {
        setLoading(false)
        toast.error("Fill select 1 image");
        return;
      }
      const response = await updatePhotos(images, "/admin/profile")
      setLoading(false)
      if(response.success){
        toast.success(response.message);
      }else{
       toast.error(response.message)
      }
      
  };
  const removeImage = (index: number) => {
    setImages((prevInd) => prevInd.filter((_, i) => i !== index));
  };
  useEffect(() => {
    if(user){
        const arryImages: string[] = [];
        user?.photos.map((item) => (
            arryImages.push(item.url)
        ))
        setImages(arryImages)
    }
  },[user])
 
  return (
    <div className=" w-full md:p-4 p-2 md:mt-7 mt-4">
    <div className=" mb-5 space-y-3 mx-auto flex flex-col xl:w-[50%] lg:w-[60%] md:w-[70%] sm:w-[80%] w-[90%] ">
      <p className="  text-sm font-mono mb-2">
        Add profile picture [min 1 and max 3 images allowed]
      </p>
      <div className=" grid grid-cols-2 max-400px:gap-2 gap-4">
        {images &&
          images.map((img, index) => (
            <div
              key={index}
              className="relative rounded-md aspect-video "
            >
              <Image
                src={img}
                height={1000}
                width={1000}
                alt={`sample-pic-${index}`}
                className="aspect-video rounded-lg object-cover"
              />
              <div
                className="absolute top-0 right-1 bg-slate-500/50 backdrop-blur-sm p-1 rounded-full cursor-pointer"
                onClick={() => removeImage(index)}
              >
                <X size={17} />
              </div>
            </div>
          ))}
        {images.length < 3 && (
          <label htmlFor="camera">
            <div className=" border border-black flex-col rounded-lg dark:border-white cursor-pointer  aspect-video w-full flex items-center justify-center ">
              <Plus />
              <p className=" text-center text-sm">
                Add more <br />
                images
              </p>
            </div>
          </label>
        )}
      </div>
      <input
        type="file"
        id="camera"
        accept="images/*"
        className=" hidden"
        onChange={handleUploadImages}
        disabled={images.length >= 3}
      />
       <br />
      <button
        type="button"
        onClick={handleUpdateUserProfilePicture}
        disabled={images.length === 0 || loading}
        className={`p-2 px-4 rounded-lg border-2 max-400px:border text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white dark:border-green-500 dark:text-green-500 dark:hover:bg-green-500 dark:hover:text-white active:bg-blue-700 dark:active:bg-green-700 active:scale-95 duration-200 ease-in-out transition
${loading && " animate-pulse bg-blue-300/30 dark:bg-green-300/20"}
`}
      >
        {loading ? "Loding.." : " Update Picture"}
      </button>
    </div>
  </div>
  )
}

export default PicPage