import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from "zod";
const userSchema = z
.object({
    username: z.string().min(1, 'โปรดใส่ชื่อผู้ใช้'),
});
export async function POST(req: Request) {
    try{
        const body = await req.json();
        const { username } = userSchema.parse(body);
        const login = await db.loginHistory.create({
            data: {
                username,
            }
        })

        const { ...rest } = login;

        return NextResponse.json({ login: rest, message: "Logged successfully!"}, { status: 201 });
    } catch(error) {
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}