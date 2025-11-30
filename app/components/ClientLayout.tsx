"use client";
import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Modal from "@/app/components/ui/Modal";
import LeadForm from "@/app/components/ui/LeadForm";
import CatalogForm from "@/app/components/ui/CatalogForm";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);

  return (
    <>
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      {children}

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
        title="Get Your Catalog"
      >
        <CatalogForm onSuccess={() => setIsCatalogModalOpen(false)} />
      </Modal>
    </>
  );
}
