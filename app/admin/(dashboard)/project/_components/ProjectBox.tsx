import { IProject } from '@/lib/models/projectSchema'
import { Edit, Link2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    project:IProject
}

const ProjectBox = ({project}: Props) => {
    const router = useRouter();
    const handleNavigate = () => {
        router.push(`/admin/project/update?values=${encodeURIComponent(JSON.stringify(project))}`)
    }
  return (
    <div className=' bg-slate-500/30 hover:bg-slate-400/40 shadow-md border backdrop-blur backdrop-filter h-fit border-slate-500/20 dark:bg-slate-700/30 dark:hover:bg-slate-600/30 rounded-lg lg:p-4 md:p-3 p-2 w-full'>
        <div className=" w-full rounded-lg border border-slate-500/20">
          <Image src={project?.samplWorks[0]?.url} height={1000} width={1000} alt={`sample-pic-${project._id}`} className=' object-cover rounded-lg aspect-video w-full' />
        </div>
        <div className=' lg:mt-4 mt-3'>
            <h1 className=' md:text-xl text-lg font-poppins font-extrabold text-slate-600 dark:text-slate-400 '>{project.title}</h1>
            <p className=' italic'>Creater Hembram</p>
           <div className=' flex mt-3 items-center justify-between'>
            {
                project.visitLink ? (
           <Link href={project.visitLink} target="_blank">
           <button type="button" className=' dark:text-white text-black active:scale-95 duration-200 ease-in-out transition-all bg-[#7f7f7f37] dark:bg-[#8181811a] dark:hover:bg-[#83838325] hover:bg-[#83838325] flex items-center justify-center gap-x-3 p-1 px-2 rounded-md'>
                <Link2 size={20} /> URL
            </button>
           </Link>
                ):(
                    <p className=' text-sm'>No added link</p>
                )
            }
          
           <button type="button" className=' active:scale-95 duration-200 ease-in-out transition-all bg-blue-500 dark:bg-green-500 text-white flex items-center justify-center gap-x-3 p-1 px-2 rounded-md'
            onClick={handleNavigate}
           >
                <Edit size={20} /> Update
            </button>
           
           </div>
        </div>
    </div>
  )
}

export default ProjectBox