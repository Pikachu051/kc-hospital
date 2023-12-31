import { FC, ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
    return <div className="h-screen justify-center items-center flex flex-col">{children}</div>;
};

export default AuthLayout;