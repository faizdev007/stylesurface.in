"use client";
import CodeInjector from "@/app/components/CodeInjector";
import "./../globals.css";
import ClientLayout from "../components/ClientLayout";

export default function RootLayout({ children }:any) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white flex flex-col">
        <CodeInjector/>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
