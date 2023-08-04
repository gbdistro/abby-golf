import { Mulish } from "next/font/google";

import { ThemeProvider, ToastProvider } from "./providers";
import "./globals.css";

const mulish = Mulish({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={mulish.className}>
        <ThemeProvider>
          <article className="min-h-screen">
            <main>{children}</main>
          </article>
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
