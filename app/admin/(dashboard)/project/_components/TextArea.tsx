import React from 'react'

type Props = {
    required?: boolean;
    state:any;
    setState:(state: any) => void;
    label: string;
    labelSupportedText?: string;
    placeholder: string;
}

const TextArea = ({required=false, placeholder, state, setState, label, labelSupportedText}: Props) => {
   
  return (
    <div className=" space-y-3 md:mb-7 mb-6">
    <label htmlFor={label} className=" font-mono pl-3 md:text-lg  ">
      • <span className=' capitalize'>{label}</span>{required && <span className=" text-red-500">*</span>} {labelSupportedText &&
        <span className="max-sm:text-[10px] text-[13px]">
         &nbsp; [{labelSupportedText}]
        </span>
      }
    </label>
    <textarea
      rows={5}
      id={label}
      required={required}
      placeholder={placeholder}
      value={state[label]}
      onChange={(e) =>
        setState({...state, [label]:e.target.value})
      }
      className=" outline-none p-4 max-sm:p-2 max-sm:text-xs rounded-md placeholder:text-gray-500 bg-slate-400/50 dark:bg-slate-400/30 dark:focus:bg-slate-400/10 focus:bg-slate-400/30 focus:border-2 border-black dark:border-white w-full"
    />
  </div>
  )
}

export default TextArea