"use client"

import { Input } from "@/components/ui/input";
// import searchcity

import '@/styles/custom.css';
import { useState } from "react";
import axios from "axios";
import ReactDom from 'react-dom'
import { useRouter } from "next/navigation";
// import ReactMarkdown from 'react-markdown'
import styles from "./page.module.css"
// import remarkGfm from 'remark-gfm'


import { marked } from 'marked';
import PacmanLoader from "react-spinners/PacmanLoader";

import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils"
// import Box from '@mui/material/Box';

// import { useEffect } from "react";
import { ComboboxDemo } from "@/components/combobox";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
// import { Layout } from "lucide-react";
// import { Calendar } from "@/components/ui/calendar";


const font = Montserrat({
    weight: "800",
    subsets: ["latin"]
})


export default function Home() {

    let [loading, setLoading] = useState(false);
    // let [color, setColor] = useState("#ffffff");

    const router = useRouter();

    const [value, setValue] = useState("")
    const [people, setPeople] = useState("");
    const [days, setDays] = useState("");
    const [messages, setMessages] = useState([]);
    const [date, setDate] = useState("");


    // Function to handle the "Plan my trip" button click
    const handlePlanTrip = async () => {

        try {

            setMessages([]);
            setLoading(true);

            // Create the content for instructionMessage including the extracted values
            const content = `${value} city from ${date} for ${days} days with ${people} people`;

            const userMessage = {
                role: "user",
                content: content,
            };

            const newMessages = [userMessage];

            // console.log(JSON.stringify(content), " stringify content")
            // console.log(newMessages, "from content")

            const response = await axios.post("/api/plan", {
                messages: newMessages,
            })

            // console.log(response, "from response")

            // setMessages((current) => [...current, userMessage, response.data.choices[0].message]);
            setMessages((current) => [...current, userMessage, { role: 'assistant', content: response.data }]);
            // console.log("final", userMessage, "user message", response.data, "response.data")


            // Clear the input fields if needed
            setValue("");
            setDate("");
            setDays("");
            setPeople("");

        } catch (error) {
            // Handle errors
            console.error(error);
        } finally {
            // Refresh the router or perform other actions as needed
            router.refresh();
            setLoading(false);
        }


    };

    // console.log(...messages, "from messages")

    // const html = marked.parse(messages);

    return (



        <>
            <div >
                <Navbar></Navbar>
            </div>

            <main className="flex flex-col md:flex-row justify-between">
                {/* Left Section: Input Elements and Button */}
                <div className=" md:w-2/5 py-10 px-5 text-center ">

                    <div className={cn("text-center mt-3 text-lg", font.className)}>
                        <h1>Plan your next adventure</h1>
                    </div>

                    <div className="my-5  ">
                        <p>Where do you want to go</p>
                        <ComboboxDemo setValue={setValue} value={value}></ComboboxDemo>
                    </div>

                    <div className="flex flex-col items-center justify-center" >
                        <p>When does your trip start</p>
                        <Input
                            className="w-fit content-center my-5 border-sky-100"
                            type="text"
                            placeholder="26/11/23"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        ></Input>
                    </div>
                    <div className="flex flex-col items-center justify-center" >
                        <p>How many days will your trip be?</p>
                        <Input
                            className="w-fit content-center my-5 border-sky-100"
                            type="text"
                            placeholder="0"
                            value={days}
                            onChange={(e) => setDays(e.target.value)}
                        ></Input>
                    </div>
                    <div className="flex flex-col items-center justify-center" >
                        <p>How many people are going?</p>
                        <Input
                            className="w-fit content-center my-5 border-sky-100"
                            type="text"
                            placeholder="1"
                            value={people}
                            onChange={(e) => setPeople(e.target.value)}
                        ></Input>
                    </div>
                    <div className="flex flex-col items-center justify-center" >
                        <Button className="" onClick={handlePlanTrip}>
                            Generate my trip
                        </Button>
                    </div>
                </div>

                {/* Right Section: API Response Box, To display the output in the screen  */}
                <div className="md:w-3/5 bg-gray-200 p-5  border rounded-xl border-solid border-cyan-950  m-5 "  >

                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <PacmanLoader color="#87CEEB" margin={0} size={30} />
                        </div>
                    ) : (
                        messages.map((message, i) => {
                            if (message.role === 'assistant') {

                                // return (
                                //     // <div key={i}>
                                //     // {/* {message.content && message.content.content ? message.content.content : ""} */}
                                //     // {/* <MarkdownViewer remarkPlugins={[remarkGfm]} content={message.content && message.content.content ? message.content?.content : ""} /> */}
                                //     <ReactMarkdown className={styles.markdown} remarkPlugins={[remarkGfm]}  >
                                //                   {message.content && message.content.content ? message.content?.content : ""}
                                //     </ReactMarkdown>
                                //     // </div>

                                // );

                                const html = marked(message.content.content);
                                return (
                                    // <div  key={i} dangerouslySetInnerHTML={{ __html: html }} />
                                    <div className=" m-7 " key={i} dangerouslySetInnerHTML={{ __html: html }} />
                                )
                            }
                        })
                    )}

                </div>
            </main >

        </>

        // remarkPlugins={[remarkGfm]}

    )
}






