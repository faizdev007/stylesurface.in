"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./ui/Button";
import { CMS } from "@/utils/cms";
import { MenuItem, GlobalSettings } from "../../types";

interface NavbarProps {
  onOpenModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [settings, setSettings] = useState<GlobalSettings | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    const loadData = async () => {
      const menuData = await CMS.getMenus();
      setMenuItems(menuData.header);

      const settingsData = await CMS.getSettings();
      setSettings(settingsData);
    };

    loadData();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname === path;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || pathname !== "/"
          ? "bg-black/95 backdrop-blur-md shadow-md py-3"
          : "bg-black py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <img
              src="/logo.webp"
              alt="Style Surface Logo"
              width={150}
              height={40}
              className="object-contain"
            />
          </Link>

          <div className="flex items-center gap-8">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {menuItems.map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  target={link.target}
                  className={`font-medium text-sm transition-colors relative group ${
                    isActive(link.url)
                      ? "text-yellow-500 font-bold"
                      : "text-white hover:text-yellow-500"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-yellow-500 transition-all ${
                      isActive(link.url)
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-5">
              <a
                href={`tel:${settings?.phone}`}
                className="flex items-center gap-2 text-white hover:text-yellow-600 font-bold transition-colors"
              >
                <div className="text-yellow-50 p-2 rounded-full">
                  <Phone className="w-4 h-4 text-yellow-600" />
                </div>
                <span>{settings?.phone}</span>
              </a>

              <Button variant="accent" size="md" onClick={onOpenModal}>
                Get Bulk Quote
              </Button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-2xl p-4 flex flex-col gap-2 animate-fade-in-up">
            {menuItems.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                className={`font-medium p-3 rounded-lg transition-colors ${
                  isActive(link.url)
                    ? "text-yellow-600 bg-yellow-50"
                    : "text-industrial-dark hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="h-px bg-gray-100 my-2"></div>

            <Button
              fullWidth
              variant="accent"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenModal();
              }}
            >
              Get Bulk Quote
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
