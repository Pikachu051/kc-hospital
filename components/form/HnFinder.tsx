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
    hn_num : z.string().min(1, 'กรุณากรอกหมายเลข HN'),
})

const HnFinder = () => {
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            hn_num: '',
        },
    });

    const onSubmit = async (values:z.infer<typeof FormSchema> ) => {
        const response = await fetch('/api/patients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hn_num: values.hn_num,
            }),
        });

        if (response.ok) {
            router.push('/');
            toast({
                title: 'ค้นหาสำเร็จ',
                description: "หมายเลข HN : " + values.hn_num,
                variant: 'default',
            })
        } else {
            toast({
                title: 'ค้นหาไม่สำเร็จ',
                description: "กรุณากรอกหมายเลขHN",
                variant: 'destructive',
            })
        }
    }

    return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-[97vh] flex">
        <div className="space-y-2 mr-5">
            <FormField
            control={form.control}
            name="hn_num"
            render={({ field }) => (
            <FormItem>
                <FormControl>
                <Input placeholder="กรอกหมายเลขHN" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
            />
        </div>
      <Button className="mr-5"type="submit">ค้นหา</Button>
    </form>
  </Form>
)};
export default HnFinder;