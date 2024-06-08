import "bootstrap/dist/css/bootstrap.min.css";
import { Inter } from "next/font/google";
import "./assets/globals.css";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Favicon from "../../public/logoSpreadIt.svg";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spreadit",
  description: "Spread your mind and thoughts with the world",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Suspense fallback={<div>Loading...</div>}>
        <body className={inter.className}>
          {children}
          <Toaster position="bottom-center" />
        </body>
      </Suspense>
    </html>
  );
}
