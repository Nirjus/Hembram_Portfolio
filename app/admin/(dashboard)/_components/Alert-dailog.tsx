import React from 'react'

type Props = {
    setOpen: (open: boolean) => void;
    onClickHandler: () => void;
    loading: boolean;
}

const AlertDailog = ({setOpen, onClickHandler, loading}: Props) => {
  return (
    <div className=" w-full h-screen fixed z-[60] inset-x-0 inset-y-0 bg-slate-950/20 flex justify-center items-center">
    <div className=" h-auto lg:w-[400px] md:w-[300px] w-[90%] p-6 rounded-xl shadow-md bg-slate-100">
      <div className=" w-full flex justify-end mb-3">
      </div>
      <div>
        <p className=" text-lg dark:text-green-500 text-blue-500 font-poppins mb-2">
         Are you sure you want to delete?
        </p>
         <div className=' mt-8 flex items-center justify-between'>
         <button type="button"
            disabled={loading}
           className={` bg-black text-white border border-black p-2 px-4 rounded-md ${loading && "animate-pulse"}`}
           onClick={onClickHandler}
          >
           Yes
          </button>
          <button type="button"
           disabled={loading}
           className="  text-black border border-black p-2 px-4 rounded-md"
           onClick={() => setOpen(false)}
          >
             No
          </button>
         </div>
      </div>
    </div>
  </div>
  )
}

export default AlertDailog