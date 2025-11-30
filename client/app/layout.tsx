import { ReactQueryProvider } from "@/components/global/ReactQueryProvider";
import { DM_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "CrashGuard AI - Intelligent Accident Detection System",
  description: "AI-powered real-time accident detection and emergency response system using CNN and YOLOv8",
  icons: {
    icon: '/logo.jpg',
  },
};

const font = DM_Sans({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className}`}>
        <ReactQueryProvider>
          <Toaster />

          {children}
          {/* <main className="flex min-h-screen w-full flex-col justify-between">
              <div className="w-full grow">{children}</div>
              <Footer />
            </main> */}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
