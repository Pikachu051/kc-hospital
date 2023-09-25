'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const AdminNav = () => {
    const path = usePathname();
    const links = [
        { href: '/admin/home', label: "หน้าหลัก" },
        { href: '/admin/create-user', label: "สร้างบัญชีผู้ใช้" },
        { href: '/admin/login-history', label: "ประวัติการเข้าสู่ระบบ" },
        { href: '/about', label: "เกี่ยวกับ"},
        { href: '/itsupport', label: "ช่วยเหลือ" },
    ];

    return <nav>
    <ul className="[&_li]:ml-4 ml-12 flex pt-3">
        {links.map((link) => (
            <li key={link.href}>
                <Link className="relative" href={link.href}>
                    {link.href === path && (
                        <motion.span layoutId="underline"
                        className="absolute left-0 top-full block h-[1px] w-full bg-black"/>
                    )}
                    {link.label}
                </Link>
            </li>
        ))}
    </ul>
</nav>;
};

export default AdminNav;