import React from "react";
import NavBar from "./nv-bar";
import ThemeTaggler from "./ThemeTaggler";

// type Props = {};

const navItems = [
  {
    item: "Home",
    link: "#home",
  },
  {
    item: "Skills",
    link: "#skills",
  },
  {
    item: "Project",
    link: "#project",
  },
  {
    item: "Services",
    link: "#services",
  },
];

const Header = () => {
  return (
    <div className=" fixed w-full h-[85px] p-4 navbarGradient z-50">
      <div className=" w-full h-full grid 1000px:grid-cols-3 grid-cols-2 items-center">
        <div className=" bg-transparent">
          <div className=" w-fit max-sm:bg-blue-500/50 dark:max-sm:bg-green-500/50 max-sm:p-1 max-sm:backdrop-blur-md rounded-md ">
          <h1 className=" font-poppins text-3xl font-bold bg-gradient-to-r inline-block from-zinc-900 to-slate-500/70 dark:from-zinc-200 dark:to-zinc-700 bg-clip-text text-transparent">
            HEMBRAM
          </h1>
          </div>
        </div>
        <NavBar navItems={navItems} />
        <div className=" max-1000px:hidden">
            <ThemeTaggler />
        </div>
      </div>
    </div>
  );
};

export default Header;
