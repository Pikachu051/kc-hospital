import RegPatient from "@/components/form/RegPatient";
import HnFinder from "@/components/form/HnFinder";
import { db } from "@/lib/db";


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
const page = async () => {
  const patient = await db.patientinfo.findUnique({
    where: {
      hnid: 660001
    }
  })
  return <div className=' relative h-[75vh] w-[100vh]'>
      <div className="mt-5 text-3xl text-center">ลงทะเบียนผู้ป่วยใน</div>
      <br></br> {/*  เว้นบรรทัด */}      
      <div className="text-md flex mx-5">
        <div className="my-2 w-[20vh] mr-5">หมายเลข HN</div>
        <HnFinder />
      </div>
      <br></br> {/*  เว้นบรรทัด */}
      <div className="text-md flex gap-5 mx-5">
        <div className="flex-1 text-center">ชื่อ </div>
        <div className=" w-[30vh] ml-11" >{patient?.firstName}</div>
        <div className="flex-1  text-center">นามสกุล</div>
        <div className=" w-[30vh] ml-11" >{patient?.lastName}</div>
        <div className="flex-1  text-center">อายุ</div>
        <div className="ml-11 w-[30vh]" >{calAge(patient?.dob)}</div>
      </div>
      <br></br> {/*  เว้นบรรทัด */}
      <div className="text-md flex gap-5 mx-5">
        <div className="flex-1 w-[10vh]" >ที่อยู่</div>
        <div className="w-[80vh]" >{patient?.address}</div>
      </div>
      <br></br> {/*  เว้นบรรทัด */}
      <div className="text-md flex gap-5 mx-5">
        <div className=" w-[30vh]">สิทธิการรักษา</div>
        <div className="ml-11 w-[56vh]" >{patient?.coverage_id}</div>
        <div className=" text-center">CID</div>
        <div className="ml-11 w-[25vh]" >{patient?.idcard}</div>
      </div>
      <br></br> {/*  เว้นบรรทัด */}
      <RegPatient /> {/*  ฟอร์ม */}
  </div>
}

export default page;