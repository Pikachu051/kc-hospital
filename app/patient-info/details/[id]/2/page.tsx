'use client';

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import DiagTable from "@/components/table/DiagTable"
import CreateUserForm from "@/components/form/CreateDiagForm"
import { useEffect, useRef } from "react";
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
  const { toast } = useToast();
  const nameArea = useRef<HTMLTextAreaElement | null>(null);
  const ageArea = useRef<HTMLTextAreaElement | null>(null);
  const hnArea = useRef<HTMLTextAreaElement | null>(null);

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

      // if(patient.transferhistory.length > 0) {
      //     date = patient.transferhistory[0].transfer_date.toString();
      //     oldBed = patient.transferhistory[0].oldBed_id.toString();
      //     newBed = patient.transferhistory[0].newBed_id.toString();
      //     reason = patient.transferhistory[0].reason;
      // }
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
    
    return ( <div className='relative h-[75vh] w-[100vh]'>

    <div className="w-50 h-15"><p className="text-4xl justify-center">ลงผลวินิจฉัย</p></div>

    <div className='flex justify-center pb-[10vh]'>

    </div>
    <div className='grid gap-8 grid-rows-9'>
      {/* ชื่อ-สกุล */}
      <div className="w-full flex ">
        <div className="w-[8rem] h-7"><p className="text-lg">ชื่อ-สกุล :</p></div>
        <div className="w-52 h-7">
          <div className="min-h-8 max-h-8 ml-11 w-[10rem] resize-none"><Textarea ref={nameArea}
              className="min-h-10 relative top-[-4px] max-h-10 min-w-20 max-w-52 resize-none"
              disabled
            >
            </Textarea></div>
        </div>
        {/* อายุ */}
        <div className="w-full flex ">
          <div className="w-24 h-7"><p className="text-lg text-center">อายุ :</p></div>
          <div className="w-52 h-7">
            <div className="min-h-8 max-h-8 min-w-20 max-w-52 resize-none" ><Textarea ref={ageArea}
              className="min-h-10 relative top-[-4px] max-h-10 min-w-20 max-w-52 resize-none"
              disabled
            >
            </Textarea></div>
          </div>
        </div>
        
      </div>
      {/* HN + button */}
      <div className="w-full flex">
        <div className="w-20 h-7"><p className="text-lg">HN :</p></div>
      <div className="h-10"><div className="min-h-8 max-h-8 min-w-20 max-w-52 resize-none" ><Textarea ref={hnArea}
              className="min-h-10 relative top-[-4px] max-h-10 min-w-20 max-w-52 resize-none"
              disabled
            >
            </Textarea></div></div>
      </div>
    </div>
    <br></br>
    <br></br>
    <div className="justify-items-center grid gap-x-px grid-cols-6 grid-rows-1">
      
      <p>doc_id</p>
      <p className="w-1 text-sm">ICD10</p>
      <p className="w-22 ml-20 text-sm">ผลการวินิจฉัย</p>
      <p className="ml-20 text-sm">ประเภทวินิจฉัย</p>
      <p className="ml-20 text-sm">รหัสผู้ป่วย</p>
      <p></p>
      
    </div>
    <CreateUserForm/>
    <br></br>
    {/* <DiagTable/> */}
</div>
)}

export default EditPatient;