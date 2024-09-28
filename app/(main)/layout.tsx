import Footer from "./_components/Footer";
import Header from "./_components/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
        <Header />
        <div className=" w-full h-full p-5 lg:w-[80%] md:w-[90%] sm:w-[95%] mx-auto">
          {children}
        </div>
        <Footer />
    </section>
  );
}
