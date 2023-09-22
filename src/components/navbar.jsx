"use client"
import { UserButton } from "@clerk/nextjs";
// import {Menu} from "lucide-react"
import { Map } from 'lucide-react';
// p-3


const Navbar = () => {

       
    return (
        // <div className=" flex flex-row justify-center items-center border-b border-gray-300 " >
        //     <header className=" text-2xl md:text-4xl font-bold text-center  ">         
        //         Welcome to Travel-it
        //     </header>
        //     <div className="flex w-full justify-end p-3 " >
        //         <UserButton afterSignOutUrl="/" />
        //     </div>
        // </div>

        <div className="flex flex-row justify-between items-center border-b border-gray-300 p-3 m-7 pb-3">
            <div className=" flex flex-row  text-2xl md:text-4xl font-bold text-center">
                <Map  />
              Travel-it
            </div>
            <div>
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    )
}

export default Navbar;