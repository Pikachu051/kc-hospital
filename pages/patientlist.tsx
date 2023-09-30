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
import type { InferGetServerSidePropsType, GetServerSideProps} from 'next';
import { db } from '@/lib/db';

type Patients = {
    hnid: string,
    admit_date: string,
    firstName: string,
    lastName: string,
    bed_id: string,
}

export const getServerSideProps = (async () => {
    const patients = await db.admit.findMany();
    const patientsinfo = await db.patientinfo.findMany({
      where: {
        hnid: { 
          in: patients.map((p) => p.hnid),
        },
      },
    });
  
    // Merge patients and patientsinfo
    patients.forEach((p) => {
      const info = patientsinfo.find((pi) => pi.hnid === p.hnid);
      if (info) {
        Object.assign(p, info);
      }
    });
    // console.log(patients);
    return {
      props: {
          patients: JSON.parse(JSON.stringify(patients)),
          },
      }
  }) satisfies GetServerSideProps<{ 
        patients: Patients
    }>

export default function page ({patients}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <PageWrapper>
    <div className="w-full">
    <Table>
      <TableCaption>ตารางรายการผู้ป่วยในทั้งหมด</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">HNID</TableHead>
          <TableHead>วันที่ Admit</TableHead>
          <TableHead>ชื่อ - สกุล</TableHead>
          <TableHead className="">อายุ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4}>No patients found.</TableCell>
          </TableRow>
        ) : (
          patients.map((patient: Patients) => {
            return (
              <TableRow key={patient.hnid}>
                <TableCell className="font-medium">{patient.hnid}</TableCell>
                <TableCell>{patient.admit_date}</TableCell>
                <TableCell>{patient.firstName + " " + patient.lastName}</TableCell>
                <TableCell className="text-right">{patient.bed_id}</TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
    </div>
    </PageWrapper>
    );
};