"use client"; // This makes the component a client component

import { SessionProvider } from "next-auth/react";

export default function NextAuthLayout({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}