import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { db } from "@/lib/db"

  
  export async function TableDemo() {
    const patients =  await db.diagnosis.findMany()
    const patient_icd = await db.iCD10.findMany({
      where: {
        icd_id: { 
        in: patients.map((p) => p.icd_id),
        },
    },
  })
    const patientsdoctor = await db.doctor.findMany({
      where: {
          doctor_id: { 
          in: patients.map((p) => p.doctor_id),
          },
      },
  });
  patients.forEach((p) => {
    const icd = patient_icd.find((pi) => pi.icd_id === p.icd_id);
    if (icd) {
        Object.assign(p, icd);
    }
  });
  patients.forEach((p) => {
    const doctor = patientsdoctor.find((pd) => pd.doctor_id === p.doctor_id);
    if (doctor) {
        Object.assign(p, doctor);
    }
  });
    return (
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[170px]">doc_id</TableHead>
            <TableHead className="w-[170px]">ICD10</TableHead>
            <TableHead className="w-[180px]">ผลการวินิจฉัย</TableHead>
            <TableHead className="w-[180px]">ประเภทวินิจฉัย</TableHead>
            <TableHead>เเพทย์</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.doctor_id}>
              <TableCell>{patient.doctor_id}</TableCell>
              <TableCell>{patient.icd_id}</TableCell>
              <TableCell className="">{patient.description}</TableCell>
              <TableCell className="">{patient.dxType}</TableCell>
              <TableCell className="">{patient.firstName + " " + patient.lastName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
export default TableDemo;