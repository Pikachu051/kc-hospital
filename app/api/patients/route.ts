import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from 'zod';

// const FormSchema = z.object({
//     hnid: z.number().min(1, 'โปรดกรอกรหัสผู้ป่วย'),
// })

export async function main(){
    try{
        await db.$connect();
    } catch(e){
        return Error("Database connection failed");
    }
}

export const GET = async (req: Request, res: NextResponse) => {
    try{
        await main();
        const body = await req.json();
        // const id = FormSchema.parse(body);
        const result = await db.patientinfo.findFirst({
            where: {
                hnid: parseInt(body.hnid),
            }
        })
        return NextResponse.json({message: "Success", result}, {status: 200});
    }catch(e){
        return NextResponse.json({message: "Error", err: e}, {status: 500});
    } finally {
        await db.$disconnect();
    }
}