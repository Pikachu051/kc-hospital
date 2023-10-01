'use client';

import { useEffect, useRef } from "react";
import { number } from "zod";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

function calAge(dob: Date) {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}


const getPatientById = async (id: string) => {
    const res = await fetch(`/api/patients/${id}`);
    const data = await res.json();
    return data.patient
};

const EditPatient = ({params}: {params: {id: string}}) => {
    // console.log(params.id);
    const { toast } = useToast();
    const nameArea = useRef<HTMLInputElement | null>(null);
    const ageArea = useRef<HTMLInputElement | null>(null);
    const hnArea = useRef<HTMLInputElement | null>(null);
    const dobArea = useRef<HTMLTextAreaElement | null>(null);
    const admitDateArea = useRef<HTMLTextAreaElement | null>(null);
    const addressArea = useRef<HTMLTextAreaElement | null>(null);
    const symptomArea = useRef<HTMLTextAreaElement | null>(null);
    const deptArea = useRef<HTMLTextAreaElement | null>(null);
    const bedArea = useRef<HTMLTextAreaElement | null>(null);

useEffect(() => {
    toast({
        title: 'กำลังโหลดข้อมูลผู้ป่วย',
        description: 'Loading data from the server.',
        variant: 'default',
    })
    getPatientById(params.id).then((patient) => {
        nameArea.current.value = patient.firstName + " " + patient.lastName;
        ageArea.current.value = calAge(patient.dob).toString();
        hnArea.current.value = patient.hnid;
        addressArea.current.value = patient.address;
        admitDateArea.current.value = patient.admit[0]?.admit_date.toString();
        symptomArea.current.value = patient.admit[0]?.symptom;
        bedArea.current.value = patient.admit[0]?.bed_id.toString();
        deptArea.current.value = patient.admit[0]?.dept_id;

        toast({
            title: 'โหลดข้อมูลผู้ป่วยสำเร็จ',
            description: 'Data loaded successfully.',
            variant: 'default',
        })
    })
    .catch((error) => {
        toast({
            title: 'โหลดข้อมูลผู้ป่วยไม่สำเร็จ',
            description: 'Failed to load data from the server.',
            variant: 'destructive',
        })
        console.log(error);
    })
}
, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await fetch(`/api/patients/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // hnid: patient?.hnid,
                // admit_date: patient?.admit_date,
                // symptom: patient?.symptom,
                // dept_id: patient?.dept_id,
                // bed_id: patient?.bed_id,
                // doctor_id: patient?.doctor_id,
                // discharge_date: patient?.discharge_date,
                // status: patient?.status,
                // transfer_date: patient?.transfer_date,
                // oldBed_id: patient?.oldBed_id,
                // newBed_id: patient?.newBed_id,
                // reason: patient?.reason,
            }),
        });
        const data = await res.json();
        if (!res.ok) {
            alert(data.message);
        } else {
            alert('Update successfully');
        }
    }
    return (
    <div className='relative h-[75vh] w-[100vh]'>
      <div className="relative top-0 left-24 mt-0 pb-[2vh]"></div>
      <div className='grid gap-6 grid-rows-9'>
        <div className="w-full flex">
          <p className="text-2xl">ข้อมูลทั่วไป</p>
        </div>
        <div className="w-full flex">
          <div className="w-24 h-7">
            <p className="text-lg">ชื่อ-สกุล :</p>
          </div>
          <div className="w-52 h-7">
            <Textarea ref={nameArea}
              className="min-h-10 max-h-10 min-w-20 max-w-52 resize-none"
              disabled
            >
            </Textarea>
          </div>
          <div className="w-24 h-7">
            <p className="ml-11 text-lg">อายุ :</p>
          </div>
          <div className="w-52 h-7">
            <Textarea ref={ageArea}
              className="min-h-10 max-h-10 min-w-20 max-w-52 resize-none"
              disabled
            >
            </Textarea>
          </div>
        </div>

        <div className="w-full flex">
          <div className="w-24 h-7">
            <p className="text-lg">HN:</p>
          </div>
          <div className="w-52 h-7">
            <Textarea ref={hnArea}
              className="min-h-10 max-h-10 min-w-20 max-w-52 resize-none"
              disabled
            >
            </Textarea>
          </div>
          <div className="w-52 h-7">
            <p className="ml-11 text-lg">วันที่เข้ารับการรักษา :</p>
          </div>
          <div className="w-96 h-7">
            <Textarea ref={admitDateArea}
              className="min-h-10 max-h-10 min-w-20 max-w-64 resize-none"
              disabled>
            </Textarea>
          </div>
        </div>

        <div className="w-full flex">
          <div className="w-24 h-7">
            <p className="text-lg">ที่อยู่ :</p>
          </div>
          <div className="w-full h-7">
            <Textarea ref={addressArea}
              className="min-h-10 max-h-10 min-w-20 max-w-full resize-none"
              disabled
            >
            </Textarea>
          </div>
        </div>

        <div className="w-full flex">
          <div className="w-48 h-7">
            <p className="text-lg">อาการสำคัญ :</p>
          </div>
          <div className="w-full h-7">
            <Textarea ref={symptomArea}
              className="min-h-10 max-h-10 min-w-20 max-w-full resize-none"
              disabled
            >
            </Textarea>
          </div>
        </div>

        <div className="w-full flex">
          <div className="w-48 h-7">
            <p className="text-lg">เข้ารักษาที่แผนก :</p>
          </div>
          <div className="w-52 h-7">
            <Textarea ref={deptArea}
              className="min-h-10 max-h-10 min-w-20 max-w-52 resize-none"
              disabled>
            </Textarea>
          </div>
          <div className="w-32 h-7 ml-11">
            <p className="text-lg">เตียงปัจจุบัน :</p>
          </div>
          <div className="w-52 h-7">
            <Textarea ref={bedArea}
              className="min-h-10 max-h-10 min-w-20 max-w-52 resize-none"
              disabled
            >
            </Textarea>
          </div>
        </div>

        <div className="w-full h-7 flex items-center justify-center">
          <div className="w-1/2 flex">
            <div className="w-48 h-7 mt-1">
              <p className="text-lg">จำหน่ายผู้ป่วย :</p>
            </div>
            <div className="w-36 h-7 mt-1">
              <Textarea
                className=" min-h-10 max-h-10 min-w-20 max-w-56 resize-none"
                disabled
              ></Textarea>
            </div>
            <div className="ml-5">
              <Button type="submit">บันทึก</Button>
            </div>
          </div>
        </div>

        <div>
          <Table>
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">วันที่-เวลาที่เข้าย้าย</TableHead>
                <TableHead>เตียงเก่า</TableHead>
                <TableHead>เตียงใหม่</TableHead>
                <TableHead className="">เหตุผลที่ย้าย</TableHead>
              </TableRow>
            </TableHeader>
            {/* <TableBody>
              {TF_Historys.map((history: any) => (
                <TableRow key={history.hnid}>
                  <TableCell className="font-medium">
                    {history.transfer_date}
                  </TableCell>
                  <TableCell>{history.oldBed_id}</TableCell>
                  <TableCell>{history.newBed_id}</TableCell>
                  <TableCell className="">
                    {history.reason}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody> */}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default EditPatient;