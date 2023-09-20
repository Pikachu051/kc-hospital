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
    firstName: z.string().min(1, 'โปรดใส่ชื่อจริงของผู้ใช้บัญชี'),
    lastName: z.string().min(1, 'โปรดใส่นามสกุลของผู้ใช้บัญชี'),
    username: z.string().min(1, 'โปรดใส่ชื่อผู้ใช้'),
    password: z.string().min(1, 'โปรดใส่รหัสผ่าน').min(8, 'รหัสผ่านต้องมีขั้นต่ำ 8 ตัวอักษร'),
    confirmPassword: z.string().min(1, "โปรดยืนยันรหัสผ่านก่อนดำเนินการต่อ"),
})
.refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "รหัสผ่านไม่ตรงกัน",
});

const CreateUserForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (values:z.infer<typeof FormSchema> ) => {
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: values.username,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName
            }),
        });

        if (response.ok) {
            router.push('/admin/home');
        } else {
            toast({
                title: 'สร้างบัญชีผู้ใช้ไม่สำเร็จ',
                description: "ชื่อผู้ใช้นี้มีอยู่ในระบบแล้ว",
                variant: 'destructive',
            })
        }
    }

    return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
            <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
            <FormItem>
                <FormLabel>ชื่อจริง</FormLabel>
                <FormControl>
                <Input placeholder="Firstname" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
            <FormItem>
                <FormLabel>นามสกุล</FormLabel>
                <FormControl>
                <Input placeholder="Lastname" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
            />
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
            <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
            <FormItem>
                <FormLabel>ยืนยันรหัสผ่าน</FormLabel>
                <FormControl>
                <Input placeholder="Confirm Password" type="password"{...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
            />
        </div>
      
      <Button className="w-full mt-6"type="submit">สร้างบัญชี</Button>
    </form>
  </Form>
)};

export default CreateUserForm;

