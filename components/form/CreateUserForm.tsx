'use client';

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const FormSchema = z
.object({
    firstName: z.string().min(1, 'โปรดใส่ชื่อจริงของผู้ใช้บัญชี'),
    lastName: z.string().min(1, 'โปรดใส่นามสกุลของผู้ใช้บัญชี'),
    username: z.string().min(1, 'โปรดใส่ชื่อผู้ใช้'),
    password: z.string().min(1, 'โปรดใส่รหัสผ่าน').min(8, 'รหัสผ่านต้องมีขั้นต่ำ 8 ตัวอักษร'),
    confirmPassword: z.string().min(1, "โปรดยืนยันรหัสผ่านก่อนดำเนินการต่อ"),
    dept: z.string({
      required_error: "โปรดเลือกรหัสแผนก",
    })
})
.refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "รหัสผ่านไม่ตรงกัน",
});

const depts = [
    {
      value: "anc",
      label: "ANC",
    },
    {
      value: "ccu",
      label: "CCU",
    },
    {
      value: "er",
      label: "ER",
    },
    {
      value: "icu",
      label: "ICU",
    },
    {
      value: "ipd",
      label: "IPD",
    },
    {
      value: "it",
      label: "IT",
    },
    {
      value: "lab",
      label: "LAB",
    },
    {
      value: "lr",
      label: "LR",
    },
    {
      value: "med",
      label: "MED",
    },
    {
      value: "nicu",
      label: "NICU",
    },
    {
      value: "ob-gyn",
      label: "OB-GYN",
    },
    {
      value: "opd",
      label: "OPD",
    },
    {
      value: "or",
      label: "OR",
    },
    {
      value: "ortho",
      label: "ORTHO",
    },
    {
      value: "ped",
      label: "PED",
    },
    {
      value: "picu",
      label: "PICU",
    },
    {
      value: "sur",
      label: "SUR",
    },
]

const CreateUserForm = () => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
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
            dept: '',
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
                lastName: values.lastName,
                dept: values.dept.toUpperCase(),
            }),
        });

        if (response.ok) {
            router.push('/admin/home');
            toast({
                title: 'สร้างบัญชีผู้ใช้สำเร็จ',
                description: "An account has been created.",
                variant: 'default',
            })
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
        <div className="space-x-2 flex">
            <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
            <FormItem className="relative">
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
            <FormItem className="">
                <FormLabel>นามสกุล</FormLabel>
                <FormControl>
                <Input placeholder="Lastname" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
            />
        </div>
        <div className="space-y-2">
        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-3 mb-[-5px]">รหัสแผนก</p>
        <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? depts.find((dept) => dept.value === value)?.label
            : "เลือกรหัสแผนก..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="ค้นหารหัสแผนก..." />
          <CommandEmpty>ไม่พบรหัสแผนก</CommandEmpty>
          <CommandGroup>
            {depts.map((dept) => (
              <CommandItem
                key={dept.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  form.setValue("dept", currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 text-black",
                    value === dept.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {dept.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
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

