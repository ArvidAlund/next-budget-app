import Mascot404Page from "@/components/mascot/404page";
import { ArrowBigLeftDash } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="fixed z-300 top-0 left-0 flex flex-col items-center justify-start min-h-screen min-w-screen bg-gradient-to-t from-white to-blue-400">
        <div className="text-white tracking-wide mt-10 w-full ml-10 text-2xl font-bold">
            <button>
                <p>BudgetBuddy</p>
            </button>
        </div>
      <div>
        <Mascot404Page />
        <h1 className="sm:text-[30rem] font-bold select-none tracking-wide m-0 p-0 h-fit w-fit -mt-20 text-white/50">404</h1>
        <div className="flex flex-col items-center justify-center text-center space-y-4 font-bold">
            <h3 className="sm:text-5xl">Nu har vi tappat bort oss...</h3>
            <h6 className="sm:text-2xl font-normal">Nu hittar vi tillbaka</h6>
            <Link href="/" className="flex border bg-white/30 hover:bg-white/50 transition-colors duration-300 ease-in-out rounded-lg px-4 py-2 items-center space-x-2">
                <ArrowBigLeftDash />
                <p>Tillbaka hem</p>
            </Link>
        </div>
      </div>
    </main>
  );
}