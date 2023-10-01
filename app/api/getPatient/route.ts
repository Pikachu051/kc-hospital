import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from 'zod';

const FormSchema = z.object({
    hnid: z.number().min(1, 'โปรดกรอกรหัสผู้ป่วย'),
})

export default async function getPatient(req: Request) {
    try{
        const body = await req.json();
        const hnid = FormSchema.parse(body);
        const result = await db.patientinfo.findUnique({
            where: {
                hnid: hnid.hnid,
            }
        })
        return NextResponse.json(result);
    }catch(e){
        return NextResponse.error();
    }
}
