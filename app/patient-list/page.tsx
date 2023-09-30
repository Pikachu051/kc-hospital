import { PageWrapper } from "@/components/PageWrapper"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption,
  } from "@/components/ui/table"
import { db } from '@/lib/db';

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

export default async function page () {
    const patients = await db.admit.findMany();
    const patientsinfo = await db.patientinfo.findMany({
      where: {
        hnid: { 
          in: patients.map((p) => p.hnid),
        },
      },
    });
    const patientsdoctor = await db.doctor.findMany({
        where: {
            doctor_id: { 
            in: patients.map((p) => p.doctor_id),
            },
        },
    });

    patients.forEach((p) => {
      const info = patientsinfo.find((pi) => pi.hnid === p.hnid);
      if (info) {
        Object.assign(p, info);
      }
    });

    patients.forEach((p) => {
        const doctor = patientsdoctor.find((pd) => pd.doctor_id === p.doctor_id);
        if (doctor) {
          Object.assign(p, doctor);
        }
    });
        
    
    const listAmount = await db.admit.count();
    return (
    <PageWrapper>
    <div className="text-3xl text-center mb-8">ตารางรายการผู้ป่วยใน</div>
    <div className="">
    <Table className="w-full">
      <TableCaption>ตารางรายการผู้ป่วยในทั้งหมด <strong>{listAmount}</strong> คน</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">HNID</TableHead>
          <TableHead>วันเวลาที่ Admit</TableHead>
          <TableHead>ชื่อ - สกุล</TableHead>
          <TableHead className="">รหัสเตียง</TableHead>
          <TableHead className="">อายุ</TableHead>
          <TableHead className="">แผนก</TableHead>
          <TableHead className="">แพทย์</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {listAmount === 0 ? (
          <TableRow>
            <TableCell colSpan={4}>ไม่มีผู้ป่วยในระบบผู้ป่วยใน ณ ขณะนี้</TableCell>
          </TableRow>
        ) : (
          patients.map((patient) => {
            return (
              <TableRow key={patient.hnid}>
                <TableCell className="font-medium">{patient.hnid}</TableCell>
                <TableCell>{patient.admit_date.getDate()+""}/{patient.admit_date.getMonth()+""}/{patient.admit_date.getFullYear()+""}  {patient.admit_time.getHours() - 7}:{patient.admit_time.getMinutes()}</TableCell>
                <TableCell>{patient.firstName + " " + patient.lastName}</TableCell>
                <TableCell className="">{patient.bed_id}</TableCell>
                <TableCell>{calAge(patient.dob)}</TableCell>
                <TableCell>{patient.dept_id}</TableCell>
                <TableCell>{patient.dFirstName + " " + patient.dLastName}</TableCell>
              </TableRow>
            );
          }))}
      </TableBody>
    </Table>
    </div>
    </PageWrapper>
    );
};