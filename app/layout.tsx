import "../index.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ReactNode } from "react";

export const metadata = {
  title: "Pulita Energy",
  description: "Pulita Energy website",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
