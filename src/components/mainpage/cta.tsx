import Link from "next/link";
import { NavbarHeight } from "../ui/navbar/Navbar";
import Phone from "../ui/phone/phone";
import { CreditCard, DollarSign, HandCoins, Wallet } from "lucide-react";
import OverViewScreen from "../ui/phone/screens/overview";

const CTA = () => {
    return (
        <section className="w-full grid lg:grid-cols-2 gap-4" style={{height: `calc(100vh - ${NavbarHeight}px)`}}>
            <div className="ml-6 flex flex-col justify-center items-start animate-fade-in-right">
                <h1 className="mb-4">BudgetBuddy, <br />Gör budgetering enkelt</h1>
                <p>Ta kontroll över din ekonomi med BudgetBuddy. Vår användarvänliga plattform hjälper dig att skapa och följa budgetar, spåra utgifter och nå dina ekonomiska mål med lätthet.</p>
                <div className="mt-6">
                    <Link href="/login" className="border p-2 rounded font-semibold border-green-500/20 bg-green-700 hover:bg-green-900 transition duration-300">Starta budgetera</Link>
                </div>
            </div>
            <div className="hidden lg:flex justify-center items-center relative">
                <div className="w-1/2 animate-fade-in-left">
                    <Phone rotateX={-25} rotateY={15} rotateZ={10} screenContent={<OverViewScreen />}/>
                </div>
                <Wallet className="absolute top-1/6 left-1/6 text-blue-500 -rotate-12 animate-fade-in-up" size={96}/>
                <HandCoins className="absolute -z-1 top-1/4 right-1/8 text-green-500 animate-fade-in-down" size={96}/>
                <CreditCard className="absolute bottom-1/4 right-1/8 text-purple-500 animate-fade-in-up rotate-32" size={128}/>
                <DollarSign className="absolute bottom-1/8 left-1/6 text-yellow-500 animate-fade-in-up -rotate-45" size={54}/>
            </div>


        </section>
    );
}
export default CTA;