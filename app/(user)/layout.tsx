"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Modal from "@/app/components/ui/Modal";
import LeadForm from "@/app/components/ui/LeadForm";
import CodeInjector from "@/app/components/CodeInjector";
import "./../globals.css";
import CatalogForm from "../components/ui/CatalogForm";

export default function RootLayout({ children }:any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);

  return (
    <html lang="en">
      <body className="min-h-screen bg-white flex flex-col">
        <CodeInjector />
        <Navbar onOpenModal={() => setIsModalOpen(true)} />

        <main className="flex-grow">{children}</main>

        <Footer onOpenModal={() => setIsCatalogModalOpen(true)} />

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Get Your Bulk Quote"
        >
          <LeadForm onSuccess={() => setIsModalOpen(false)} />
        </Modal>
        <Modal
          isOpen={isCatalogModalOpen}
          onClose={() => setIsCatalogModalOpen(false)}
          title="Get Your Bulk Quote"
        >
          <CatalogForm onSuccess={() => setIsCatalogModalOpen(false)} />
        </Modal>
      </body>
    </html>
  );
}
