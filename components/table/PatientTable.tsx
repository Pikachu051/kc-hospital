'use client'

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table"
import { db } from "@/lib/db";


export function PatientTable({patients}: any, {patientsInfoList}: any) {
  return (
    <Table>
      <TableCaption>A list of your recent patients.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">HNID</TableHead>
          <TableHead>วันที่ Admit</TableHead>
          <TableHead>ชื่อ - สกุล</TableHead>
          <TableHead className="">อายุ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients?.map((patient: any) => (
          patientsInfoList.find((info: any) => info.hnid === patient.hnid),
          <TableRow key={patient.hnid}>
            <TableCell className="font-medium">{patient.hnid}</TableCell>
            <TableCell>{patient.admit_date}</TableCell>
            <TableCell>{patient.firstName + " " + patient.lastName}</TableCell>
            <TableCell className="text-right">{patient.age}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default PatientTable;

export async function getServerSideProps(){
  const patients = await db.admit.findMany({});
  const hnidList = patients.map((patient) => patient.hnid);

  const patientsInfo = await db.patientinfo.findMany({
    where: {
      hnid: {
        in: hnidList,
      },
    },
  });

  const patientsInfoList = patientsInfo.map((patientData) => ({
    firstName: patientData.firstName,
    lastName: patientData.lastName,
    hnid: patientData.hnid,
    dob: patientData.dob,
    coverage_id: patientData.coverage_id,
  }));

  // const data = patients.map((patient) => {
  //   const patientData = patientsInfoList.find((info) => info.hnid === patient.hnid);

  //   return {
  //     hnid: patient.hnid,
  //     admitDate: patient.admit_date,
  //     admitTime: patient.admit_time,
  //     name: patientData ? patientData.firstName + " " + patientData.lastName : "",
  //     age: new Date().getFullYear() - new Date(patientData?.dob ?? "").getFullYear(),
  //     dept: patient.dept_id,
  //     bed: patient.bed_id,
  //     coverage: patientData?.coverage_id ?? 0,
  //     doctor: patient.doctor_id,
  //   };
  // });
  return {
    props: {
      patients,
      patientsInfoList,
    },
  };
}