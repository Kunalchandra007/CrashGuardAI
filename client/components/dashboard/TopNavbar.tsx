"use client";
import useSidebar from "@/contexts/useSidebar";
import { Menu, Home, Upload } from "lucide-react";
import MaxWidthContainer from "../layouts/MaxWidthContainer";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {};

export default function TopNavbar({}: Props) {
  const { showSidebar, setShowSidebar } = useSidebar();
  return (
    <main className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 py-4 shadow-lg">
      <MaxWidthContainer className="max-w-none md:px-5">
        <nav className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className="block lg:hidden text-white cursor-pointer"
              onClick={() => {
                setShowSidebar(true);
              }}
            >
              <Menu className="w-6 h-6" />
            </div>
            <Link href="/" className="flex items-center space-x-2">
              <img 
                src="/logo.jpg" 
                alt="CrashGuard AI Logo" 
                className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-lg"
              />
              <h2 className="text-xl font-black text-white tracking-tight hidden sm:block">CrashGuard AI</h2>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/">
              <Button size="sm" variant="outline" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link href="/#model-test">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                <Upload className="w-4 h-4 mr-2" />
                Upload Video
              </Button>
            </Link>
          </div>
        </nav>
      </MaxWidthContainer>
    </main>
  );
}
