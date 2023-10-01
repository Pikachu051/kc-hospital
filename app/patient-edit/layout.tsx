import { FC, ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
    return <div className="relative h-[75vh] w-[100vh]">{children}</div>;
};

export default AuthLayout;