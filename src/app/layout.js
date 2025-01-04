import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: {
    template: '%s | Instagram Network Analyzer',
    default: 'Insta Stats',
  },
  description: 'Analyze your Instagram network and export data',
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
