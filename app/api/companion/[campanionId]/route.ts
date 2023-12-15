import prismadb from "@/lib/prismadb";

import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";



export async function PATCH(req: Request, { params } : {params:  { campanionId: string} }) {
    try{
        const body = await req.json();
        const user = await currentUser();
        const { src, name, description, instructions, seed, categoryId } = body;

        if(!params.campanionId){
            return new NextResponse("Campanoion ID is required", { status: 400});
        }

        if(!user || !user.id || !user.firstName){
            return new NextResponse("Unauthorized", { status: 401});
        }

        if(!src || !name || !description || !instructions || !seed || !categoryId ){
            return new NextResponse("Missing required fields", {  status: 400});
        }

        // TODO: Check for description

        const companion = await prismadb.companion.update({
            where: {
                id: params.campanionId,
                userId: user.id,
            },
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
        console.log("[COMPANION_PATCH]",error);
        return new NextResponse("Internal Error", {status: 500});
    }   
}