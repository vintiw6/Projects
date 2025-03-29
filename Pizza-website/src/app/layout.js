'use client'; 

import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SessionProvider } from "next-auth/react";
import { AppProvider } from "@/components/AppContext";
import { useEffect, useState } from "react";

// set font 
import { Onest } from "next/font/google";

const onest = Onest({ subsets: ['latin'], weight: ['400', '500', '700']})

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning={true}>
          <body className={onest.className}>
            <main 
              className="flex-1 max-w-full mx-auto p-1">
                <AppProvider>
                  <SessionProvider>
                    <Header />
                      {children}
                    <Footer />
                  </SessionProvider>
                </AppProvider>
            </main>
          </body>
        </html>
      );
}
