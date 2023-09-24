import { Prompt } from 'next/font/google'
import SignInForm from '@/components/form/SignInForm'
import { PageWrapper } from '@/components/PageWrapper'

const prompt = Prompt({
  weight: ['400', '500', '700', '800'],
  subsets: ['thai']
})
export default function Home() {
  return (
    <PageWrapper>
    <div className={prompt.className}>
      <div className="object-center z-10 w-full items-center text-center justify-center lg:flex">          
        <p className='text-2xl pt-5'><strong className='text-3xl'>โรงพยาบาลบ้านๆ</strong><br></br>ยินดีต้อนรับ</p>
      </div>
      <div className='pt-4'>
        <SignInForm />
      </div>
    </div>
    </PageWrapper>
  )
}