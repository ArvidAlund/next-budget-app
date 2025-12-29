import Image from "next/image";
import Link from "next/link";

const LoggedOutNavbar = ({ NavbarHeight }: { NavbarHeight: number }) => {
    return (
    <header style={{ height: NavbarHeight + "px" }} className="fixed grid grid-cols-3 top-0 left-0 w-full bg-primary/20 backdrop-blur-md border-0 z-50 lg:h-20 lg:pt-2 lg:pb-2 transition-all duration-300">
        <div className="flex justify-start items-center ml-2">
            <Image src="/mascot/img/mascot.png" alt="Logo" width={NavbarHeight/2} height={NavbarHeight/2} className="mr-1"/>
            <h3>BudgetBuddy</h3>
        </div>
        <div className="flex justify-center items-center">
            <h1 className="text-secondary text-lg font-semibold">Welcome, Guest!</h1>
        </div>
        <div className="flex justify-end items-center mr-2">
            <Link href="/login" className="border p-2 rounded font-semibold border-green-500/20 bg-green-700 hover:bg-green-900 transition duration-300">Starta budgetera</Link>
        </div>
    </header>
    );
}
export default LoggedOutNavbar;