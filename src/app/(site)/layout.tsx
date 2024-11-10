import { FC, ReactNode } from "react";
import LayoutSite from "@/components/layout/LayoutSite";

interface LayoutProps {
	children: ReactNode;
}

const layout: FC<LayoutProps> = ({ children }) => {
	return <LayoutSite>{children}</LayoutSite>;
};

export default layout;
