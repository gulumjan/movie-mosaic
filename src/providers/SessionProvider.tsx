"use client";
import React, { FC, ReactNode } from "react";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { Session } from "next-auth";

interface ISessionProviderProps {
  children: ReactNode;
  session: Session | null;
}

const SessionProvider: FC<ISessionProviderProps> = ({ children, session }) => {
  return (
    <>
      <NextAuthProvider session={session}>{children}</NextAuthProvider>
    </>
  );
};

export default SessionProvider;
