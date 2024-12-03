import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar"; 
import Footer from "@/components/footer"; 


export const metadata: Metadata = {
  title: "Symplis",
  description: "Empréstimo facilitado, simulação gratuita!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="antialiased bg-[#F5F7F9]">
        <div>
        <Navbar /> 
        </div>
        {children}
        <div>
        <Footer />
        </div>
      </body>
    </html>
  );
}
