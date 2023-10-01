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
import { useToast } from "@/components/ui/use-toast";
import { db } from "@/lib/db";


const FormSchema = z.object({
    hnid: z.string().min(1, 'โปรดกรอกรหัสผู้ป่วย'),
})

const SignInForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            hnid: '',
        },
    });

    const onSubmit = async (values:z.infer<typeof FormSchema>) => {
        const hn = parseInt(values.hnid);
        const patientData = await fetch('/api/getPatient', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hnid: hn,
            }),
        });
        
        if (patientData === null || patientData === undefined){
            toast({
                title: 'ค้นหาผู้ป่วยล้มเหลว',
                description: "รหัสผู้ป่วยไม่ถูกต้อง",
                variant: 'destructive',
            })
        }
        else {
            // const logLoginData = await fetch('/api/loginLog', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         username: values.username,
            //     }),
            // });
            // if (logLoginData.ok) {
            //     toast({
            //         title: 'เข้าสู่ระบบสำเร็จ',
            //         description: 'You have logged in successfully.',
            //         variant: 'default',
            //     })
            // } else {
            //     toast({
            //         title: 'บันทึกประวัติการเข้าสู่ระบบไม่สำเร็จ',
            //         description: "โปรดติดต่อฝ่าย IT Support",
            //         variant: 'destructive',
            //     })
            // }
            router.refresh();
            router.push('/patient-info');
        }
    }

    return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex justify-center">
        <div className="w-1/2 justify-center">
            <FormField
            control={form.control}
            name="hnid"
            render={({ field }) => (
            <FormItem>
                <FormLabel>รหัสผู้ป่วย</FormLabel>
                <FormControl>
                <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
            />
        </div>
      
      <div className="relative left-5 top-[24px]"><Button type="submit">ค้นหา</Button></div>
    </form>
  </Form>
    )};
export default SignInForm;