// import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


const instructionMessage = {
    role: "system",
    content: "Act as an expert travel agent. I will give you a location and number of days, give me a complete trip for those days in the form of a table. Give me day wise breakdown and include bars, clubs, hikes, and other attractions that I can visit. Give this in a markdown format."
};


export async function POST(req) {
    try {

        // const { userId } = auth();

        const body = await req.json();
        const { messages } = body;


        console.log(messages, "from messages in api")
        console.log(instructionMessage, "from instruction Message in api")

        // New
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, ...messages]
        });


        console.log(response.choices[0].message, "from router.js");
        return NextResponse.json(response.choices[0].message);

    } catch (error) {
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}













