import Link from "next/link";
import { Button, buttonVariants } from "./button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { signOut } from "next-auth/react";
import UserAccountNav from "./UserAccountNav";
import { UserCircle2 } from "lucide-react";

const NavBar = async () => {
    const session = await getServerSession(authOptions);
    return (
        <div className="fixed top-0 z-10 w-full py-3 border-b bg-zinc-100 border-s-zinc-200">
            <div className="container flex justify-end">
        
        {session?.user ? (
            <div><div className="inline pr-5 text-m">{session?.user.firstName} {session?.user.lastName}</div><UserAccountNav /></div>
            ) : (
            <Link className={buttonVariants()} href='/sign-in'>เข้าสู่ระบบ</Link>
        )}
            </div>
        </div>
    );
};
export default NavBar;