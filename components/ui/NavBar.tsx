import Link from "next/link";
import { Button, buttonVariants } from "./button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { signOut } from "next-auth/react";

const NavBar = async () => {
    const session = await getServerSession(authOptions);
    return (
        <div className="fixed top-0 z-10 w-full py-3 border-b bg-zinc-100 border-s-zinc-200">
            <div className="container flex justify-end"><Link className={buttonVariants()} href='/sign-in'>เข้าสู่ระบบ</Link></div>
        
        {session?.user ? (
            <Button onClick={() => signOut()} variant='destructive'>ออกจากระบบ</Button>
        ) : (
            <Link className={buttonVariants()} href='/sign-in'>เข้าสู่ระบบ</Link>
        )}
        </div>
    );
};
export default NavBar;