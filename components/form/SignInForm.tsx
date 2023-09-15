'use client';

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";

const FormSchema = z.object({
    username: z.string().min(1, 'โปรดใส่ชื่อผู้ใช้'),
    password: z.string().min(1, 'โปรดใส่รหัสผ่าน'),
})

const SignInForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit = async (values:z.infer<typeof FormSchema> ) => {
        const signInData = await signIn('credentials', {
            username: values.username,
            password: values.password,
            redirect: false,
        });
        
        if (signInData?.error){
            console.log(signInData.error);
        } 
        // else if (signInData?.url){
        //    router.push('/admin/home');
        // }
        else {
            router.push('/');
        }
    }

    return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
            <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
            <FormItem>
                <FormLabel>ชื่อผู้ใช้</FormLabel>
                <FormControl>
                <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
            <FormItem>
                <FormLabel>รหัสผ่าน</FormLabel>
                <FormControl>
                <Input placeholder="Password" type="password"{...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
            />
        </div>
      
      <Button className="w-full mt-6"type="submit">เข้าสู่ระบบ</Button>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly 
      before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 
      after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>Help?</div>
      <p className="text-center text-sm text-gray-600 mt-2">หากคุณลืมรหัสผ่านกรุณาติดต่อฝ่าย <Link className="text-blue-500 hover:underline" href='/itsupport'>IT Support</Link></p>
    </form>
  </Form>
)};

export default SignInForm;

