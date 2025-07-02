import "../index.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React from "react";

export const metadata = {
  title: "Pulita Energy",
  description: "Clean energy solutions for a sustainable future.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-satoshi bg-white text-gray-900">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
