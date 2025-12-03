"use client";

import Mascot404Page from "@/components/mascot/404page";
import { ArrowBigLeftDash } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { useEffect } from "react";
import CloudAnimation from "@/components/404/clouds/cloudAnimation";

/**
 * Render the client-side 404 Not Found page with an animated "404" heading, mascot on larger screens, and a link back to the homepage.
 *
 * On mount, the three elements with class "digit" are animated into view with a staggered bounce effect.
 *
 * @returns The rendered 404 page as a JSX element.
 */
export default function NotFoundPage() {


    useEffect(() => {
    const digits = document.querySelectorAll(".digit");

    gsap.set(digits, { y: -200, opacity: 0 });

    digits.forEach((el, i) => {
        gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "bounce.out",
        delay: i * 0.3,
        });
    });
    }, []);

  return (
    <main className="fixed z-300 top-0 left-0 flex flex-col items-center justify-start min-h-screen min-w-screen bg-gradient-to-t from-white to-blue-400">
        <div className="text-white tracking-wide mt-10 w-full ml-10 text-2xl font-bold animate-fade-in-down">
            <Link href="/">
                <p>BudgetBuddy</p>
            </Link>
        </div>
      <div>
        <div className="hidden md:block">
            <CloudAnimation />
            <Mascot404Page />
        </div>
        <h1 className="text-[10rem] md:text-[30rem] font-bold select-none tracking-wide m-0 p-0 h-fit w-fit sm:-mt-20 mt-60 text-white/50 flex space-x-4">
            <span className="digit">4</span>
            <span className="digit">0</span>
            <span className="digit">4</span>
        </h1>

        <div className="flex flex-col items-center justify-center text-center space-y-4 font-bold animate-fade-in-up duration-500">
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