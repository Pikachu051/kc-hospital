import { FC, ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
    return <div className="bg-stone-200 p-10 rounded-lg">{children}</div>;
};

export default AuthLayout;