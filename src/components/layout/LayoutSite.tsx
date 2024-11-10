"use client";
import { FC, ReactNode } from "react";
import scss from "./LayoutSite.module.scss";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Snowfall from "react-snowfall";

interface LayoutProps {
  children: ReactNode;
}

const LayoutSite: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={scss.LayoutSite}>
      <div className={scss.snowfallContainer}>
        <Snowfall speed={[0.5, 6]} snowflakeCount={500} />
      </div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutSite;
