import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: NextResponse) {
  const { hn, type, doc, icd } = await req.json();
    try {
        const result = await db.diagnosis.create({
            data: {
                hnid: parseInt(hn),
                dxType: type,
                doctor_id: parseInt(doc),
                icd_id: icd,
            },
        });
        
    return NextResponse.json({ message: 'Message sent successfully', result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500});
  }
}