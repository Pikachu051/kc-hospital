import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from "zod";
import set from 'date-fns/set';

const userSchema = z
.object({
    username: z.string().min(1, 'โปรดใส่ชื่อผู้ใช้'),
});

function formatTime(date: Date) {
    const time = set(date, { hours: date.getHours() + 7, minutes: date.getMinutes(), seconds: date.getSeconds(), milliseconds: date.getMilliseconds()});
    return time;
}

export async function POST(req: Request) {
    try{
        const body = await req.json();
        const { username } = userSchema.parse(body);
        const loginTime = formatTime(new Date());
        const login = await db.loginHistory.create({
            data: {
                username,
                loginTime,
            }
        })

        const { ...rest } = login;

        return NextResponse.json({ login: rest, message: "Logged successfully!"}, { status: 201 });
    } catch(error) {
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}