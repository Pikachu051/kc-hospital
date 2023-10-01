'use client';

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z
.object({
    ward : z.string().min(1, 'กรุณากรอกตึกผู้ป่วย'),
    room_id: z.string().min(1, 'กรุณากรอกห้องผู้ป่วย'),
    bed_id: z.string().min(1, 'กรุณากรอกเตียงผู้ป่วย'),
    department: z.string().min(1, 'กรุณากรอกแผนกที่รักษา'),
    doc_id: z.string().min(1, "กรุณากรอกรหัสแพทย์"),
})

const RegPatient = () => {
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            ward: '',
            room_id: '',
            bed_id: '',
            department: '',
            doc_id: '',
        },
    });

    const onSubmit = async (values:z.infer<typeof FormSchema> ) => {
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ward: values.ward,
                room_id: values.room_id,
                bed_id: values.bed_id,
                department: values.department,
                doc_id: values.room_id,
            }),
        });

        if (response.ok) {
            router.push('/admin/home');
        } else {
            toast({
                title: 'ลงทะเบียนไม่สำเร็จ',
                description: "กรุณากรอกข้อมูลให้ครบถ้วน",
                variant: 'destructive',
            })
        }
    }

    return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-[97vh] mx-5 place-content-center">
        <div className="space-y-2 ">
            <FormField
            control={form.control}
            name="ward"
            render={({ field }) => (
            <FormItem>
                <FormLabel>ตึกผู้ป่วย</FormLabel>
                <FormControl>
                <Input placeholder="กรอกตึกผู้ป่วย" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="room_id"
            render={({ field }) => (
            <FormItem>
                <FormLabel>ห้อง</FormLabel>
                <FormControl>
                <Input placeholder="กรอกห้องผู้ป่วย" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="bed_id"
            render={({ field }) => (
            <FormItem>
                <FormLabel>เตียง</FormLabel>
                <FormControl>
                <Input placeholder="กรอกเตียงผู้ป่วย" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
            <FormItem>
                <FormLabel>แผนกที่รักษา</FormLabel>
                <FormControl>
                <Input placeholder="กรอกแผนกที่รักษา"{...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="doc_id"
            render={({ field }) => (
            <FormItem>
                <FormLabel>แพทย์</FormLabel>
                <FormControl>
                <Input placeholder="กรอกรหัสแพทย์" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
            />
        </div>
      <Button className="w-full my-6"type="submit">ลงทะเบียน</Button>
    </form>
  </Form>
)};
export default RegPatient;