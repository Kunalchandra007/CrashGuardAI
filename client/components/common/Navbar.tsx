import Link from "next/link";
import MaxWidthContainer from "../layouts/MaxWidthContainer";
import { Button } from "../ui/button";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <main className="bg-gradient-to-r from-gray-900 via-black to-gray-800 py-4 shadow-lg">
      <MaxWidthContainer>
        <nav className="flex flex-row items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <img 
              src="/logo.jpg" 
              alt="CrashGuard AI Logo" 
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-lg"
            />
            <h2 className="text-2xl font-black text-white tracking-tight">CrashGuard AI</h2>
          </Link>

          <div className="flex items-center justify-center space-x-4">
            <Link href="/#model-test">
              <Button size={"lg"} variant="outline" className="bg-white text-gray-900 hover:bg-gray-100 font-semibold">
                Try Demo
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size={"lg"} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold">
                View Dashboard
              </Button>
            </Link>
          </div>
        </nav>
      </MaxWidthContainer>
    </main>
  );
}
