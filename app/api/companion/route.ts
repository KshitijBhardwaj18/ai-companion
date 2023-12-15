import prismadb from "@/lib/prismadb";

import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";



export async function POST(req: Request) {
    try{
        const body = await req.json();
        const user = await currentUser();
        const { src, name, description, instructions, seed, categoryId } = body;

        if(!user || !user.id || !user.firstName){
            return new NextResponse("Unauthorized", { status: 401});
        }

        if(!src || !name || !description || !instructions || !seed || !categoryId ){
            return new NextResponse("Missing required fields", {  status: 400});
        }

        // TODO: Check for description

        const companion = await prismadb.companion.create({
            data: {
                categoryId,
                userId : user.id,
                userName: user.firstName,
                src,
                name,
                description,
                instructions,
                seed

            }
        })

        return NextResponse.json(companion);
        
    }catch (error){
        console.log("[COMPANION_POST]",error);
        return new NextResponse("Internal Error", {status: 500});
    }   
}

export async function DELETE(
    request: Request,
    {params} : { params: {companionId: string}}
){
    try{
        const { userId } = auth();

        if(!userId){
            return new NextResponse("Unauthorised", { status: 401});
        }

        const companion = await prismadb.companion.delete({
            where: {
                userId,
                id: params.companionId,

            }
        })

        return NextResponse.json(companion);

    }catch(error){
        console.log("[COMPANION_DELETE", error)
        return new NextResponse("Internal Error", {status: 500} )
    }
}