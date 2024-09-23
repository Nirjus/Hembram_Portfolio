'use client'
import Navbar from "./_components/Navbar";
import SideBar from "./_components/SideBar";
import routesArray from "./constants/routesArray";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      <SideBar routes={routesArray} / >
    <div className=" mt-[80px] xl:ml-[300px] lg:ml-[250px] md:ml-[190px] ml-[80px] lg:p-5 md:p-4 sm:p-4 p-3 ">
    {children}
    </div>
    </section>
  );
}
