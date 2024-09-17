import React from 'react'
import SkillDivAnimation from '../Animations/SkillDivAnimation'

type Props = {
 skill:{
  name: string,
  description: string
 }
 index: number
}

const SkillsDiv = ({skill, index}: Props) => {
  return (
   <SkillDivAnimation delay={index}>
     <div className='dark:bg-[#363636] bg-[#7c7c7c34] hover:scale-95 duration-300 transition ease-in-out p-3 w-full min-h-[300px] backdrop-blur h-auto max-sm:min-h-[200px]  space-y-5 border-r-4 border-blue-500 dark:border-green-500 rounded-tl-xl rounded-br-xl'>
      <h1 className='  xl:text-2xl lg:text-xl text-lg font-bold font-poppins text-slate-500 dark:text-gray-300'>{skill.name}</h1>
     <div className=' border-t border-blue-500 dark:border-green-500 shadow-lg p-1 rounded-md bg-gray-200/60 dark:bg-[#7878783b]'>
     <p className=' text-pretty max-sm:text-sm font-mono text-gray-600 dark:text-gray-400 '>{skill.description}</p>
     </div>
    </div>
   </SkillDivAnimation>
  )
}

export default SkillsDiv