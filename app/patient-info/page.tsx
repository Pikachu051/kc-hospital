import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea";

const page = () => {
    return <div className='relative h-[75vh] w-[100vh]'>
    <div className="relative top-0 left-24 mt-0 pb-[2vh]">  
    </div>
    <div className='grid gap-6 grid-rows-9'>
    <div className="w-full flex">
        <p className="text-2xl">ข้อมูลทั่วไป</p>
        </div>

      <div className="w-full flex">
        <div className="w-24 h-7"><p className="text-lg">ชื่อ-สกุล :</p></div>
        <div className="w-52 h-7">
          <Textarea className="min-h-7 max-h-7 min-w-20 max-w-52 resize-none" disabled ></Textarea>
          </div>
        <div className="w-24 h-7"><p className="ml-11 text-lg">อายุ :</p></div>
        <div className="w-52 h-7">
          <Textarea className="min-h-8 max-h-8 min-w-20 max-w-52 resize-none" disabled ></Textarea>
        </div>
      </div>

      <div className="w-full flex">
        <div className="w-24 h-7"><p className="text-lg">HN:</p></div>
        <div className="w-52 h-7">
          <Textarea className="min-h-8 max-h-8 min-w-20 max-w-52 resize-none" disabled ></Textarea>
        </div>
        <div className="w-52 h-7"><p className="ml-11 text-lg">วันที่เข้ารับการรักษา :</p></div>
        <div className="w-52 h-7">
          <Textarea className="min-h-8 max-h-8 min-w-20 max-w-52 resize-none" disabled ></Textarea>
        </div>
      </div>

      <div className="w-full flex">
        <div className="w-24 h-7"><p className="text-lg">ที่อยู่ :</p></div>
        <div className="w-full h-7">
          <Textarea className="min-h-8 max-h-8 min-w-20 max-w-full resize-none" disabled ></Textarea>
        </div>
      </div>

      <div className="w-full flex">
        <div className="w-48 h-7"><p className="text-lg">อาการสำคัญ :</p></div>
        <div className="w-full h-7">
          <Textarea className="min-h-8 max-h-8 min-w-20 max-w-full resize-none" disabled ></Textarea>
        </div>
      </div>

      <div className="w-full flex">
        <div className="w-48 h-7"><p className="text-lg">เข้ารักษาที่แผนก :</p></div>
        <div className="w-52 h-7">
          <Textarea className="min-h-8 max-h-8 min-w-20 max-w-52 resize-none" disabled ></Textarea>
        </div>
        <div className="w-32 h-7 ml-11"><p className="text-lg">เตียงปัจจุบัญ :</p></div>
        <div className="w-52 h-7">
          <Textarea className="min-h-8 max-h-8 min-w-20 max-w-52 resize-none" disabled ></Textarea>
        </div>
      </div>

      <div className="w-full h-7 flex items-center justify-center">
        <div className="w-1/2 flex">
          <div className="w-48 h-7 mt-1"><p className="text-lg">จำหน่ายผู้ป่วย :</p></div>
          <div className="w-36 h-7 mt-1">
            <Textarea className=" min-h-7 max-h-7 min-w-20 max-w-56 resize-none" disabled ></Textarea>
          </div>
          <div className="ml-5">
            <Button>บันทึก</Button>
          </div>
        </div>
      </div>

      <div>
        <Table>
          <TableCaption>แคปชั่น</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">วันที่-เวลาที่เข้าย้าย</TableHead>
              <TableHead>เตียงเก่า</TableHead>
              <TableHead>เตียงใหม่</TableHead>
              <TableHead className="">เหตุผลที่ย้าย</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="">example</TableCell>
              <TableCell>example</TableCell>
              <TableCell>example</TableCell>
              <TableCell className="">example</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

    </div>
</div>
}

export default page;