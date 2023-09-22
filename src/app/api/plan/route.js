// import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';



const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const contentMap = {
    "trip": "Act as an expert travel agent. I will give you a location and number of days and number of peoples, trip date , give me a complete trip for those days in the form of a table. Give me day wise breakdown and include bars, clubs, hikes, and other attractions that I can visit. Give this in a markdown format.",
    "restaurants": "Act as an expert travel agent. I will give you a state, city and days. Give me the list of restaurants, bars, and dance clubs that I can visit during those days in that city. Divide the 3 with proper headings and return in markdown format."
};

const instructionMessage = {
    role: "system",
    content: "Act as an expert travel agent. I will give you a location and number of days, give me a complete trip for those days in the form of a table. Give me day wise breakdown and include bars, clubs, hikes, and other attractions that I can visit. Give this in a markdown format."
    // content: "Act as an expert travel agent. I will give you a location and number of days and number of peoples, trip date , give me a complete trip for those days in the form of a table. Give me day wise breakdown and include bars, clubs, hikes, and other attractions that I can visit. Give this in a markdown format."
};


export async function POST(req) {
    try {

        // const { userId } = auth();

        const body = await req.json();
        const { messages } = body;


        console.log(messages, "from messages in api")
        // console.log({ ...content }, "from content in api")
        console.log(instructionMessage, "from instruction Message in api")


        // if (!userId) {
        //     return new NextResponse("Unathorized", { status: 401 })
        // }

        // if (!openai.apiKey) {
        //     return new NextResponse("OpenAI API Key not configured", { status: 500 });
        // }

        // if (!messages) {
        //     return new NextResponse("Message", { status: 400 });
        // }


        // New
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, ...messages]
        });
        //  return new NextResponse(JSON.stringify(response.choices[0].message))
        console.log(response.choices[0].message, "from router.js");
        return NextResponse.json(response.choices[0].message);

    } catch (error) {
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// , ...content
// , {
//     "role": "user",
//     "content": content
// }













