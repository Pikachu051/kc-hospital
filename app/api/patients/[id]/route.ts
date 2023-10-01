
import { NextResponse } from 'next/server';
import { main } from "../route";
import { db } from "@/lib/db";

export const GET = async (req: Request, res: NextResponse) => {
    try{
        const id = req.url.split("/patients/")[1];
        await main();
        const patient = await db.patientinfo.findUnique({
            where: {
                hnid: parseInt(id),
            },
            include: {
                admit: true,
                transferHistory: true,
            },
        })

        if (!patient)
            return NextResponse.json({message: "Not found"}, {status: 404});
        return NextResponse.json({message: "Success", patient}, {status: 200});
    }
    catch(e){
        return NextResponse.json({message: "Error", err: e}, {status: 500});
    }
}

export const PUT = (req: Request, res: NextResponse) => {
    
}

export const DELETE = (req: Request, res: NextResponse) => {
        
}