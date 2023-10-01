'use client';

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  import * as React from "react"
  import { Check, ChevronsUpDown } from "lucide-react"
   
  import { cn } from "@/lib/utils"
  import { Button } from "@/components/ui/button"
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

  const frameworks = [
    {
      value: "a00",
      label: "A00",
    },
    {
      value: "a000",
      label: "A000",
    },
    {
      value: "a001",
      label: "A001",
    },
    {
      value: "a009",
      label: "A009",
    },
    {
      value: "a01",
      label: "A01",
    },
    {
      value: "a01",
      label: "A01",
    },
    {
        value: "a010",
        label: "A010",
    },
    {
        value: "a011",
        label: "A011",
    },
    {
        value: "a012",
        label: "A012",
      },
      {
        value: "a013",
        label: "A013",
      },
      {
        value: "a014",
        label: "A014",
      },
      {
        value: "b00",
        label: "B00",
      },
      {
        value: "b000",
        label: "B000",
      },
      {
        value: "b001",
        label: "B001",
      },
      {
        value: "b002",
        label: "B002",
      },
      {
        value: "b003",
        label: "B003",
      },
      {
        value: "b004",
        label: "B004",
      },
      {
        value: "b005",
        label: "B005",
      },
      {
        value: "b007",
        label: "B007",
      },
      {
        value: "b008",
        label: "B008",
      },
      {
        value: "b009",
        label: "B009",
      },
      {
        value: "b01",
        label: "B01",
      },
      {
        value: "b010",
        label: "B010",
      },
      {
        value: "b011",
        label: "B011",
      },
      {
        value: "b012",
        label: "B012",
      },
      {
        value: "b018",
        label: "B018",
      },
      {
        value: "b019",
        label: "B019",
      },
  ]

const FormSchema = z
.object({
    doc_id: z.string().min(1, 'โปรดใส่รหัสแพทย์'),
    ICD10: z.string({
      required_error: "โปรดเลือกรหัสแผนก"
    }),
    ผลการวินิจฉัย: z.string().min(1, 'โปรดใส่ผลการวินิจฉัย'),
    ประเภทวินิจฉัย: z.string({
      required_error: "โปรดเลือกรหัสแผนก",
    }),
    hnid: z.string().min(1, 'โปรดใส่รหัสผู้ป่วย'),
})

const getPatientById = async (id: string) => {
  const res = await fetch(`/api/patients/${id}`);
  const data = await res.json();
  return data.patient
};

const CreateUserForm = () => {
    
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            doc_id: '',
            ICD10: '',
            ผลการวินิจฉัย: '',
            ประเภทวินิจฉัย: '',
            hnid: '',
        },
    });
    const handleSelectValue = (selectedValue: string) => {
        setValue(selectedValue);
    }
    const onSubmit = async (values:z.infer<typeof FormSchema> ) => {
        const response = await fetch('/api/diag', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hnid: values.hnid,
                ประเภทวินิจฉัย: values.ประเภทวินิจฉัย.toUpperCase(),
                doc_id: values.doc_id,
                ICD10: values.ICD10.toUpperCase(),
            }),
        });

        if (response.ok) {
            router.refresh();
            toast({
              title: 'สร้างรายการตรวจโรคสำเร็จ',
              description: "Diagnostic created successfully",
            })
        } else {
            toast({
                title: 'สร้างรายการตรวจโรคไม่สำเร็จ',
                description: "Failed to create diagnostic",
                variant: 'destructive',
            })
        }
    }

    return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex w-full">
            <FormField
            control={form.control}
            name="doc_id"
            render={({ field }) => (
            <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="ICD10"
            render={({ field }) => (
            <FormItem>
                <FormLabel></FormLabel>
                    <FormControl>
                            <Popover open={open} onOpenChange={setOpen} >
                                <PopoverTrigger asChild>
                                    <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[200px] justify-between"
                                    >
                                    {value
                                        ? frameworks.find((framework) => framework.value === value)?.label
                                        : "Select ICD10..."}
                                    <ChevronsUpDown className="" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                    <CommandInput placeholder="Search ICD10" />
                                    <CommandEmpty>ไม่พบรายการ</CommandEmpty>
                                    <CommandGroup>
                                        {frameworks.map((framework) => (
                                        <CommandItem
                                            key={framework.value}
                                            onSelect={(currentValue) => {
                                            handleSelectValue(currentValue)
                                            setOpen(false)
                                            
                                            }}
                                        >
                                            <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === framework.value ? "opacity-100" : "opacity-0"
                                            )}
                                            />
                                            {framework.label}
                                        </CommandItem>
                                        ))}
                                    </CommandGroup>
                                    </Command>
                                </PopoverContent>
                                </Popover>
                    </FormControl>
                <FormMessage />
            </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="ผลการวินิจฉัย"
            render={({ field }) => (
            <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="ประเภทวินิจฉัย"
            render={({ field }) => (
            <FormItem>
                <FormLabel></FormLabel>
                    <FormControl>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectItem value="Principal Diagnosis">Principal Diagnosis</SelectItem>
                                    <SelectItem value="Comorbidity">Comorbidity</SelectItem>
                                    <SelectItem value="Complication">Complication</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                    <SelectItem value="External Causes">External Causes</SelectItem>
                                    </SelectGroup>
                            </SelectContent>
                            </Select>
                    </FormControl>
                <FormMessage />
            </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="hnid"
            render={({ field }) => (
            <FormItem>
                <FormLabel></FormLabel>
                    <FormControl>
                        <Input placeholder="" type="เเพทย์"{...field} />
                    </FormControl>
                <FormMessage />
            </FormItem>
            )}
            />
            <Button className="bg-red-400 w-24 mt-2 ml-5"type="submit">ยืนยัน</Button>
        </div>
      
      
    </form>
  </Form>
)};

export default CreateUserForm;
