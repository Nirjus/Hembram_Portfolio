import type { Metadata } from "next";
import {Poppins, Roboto} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const roboto = Roboto({
  weight:["100","300","400","500","700","900"],
  subsets: ['latin'],
  display:'swap',
  variable: '--font-roboto'
})
const poppins = Poppins({
  weight:["100","300","400","500","700","900"],
  subsets: ['latin'],
  display:'swap',
  variable: '--font-poppins'
})
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider attribute="class">
      <body
        className={`${roboto.variable} ${poppins.variable} antialiased bg-gray-200 dark:bg-[#1c1c1c]`}
      >
        {children}
      </body>
      </ThemeProvider>
    </html>
  );
}
