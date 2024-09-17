"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef } from "react";

type Props = {
  images: string[];
};

const PhotoSlider = ({ images }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      slider.style.scrollBehavior = "smooth"
     const sliderInterval = setInterval(() => {
        const width = slider.getBoundingClientRect().width;
        slider.scrollLeft += width;
        if (slider.scrollLeft >= slider.scrollWidth - width - 10) {
         slider.scrollLeft = 0;
        }
      }, 5000);
      return () => clearInterval(sliderInterval)
    }
  }, [images]);
  
  const increseActiviry = () => {
    if (sliderRef.current) {
      const width = sliderRef.current?.getBoundingClientRect().width;
      sliderRef.current.scrollTo({
        left: sliderRef.current.scrollLeft + width,
        behavior:"smooth"
      })
    }
  };
  const decsiseActiviry = () => {
    if (sliderRef.current) {
      const width = sliderRef.current?.getBoundingClientRect().width;
      sliderRef.current.scrollTo({
        left: sliderRef.current.scrollLeft - width,
        behavior:"smooth"
      })
    }
  };
  return (
    <div className=" relative w-full flex justify-center items-center"
    >
     <div className=" relative bg-transparent overflow-hidden p-2 rounded-2xl"> 
      <div className="spin-animation -z-10 absolute top-0 left-0 right-0 bottom-0 m-auto bg-blue-500 dark:bg-green-500 h-[200%] w-[50%]" />
     <div
        className=" flex overflow-x-hidden rounded-2xl w-full"
        ref={sliderRef}
      >
        {images.map((imageUrl: string, index) => (
          <div
            key={index}
            className=" flex-none lg:h-[60vh] md:h-[50vh] sm:h-[40vh] w-full rounded-2xl"
          >
            <img
              src={imageUrl}
              alt={`Photo_pic_${index}`}
              className=" object-cover object-center h-full w-full "
            />
          </div>
        ))}
      </div>
     </div>
      <div className=" absolute w-[97%] flex justify-between ">
        <div className=" p-2 text-black bg-[#8d8d8d7c]" onClick={decsiseActiviry}>
          <ChevronLeft />
        </div>
        <div className=" p-2 text-black bg-[#8d8d8d62]" onClick={increseActiviry}>
          <ChevronRight />
        </div>
      </div>
     
    </div>
  );
};

export default PhotoSlider;
