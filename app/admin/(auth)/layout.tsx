export default function AdminAuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <section className=" w-full min-h-screen h-auto flex items-center justify-center bg-gradient-to-tr dark:from-[#383838] dark:via-green-400/50 dark:to-[#212121] from-[#5b5b5b] via-blue-500/80 to-[#1f1f1f]">
            <div className="  md:w-[400px] sm:w-[300px] w-[280px] bg-gray-300/10 backdrop-blur backdrop-filter rounded-xl h-auto shadow-md lg:p-10 p-4 ">
            {children}
            </div>
        </section>
    )
  }