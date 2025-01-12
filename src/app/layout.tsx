"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Define navigation links
  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/method", label: "Method" },
    { href: "/about", label: "About" },
  ];

  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 dark:text-white min-h-screen p-20">
        {/* Navbar */}
        <header className="bg-gray-100 dark:bg-gray-800 fixed top-0 left-0 w-full border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link
                href="/"
                className="text-xl font-bold text-gray-800 dark:text-white"
              >
                Cyrpto Prediction
              </Link>

              {/* Navigation Links */}
              <nav>
                <ul className="flex space-x-6">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`text-l font-bold ${
                          pathname === link.href
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-300"
                        } hover:text-blue-500 dark:hover:text-blue-300`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
