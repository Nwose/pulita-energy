// import "../index.css";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import React from "react";
// import { Providers } from "./providers";

// export const metadata = {
//   title: "Pulita Energy",
//   description: "Clean energy solutions for a sustainable future.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className="font-satoshi bg-white text-gray-900">
//         <Providers>
//           <Header />
//           <main>{children}</main>
//           <Footer />
//         </Providers>
//       </body>
//     </html>
//   );
// }

import "../index.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React from "react";
import { Providers } from "./providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
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
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
