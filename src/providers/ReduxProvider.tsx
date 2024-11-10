"use client";
import { api } from "@/redux/api";
import { store } from "@/redux/store";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { FC, ReactNode } from "react";

interface ReduxProviderProps {
  children: ReactNode;
}
const ReduxProvider: FC<ReduxProviderProps> = ({ children }) => {
  return <ApiProvider api={api}>{children}</ApiProvider>;
};

export default ReduxProvider;
