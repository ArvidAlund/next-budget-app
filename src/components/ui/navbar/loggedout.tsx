import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const LoggedOutNavbar = ({ NavbarHeight }: { NavbarHeight: number }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
    <header style={{ height: NavbarHeight + "px" }} className="fixed grid md:grid-cols-8 top-0 left-0 w-full bg-primary/20 backdrop-blur-md border-0 z-50 lg:h-20 lg:pt-2 lg:pb-2 transition-all duration-300">
        <div className="hidden md:flex col-span-2 justify-start items-center ml-2">
            <Image src="/mascot/img/mascot.png" alt="Logo" width={NavbarHeight/2} height={NavbarHeight/2} className="mr-1"/>
            <h3>BudgetBuddy</h3>
        </div>
        <div className="hidden md:flex col-span-4 justify-center items-center">
            <nav>
                <ul className="flex space-x-4">
                    <li><Link href="/">Hem</Link></li>
                    <li><Link href="/features">Funktioner</Link></li>
                    <li><Link href="/pricing">Prissättning</Link></li>
                    <li><Link href="/about">Om oss</Link></li>
                </ul>
            </nav>
        </div>
        <div className="hidden md:flex col-span-2 justify-end items-center mr-2">
            <Link href="/login" className="border p-2 rounded font-semibold border-green-500/20 bg-green-700 hover:bg-green-900 transition duration-300">Gör din första budget</Link>
        </div>

        <div className="flex md:hidden justify-center items-center">
            <Image src="/mascot/img/mascot.png" alt="Logo" width={NavbarHeight/2} height={NavbarHeight/2} className="mr-1"/>
            <h3>BudgetBuddy</h3>
            <button 
                className="absolute right-4" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
            >
                <Menu />
            </button>
            {isMenuOpen && (
                <div className="absolute top-full right-0 bg-primary/90 backdrop-blur-md rounded shadow-lg mt-2 w-full">
                    <nav>
                        <ul className="flex flex-col">
                            <li className="border-b border-gray-700"><Link href="/" className="block px-4 py-2 hover:bg-gray-800">Hem</Link></li>
                            <li className="border-b border-gray-700"><Link href="/features" className="block px-4 py-2 hover:bg-gray-800">Funktioner</Link></li>
                            <li className="border-b border-gray-700"><Link href="/pricing" className="block px-4 py-2 hover:bg-gray-800">Prissättning</Link></li>
                            <li className="border-b border-gray-700"><Link href="/about" className="block px-4 py-2 hover:bg-gray-800">Om oss</Link></li>
                            <li><Link href="/login" className="block px-4 py-2 mt-2 border rounded mx-2 text-center border-green-500/20 bg-green-700 hover:bg-green-900 transition duration-300">Gör din första budget</Link></li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    </header>
    );
}
export default LoggedOutNavbar;