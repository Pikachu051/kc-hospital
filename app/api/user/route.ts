import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import * as z from 'zod';

const userSchema = z
.object({
    firstName: z.string().min(1, 'โปรดใส่ชื่อจริงของผู้ใช้บัญชี'),
    lastName: z.string().min(1, 'โปรดใส่นามสกุลของผู้ใช้บัญชี'),
    username: z.string().min(1, 'โปรดใส่ชื่อผู้ใช้'),
    password: z.string().min(1, 'โปรดใส่รหัสผ่าน'),
});

export async function POST(req: Request) {
    try{
        const body = await req.json();
        const { username, password, firstName, lastName } = userSchema.parse(body);

        const existingUsername = await db.user.findUnique({
            where: {username: username}
        });
        if(existingUsername){
            return NextResponse.json({ user: null, message: "User with this username is already exists"}, { status: 409 })
        }
        
        const hashedPassword = await hash(password, 10);
        const newUser = await db.user.create({
            data: {
                username,
                password: hashedPassword,
                firstName,
                lastName,
            }
        })

        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({ user: rest, message: "User created successfully!"}, { status: 201 });
    } catch(error) {
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}