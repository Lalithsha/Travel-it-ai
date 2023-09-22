"use client"

import { useAuth } from "@clerk/nextjs"
import Link from "next/link";
import TypewriterComponent from "typewriter-effect"
import { Button } from "@/components/ui/button";

export const LandingHero = () => {

    const { isSignedIn } = useAuth();

    return (
        <div className="font-bold py-36 text-center space-y-5 bg-pink-100 h-full " >
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold" >

                <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-300" >
                    <TypewriterComponent
                        options={{
                            strings: [
                                "Your AI Travel Companion.",
                                "Your Personalized AI Travel Guide.",
                                "Unlock Adventures with AI.",
                                "Your AI-Powered Travel Expert.",
                                // "Video Generation.",
                            ],
                            autoStart: true,
                            loop: true
                        }}
                    />
                </div>
            </div>

            <div className="text-sm md:text-xl font-light text-zinc-400" >
                        Create travel plan using AI 5x faster.
            </div>

            <div>
                <Link href={isSignedIn ? "/newplan" :"sign-up" } >
                     <Button className=" bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white border-0  
                        md:text-lg p-4 md:p-6 rounded-full font-semibold" >
                        Start Generating For Free
                     </Button>
                </Link>
            </div>

        </div>
    )
}






























