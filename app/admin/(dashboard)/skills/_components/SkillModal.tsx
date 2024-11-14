import axios from "axios";
import { Loader, X } from "lucide-react";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  setOpen: (open: boolean) => void;
  crudCall: (newSkill:any) => void;
  data?: any;
  isUpdate?: boolean;
};

const SkillModal = ({ setOpen, crudCall, isUpdate=false, data }: Props) => {
  const [skill, setSkill] = useState({
    name: data?.name || "",
    description: data?.description || "",
  });
  const [loading, setLoading] = useState(false);

  const addSkillHandler = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response  = await axios.post("/api/skills", skill);
      toast.success(response.data.message);
      setSkill({
        name:"",
        description:""
      })
      crudCall(response.data.skill);
      setOpen(false)
    } catch (error: any) {
      toast.error(error.response.data.message);
    }finally{
      setLoading(false);
    }
  }
  const updateSkillHandler = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        setLoading(true);
      const response  = await axios.put(`/api/skills?skillId=${data?._id}`, skill);
      toast.success(response.data.message);
      setSkill({
        name:"",
        description:""
      })
      crudCall(response.data.skill);
      setOpen(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }finally{
      setLoading(false);
    }
  }
  return (
    <div className=" w-full h-screen fixed z-[60] inset-x-0 inset-y-0 bg-slate-950/20 flex justify-center items-center">
      <div className=" h-auto lg:w-[400px] md:w-[300px] w-[90%] p-6 rounded-xl shadow-md bg-slate-100">
        <div className=" w-full flex justify-end mb-3">
          <button type="button" onClick={() => setOpen(false)}>
            {" "}
            <X color="black" />
          </button>
        </div>
        <div>
          <p className=" text-lg dark:text-green-500 text-blue-500 font-poppins mb-2">
            {isUpdate? "Update" : "Add"} your skill here
          </p>
          <form action="" className=" w-full" onSubmit={isUpdate? updateSkillHandler : addSkillHandler}>
            <label
              htmlFor="name"
              className="text-sm dark:text-green-500 text-blue-500 font-poppins "
            >
              Skill name
            </label>
            <input
              type="text"
              placeholder="Skill tittle"
              id="name"
              name="name"
              value={skill.name}
              onChange={(e) => setSkill({ ...skill, name: e.target.value })}
              className=" outline-none p-3 bg-slate-400/50 rounded-md text-black placeholder:text-gray-500 w-full"
            />
            <div className=" h-5" />
            <label
              htmlFor="description"
              className="text-sm dark:text-green-500 text-blue-500 font-poppins "
            >
              Skill Description
            </label>
            <textarea
              placeholder="Skill description"
              rows={5}
              id="description"
              name="description"
              value={skill.description}
              onChange={(e) => setSkill({ ...skill, description: e.target.value })}
              className=" outline-none p-3 bg-slate-400/50 rounded-md text-black placeholder:text-gray-500 w-full"
            />

            <button type="submit" disabled={!skill.name || !skill.description || loading}
             className=" w-full mt-3 rounded-md p-2 bg-blue-500 dark:bg-green-500 text-white active:scale-95 duration-200 ease-in-out transition"
            >
               {loading ? <Loader size={24} className=" mx-auto animate-spin" /> : isUpdate ? "Update Skill" : "Add Skill"} 
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SkillModal;
