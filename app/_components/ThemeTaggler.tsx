"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonStar, Sun } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {theme === "dark" ? (
        <motion.div
          key="sun-icon"
          initial={{ opacity: 0, scale: 0.8, rotate: 90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotate: -90 }}
          transition={{ duration: 0.5 }}
        >
          <Sun onClick={() => setTheme("light")} className="cursor-pointer" />
        </motion.div>
      ) : (
        <motion.div
          key="moon-icon"
          initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
          transition={{ duration: 0.5 }}
        >
          <MoonStar
            onClick={() => setTheme("dark")}
            className="cursor-pointer"
          />
        </motion.div>
      )}
    </>
  );
};

const ThemeTaggler = () => {
  return (
    <div className=" ml-auto w-fit flex justify-center items-center rounded-full ">
      <div className=" rounded-l-full  p-2 border border-gray-400/50 dark:border-gray-500/20 shadow-md ">
        <ThemeSwitch />
      </div>
      <Link href={"/contact"}>
      <button className="p-2 border border-gray-400/40 dark:border-gray-500/10 active:scale-95 dark:bg-green-500 bg-blue-500 font-medium text-white rounded-r-full shadow-md">
        Contact me!
      </button>
      </Link>
    </div>
  );
};

export default ThemeTaggler;
