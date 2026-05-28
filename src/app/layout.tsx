import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/ThemeContext";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ariyaman Debnath | Blogify",
  description: "Ariyaman Debnath's Personal Portfolio and Technical Articles Blog.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen antialiased transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pt-24 pb-10">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

