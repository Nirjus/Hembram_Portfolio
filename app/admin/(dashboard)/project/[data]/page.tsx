"use client";
import axios from "axios";
import { Loader, Plus, Trash, X } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IProject } from "@/lib/models/projectSchema";
import AlertDailog from "../../_components/Alert-dailog";
import Input from "../_components/Input";
import TextArea from "../_components/TextArea";
import TimeLine from "../_components/TimeLine";

type Props = {
  params: {
    data: string;
  };
};

const Page = ({ params }: Props) => {
  const searchParam = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [openAlertDialog,setOpenAlertDialog] = useState(false);
  const [workImage, setWorkImage] = useState<string[]>([])
  const [project, setProject] = useState({
    _id: "",
    title: "",
    description: "",
    category: "",
    timeLine: "",
    visitLink: ""
  });
  const maxFileSize = 50 * 1024; // 50KB in bytes
  const handleUploadImages = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (workImage.length >= 4) {
      return;
    }
    if (file.size > maxFileSize) {
     toast.error("Image size should not exceed 50KB.")
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const result = fileReader.result as string;
         setWorkImage((prevImg) => [...prevImg, result]);
      }
    };
    fileReader.readAsDataURL(file);
  };
  // Remove an image by index
  const removeImage = (index: number) => {
    setWorkImage((prevImg) => prevImg.filter((_,i) => i !== index))
  };

  const handleAddProject = async () => {
    setLoading(true);
    try {
      if(!project.title || !project.category || !project.description || !project.timeLine || workImage.length === 0){
        toast.error("Please provide all information")
        return;
      }
      const projectSample={...project,samplWorks:workImage}
        const response = await axios.post("/api/project",projectSample);
        toast.success(response.data.message);
        router.push("/admin/project");
    } catch (error: any) {
      console.error("Error in updating project", error.message);
      toast.error(error.response.data.message);
    }finally{
      setLoading(false);
    }
  }  
  const handleUpdateProject = async () => {
    setLoading(true);
    try {
      if(!project.title || !project.category || !project.description || !project.timeLine || workImage.length === 0){
        toast.error("Please provide all information")
        return;
      }
      const projectSample={...project,samplWorks:workImage}
        const response = await axios.put(`/api/project?projectId=${project._id}`, projectSample);  
        toast.success(response.data.message);
        router.push("/admin/project");
    } catch (error: any) {
      console.error("Error in adding project", error.message);
      toast.error(error.response.data.message);
    }finally{
      setLoading(false);
    }
  }  
  const handleDeleteProject = async () => {
   setDeleteLoader(true)
    try {
      const response = await axios.delete(`/api/project?projectId=${project._id}`);
      toast.success(response.data.message);
      router.push("/admin/project")
    } catch (error: any) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message)
    }finally{
      setDeleteLoader(false);
    }
  }
  useEffect(() => {
    if (params.data === "update") {
      const updateProjectObj = () => {
        const stringValue = searchParam.get("values")!;
        const parsObj:IProject = JSON.parse(decodeURIComponent(stringValue));
        setProject(parsObj);
        const imagesArray:string[] = [];
        parsObj.samplWorks.forEach((item) => (
          imagesArray.push(item.url)
        ))
        setWorkImage(imagesArray)
      };
      updateProjectObj();
    }
  }, [params, searchParam]);

  return (
    <div>
      <div className=" flex justify-between items-start">
      <div>
      <p className=" md:text-2xl font-poppins text-xl max-400px:text-lg font-extrabold">
        {params.data === "update" ? "Update Project" : "Add New Project"}
      </p>
      <p className=" max-sm:text-xs">fill all necessery fields to {params.data === "update" ? "update" : "add project"}</p>
      </div>
          <div className=" flex items-center justify-center flex-row max-400px:flex-col gap-x-3">
          <button type="button" 
          className=" border w-28 h-10 text-sm border-black dark:border-white text-black dark:text-white active:scale-95 duration-200 ease-in-out"
          disabled={loading}
          onClick={params.data === "update" ? handleUpdateProject : handleAddProject}
          >
            {loading ? <Loader className=" animate-spin mx-auto" /> : params.data === "update" ? "Update Project" : "Add Project"}
          </button>
          {
            params.data === "update" && (
              <button type="button" className=" flex justify-center items-center bg-red-500/30 dark:bg-red-700/20 dark:hover:bg-red-700/40 h-10 w-10  rounded-md active:scale-95 transition-all ease-in-out duration-200 hover:bg-red-500/40"
              onClick={() => setOpenAlertDialog(true)}
              >
                <Trash color="red" size={20} />
              </button>
            )
          }
          </div>
      </div>
      <div className=" mt-5 ">
          <div className=" grid md:grid-cols-2 grid-cols-1 gap-3">
            <div className=" lg:px-4 sm:px-3 px-2">
              <Input label="title" required state={project} setState={setProject} placeholder="Add a project title here"  />
              <TextArea label="description" required state={project} setState={setProject} placeholder="Add a project description here"  />
              <TimeLine state={project} setState={setProject} label="timeLine" labelSupportedText={project.timeLine} />
              <Input label="category" required state={project} setState={setProject} placeholder="ex: logo design, Web development"  />
            </div>
            <div className=" lg:px-4 sm:px-3 px-2">
              <Input label="visitLink" state={project} setState={setProject} placeholder="paste live URl or github link"  />
              <div className=" space-y-3 md:mb-7 mb-6 w-full">
                <p className=" font-mono pl-3 md:text-lg">
                  {" "}
                  • Sample picture<span className=" text-red-500">*</span>
                   &nbsp;&nbsp;<span className=" text-xs">[min 1, max 4 image allowed]</span>
                </p>

                <div className="grid grid-cols-2 max-400px:gap-2 gap-4">
                  {workImage &&
                    workImage.map((img, index) => (
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
                {workImage.length < 4 && (
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
                  disabled={workImage.length >= 4}
                />
              </div>
            </div>
          </div>
      </div>
      {
        openAlertDialog && (
          <AlertDailog setOpen={setOpenAlertDialog} loading={deleteLoader} onClickHandler={handleDeleteProject} />
        )
      }
    </div>
  );
};

export default Page;
