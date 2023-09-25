import Link from "next/link";
import { Button, buttonVariants } from "./button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";
import { UserCircle2 } from "lucide-react";
import NavTab from "./NavTab";
import AdminNav from "./AdminNav";

const NavBar = async () => {
    const session = await getServerSession(authOptions);
    return (
        <div className="fixed top-0 z-10 w-full h-[70px] py-2 border border-y-black inline-flex px-6">
            {session?.user.role === "USER" ? (

            <div className="container flex justify-start">
                <Link href='/' className="text-4xl font-bold pt-[2px]">
                    InP
                </Link>
                <NavTab />
            </div>
            ) : (
                <div></div>
            )}
            {session?.user.role === "ADMIN" ? (
                <div className="container flex justify-start">
                <Link href='/' className="text-4xl font-bold pt-[2px]">
                    InP
                </Link>
                <AdminNav />
            </div>
            ) : (
                <div></div>
            )}
            <div className="container flex justify-end">
                {session?.user ? (
                    <div>
                        <div className="relative inline-block pr-5 text-m pt-3">
                            <UserCircle2 className="absolute left-[-5vh] scale-150 text-gray-400">
                            </UserCircle2>
                            {session?.user.firstName} {session?.user.lastName}
                        </div><UserAccountNav />
                    </div>
                    ) : (
                    <div className="pt-1">
                    <Link className={buttonVariants()} href='/sign-in'>เข้าสู่ระบบ</Link>
                    </div>
                )}
            </div>
        </div>
    );
};
export default NavBar;