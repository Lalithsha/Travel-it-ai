"use client"

import { Input } from "@/components/ui/input";
// import searchcity

import '@/styles/custom.css';
import { useState } from "react";
// import OpenAI from "openai";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { ComboboxDemo } from "@/components/combobox";
import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";

export default function Home() {

    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");

    const router = useRouter();

    const [formData, setFormData] = useState({
        city: "",
        date: "",
        days: "",
        content: "",
        restaurants: ""
    });
    const [value, setValue] = useState("")
    const [people, setPeople] = useState("");
    const [days, setDays] = useState("");
    const [messages, setMessages] = useState([]);
    const [date, setDate] = useState("");


    // Function to handle the "Plan my trip" button click
    const handlePlanTrip = async () => {

        try {
            // Prepare the user message with the trip details

            // Create the content for instructionMessage including the extracted values
            const content = `${value} city from ${date} for ${days} days with ${people} people`;

            const userMessage = {
                role: "user",
                content: content,
            };

            const newMessages = [userMessage];

            console.log(JSON.stringify(content), " stringify content")
            console.log(newMessages, "from content")

            const response = await axios.post("/api/plan", {
                messages: newMessages,
            })

            console.log(response, "from response")

            // setMessages((current) => [...current, userMessage, response.data]); // here may be another issue 
            // setMessages((current) => [...current, userMessage, response.data.choices[0].message]);
            setMessages((current) => [...current, userMessage, { role: 'assistant', content: response.data }]);
            console.log("final", userMessage, "user message", response.data, "response.data")


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
        }


    };

    console.log(...messages, "from messages")


    const [tableData, setTableData] = useState({ description: '', parsedData: [] });

    useEffect(() => {
        // Parse the API string response into a structured format.
        const parsedData = parseApiResponse(messages);
        // Set parsed data in state.
        setTableData(parsedData);
    }, [messages]);


    // chat gpt -4 latest response
    // function parseApiResponse(messages) {
    //     const lines = messages && messages.length > 0
    //         && messages[0].content && messages[0].content.split('\n');
    //     let parsedData = [];
    //     let day = {};
    //     let descriptionLine = "";

    //     // Iterate over each line in the response.
    //     for (let i = 0; i < lines.length; i++) {
    //         let line = lines[i];

    //         // If line starts with '##' it's a Trip itinerary title.
    //         if (line.startsWith('##')) {
    //             descriptionLine = line;
    //         }
    //         // If line starts with '### Day' it's a day title. Start a new day object.
    //         else if (line.startsWith('### Day')) {
    //             if (day.title) {
    //                 // Save the previous day to parsedData array.
    //                 parsedData.push(day);
    //             }
    //             // Reset day object.
    //             day = {
    //                 title: line,
    //                 activities: []
    //             };
    //             // If line starts with '|' it's a table row. Add it to current day activities.
    //         } else if (line.startsWith('|')) {
    //             let row = line.split('|').slice(1, -1); // Remove empty elements from split.

    //             // Only add rows with valid activity.
    //             if (row.length === 3) {
    //                 day.activities.push({
    //                     time: row[0].trim(),
    //                     activity: row[1].trim(),
    //                     description: row[2].trim()
    //                 });
    //             }
    //         }
    //     }

    //     // Add the final day to parsedData array.
    //     if (day.title) {
    //         parsedData.push(day);
    //     }

    //     return { description: descriptionLine, parsedData };
    // }

    function parseApiResponse(messages) {
        let parsedData = [];
        let day = {};
        let descriptionLine = "";

        // Iterate over each message in the response.
        messages.forEach(message => {
            const lines = message.content.content && message.content.content.split('\n');
            // const lines = message.content && message.content.split('\n');


            // Check if lines is defined before iterating over it.
            if (lines) {
                // Iterate over each line in the message.
                for (let i = 0; i < lines.length; i++) {
                    let line = lines[i];

                    // If line starts with '##' it's a Trip itinerary title.
                    if (line.startsWith('##')) {
                        descriptionLine = line;
                    }
                    // If line starts with '### Day' it's a day title. Start a new day object.
                    else if (line.startsWith('### Day')) {
                        if (day.title && day.activities.length > 0) {
                            // Save the previous day to parsedData array.
                            parsedData.push(day);
                        }
                        // Reset day object.
                        day = {
                            title: line,
                            activities: []
                        };
                        // If line starts with '|' it's a table row. Add it to current day activities.
                    } else if (line.startsWith('|')) {
                        let row = line.split('|').slice(1, -1); // Remove empty elements from split.

                        // Only add rows with valid activity.
                        if (row.length === 3 && day.activities) {
                            day.activities.push({
                                time: row[0].trim(),
                                activity: row[1].trim(),
                                description: row[2].trim()
                            });
                        }
                    }
                }
            }
        });

        // Add the final day to parsedData array.
        if (day.title) {
            parsedData.push(day);
        }
        return { description: descriptionLine, parsedData: parsedData.length > 0 ? parsedData : []};
    }
    // ## Day 5: Departure


    // chat gpt 3.5
    // function parseApiResponse(messages) {
    //     const parsedData = [];
    //     let currentDay = null;

    //     for (const message of messages) {
    //         const role = message.role;
    //         const content = message.content || (message.role === 'assistant' && message.choices[0]?.message?.content);

    //         if (content) {
    //             if (content.startsWith('## Day')) {
    //                 if (currentDay) {
    //                     parsedData.push(currentDay);
    //                 }
    //                 currentDay = { title: content, activities: [] };
    //             } else if (content.startsWith('|')) {
    //                 const [time, activity] = content.split('|').slice(1, -1).map(item => item.trim());
    //                 if (time !== 'Time' && activity !== 'Activity') {
    //                     currentDay.activities.push({ time, activity });
    //                 }
    //             }
    //         }
    //     }

    //     if (currentDay) {
    //         parsedData.push(currentDay);
    //     }

    //     return parsedData;
    // }


    //   console.log(parseApiResponse(messages),"parse api response")


    // const tableData = parseApiResponse(messages);

    // console.log(tableData.description, "description from table", tableData.parsedData, "parsed data")

    return (



        <>
            <div>
                <header className="text-2xl md:text-4xl font-bold text-center mt-7">
                    Welcome to Travelling-AI
                </header>
            </div>
            <main className="flex justify-between">
                {/* Left Section: Input Elements and Button */}
                <div className="w-1/2 py-10 px-5 text-center ">

                    <div className="text-center mt-3 text-lg">
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
                <div className="w-1/2 bg-gray-200 p-5 pt-5 border ">

                    {/* chat gpt 4 */}
                    <div className="w-1/2 bg-gray-200 p-5 pt-5 border ">
                        <p>{tableData.description}</p>

                        {tableData.parsedData.map((day, index) => (
                            <div key={index}>
                                <p>{day.title}</p>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Time</th>
                                            <th>Activity</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {day.activities.map((activity, i) => (
                                            <tr key={i}>
                                                <td>{activity.time}</td>
                                                <td>{activity.activity}</td>
                                                <td>{activity.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </div>

            </main >

        </>











    )
}







