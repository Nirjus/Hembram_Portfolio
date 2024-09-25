"use client";
import React, { Suspense, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import Loader from "../../_components/Loader";

const ResetPassword = () => {
  const searchParm = useSearchParams();
  const token = searchParm?.get("token");
  console.log(token);

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState({
    visible: false,
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState({
    visible: false,
    password: "",
  });
  const submitHandler = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post("/api/admin/reset-password", {
        token,
        newPassword: newPassword.password,
        confirmPassword: confirmPassword.password,
      });
      setLoading(false);
      toast.success(response.data.message);
      router.replace("/admin/log-in");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      console.log("Reset password failed");
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className=" ">
      <h1 className=" md:text-2xl text-xl font-poppins font-extrabold text-black dark:text-white text-center">
        Reset passwrord
      </h1>
      <p className=" md:text-lg text-base text-gray-700 dark:text-gray-300 text-center">
        set a strong password
      </p>

      <div className=" mt-5">
        <form onSubmit={submitHandler}>
          <div className=" relative flex flex-col mt-3 gap-2 ">
            <label
              htmlFor="confirmPassword"
              className=" font-poppins cursor-pointer text-blue-900 dark:text-green-900 font-semibold "
            >
             New Password
            </label>
            <input
              type={confirmPassword.visible ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              className=" px-3 outline-none focus:bg-transparent focus:border border-black text-black placeholder:text-gray-600 p-2 bg-gray-300/10"
              placeholder="abc@gmail.com"
              required
              value={confirmPassword.password}
              onChange={(e) =>
                setConfirmPassword({
                  ...confirmPassword,
                  password: e.target.value,
                })
              }
            />
            <div
              className=" text-gray-700 absolute bottom-[10px] right-2 cursor-pointer "
              onClick={() =>
                setConfirmPassword({
                  ...confirmPassword,
                  visible: !confirmPassword.visible,
                })
              }
            >
              {confirmPassword.visible ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </div>
          </div>

          <div className=" relative flex flex-col mt-3 gap-2 ">
            <label
              htmlFor="newPassword"
              className=" font-poppins cursor-pointer text-blue-900 dark:text-green-900 font-semibold "
            >
             Confirm Password
            </label>
            <input
              type={newPassword.visible ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              className=" px-3 outline-none focus:bg-transparent focus:border border-black text-black placeholder:text-gray-600 p-2 bg-gray-300/10"
              placeholder="abc@gmail.com"
              required
              value={newPassword.password}
              onChange={(e) =>
                setNewPassword({ ...newPassword, password: e.target.value })
              }
            />
            <div
              className=" text-gray-700 absolute bottom-[10px] right-2 cursor-pointer "
              onClick={() =>
                setNewPassword({
                  ...newPassword,
                  visible: !newPassword.visible,
                })
              }
            >
              {newPassword.visible ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          <div className=" mt-6">
            <button
              type="submit"
              className=" active:scale-95 duration-200 transition-all ease-in-out flex items-center justify-center w-full p-2 bg-gray-800 text-white"
              disabled={
                !newPassword.password || !confirmPassword.password || loading
              }
            >
              {loading ? "Password reseting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Loader />}>
      <ResetPassword />
    </Suspense>
  );
}