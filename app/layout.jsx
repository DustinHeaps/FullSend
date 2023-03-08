import "./globals.css"
import Nav from './components/Nav';
import { Roboto } from "next/font/google"
import QueryWrapper from "./QueryWrapper"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head

      */}
      <head />
      <body
        className={`flex items-center w-full my-auto mx-auto flex-col ${roboto.variable} font-sans bg-gray-200`}
      >
      <div className='min-w-[50%]'> 
      <QueryWrapper>
       
            <Nav />
            {children}
  
        </QueryWrapper>
        </div>
      </body>
    </html>
  )
}
