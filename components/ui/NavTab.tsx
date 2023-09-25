'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const NavTab = () => {
    const path = usePathname();
    const links = [
        { href: '/', label: "หน้าหลัก" },
        { href: '/patient', label: "ข้อมูลผู้ป่วย" },
        { href: '/treatment', label: "ข้อมูลการรักษา" },
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

export default NavTab;