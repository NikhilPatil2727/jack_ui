import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree, Outfit, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/Providers/theme-provider";
import { RootProvider } from 'fumadocs-ui/provider/next';

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const instrument = Instrument_Serif({ weight: "400", subsets: ["latin"], variable: "--font-instrument" });
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: {
    default: "Jack UI | Modern React UI Component Library",
    template: "%s | Jack UI",
  },
  description: "Jack UI is a beautiful, modern, and accessible React UI component library built for rapid development with Next.js and Tailwind CSS.",
  keywords: ["jack ui", "jackui", "react ui library", "tailwind css components", "next.js components", "framer motion", "ui kit"],
  authors: [{ name: "Jack UI Team" }],
  creator: "Jack UI Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jackui.com", // Replace with your actual domain
    title: "Jack UI | Modern React UI Component Library",
    description: "Build beautiful web applications faster with Jack UI, a modern React component library.",
    siteName: "Jack UI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jack UI | Modern React UI Component Library",
    description: "Build beautiful web applications faster with Jack UI, a modern React component library.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={cn(
          "h-full",
          "antialiased",
          geistSans.variable,
          geistMono.variable,
          "font-sans",
          figtree.variable,
          outfit.variable,
          instrument.variable
        )}
      >
        <body className="min-h-full flex flex-col">
           <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
             <RootProvider>
                {children}
          </RootProvider>
          </ThemeProvider>
          </body>
      </html>
    </ViewTransitions>
  );
}
