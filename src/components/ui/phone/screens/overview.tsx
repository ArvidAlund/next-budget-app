import { Bell, Plus, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import ProgressBar from "../../progressBar";
import { formatCurrency } from "@/app/lib/formatcurrency";
import BalanceAnimation from "../../balanceAnimation";

const transactions = [
    {
        id: 1,
        category: "Transport",
        date: "27 Sep 2024",
        amount: 300,
        type: "expense",
    },
    {
        id: 2,
        category: "Matinköp",
        date: "26 Sep 2024",
        amount: 1200,
        type: "expense",
    },
    {
        id: 3,
        category: "Lön",    
        date: "25 Sep 2024",
        amount: 25000,
        type: "income",
    },
];


const OverViewScreen = () => {
  return <section className="w-full h-full bg-[#8280FE] *:px-4 relative">
        <div className="flex justify-between text-black py-4">
            <div className="relative">
                <div className="absolute p-4 bg-blue-500 rounded-full flex justify-center items-center">
                    <p className="font-bold w-6 text-center">B</p>
                </div>
                <div className="absolute p-4 bg-white rounded-full flex justify-center items-center left-10">
                    <Plus size={24} />
                </div>
            </div>


            <button className="bg-[#6c6afa] rounded-full p-4 relative hover:bg-[#5a58e0] transition duration-300">
                <Bell size={24} />
                <div className="absolute aspect-square rounded-full top-2 bg-white text-xs w-4 flex justify-center items-center right-2 border border-gray-300">
                    <span className="select-none">4</span>
                </div>
            </button>
        </div>

        <div className="w-full flex flex-col justify-center items-start mt-8 text-white">
            <p className="text-xs">Total balans</p>
            <h1 className="text-center w-full text-7xl mt-4 text-[#0B0748]"><BalanceAnimation end={12345} /> kr</h1>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full mt-8">
            <div className="bg-white/30 backdrop-blur-md p-4 rounded flex flex-col items-start text-[#0B0748]">
                <p className="text-xs">Inkomster</p>
                <h2 className="text-2xl mt-2">25,000 kr</h2>
                <div className="flex justify-center items-center mt-2">
                    <TrendingUp className="text-green-500" size={24}/>
                    <p className="text-sm ml-1">+5%</p>
                </div>
            </div>
            <div className="bg-white/30 backdrop-blur-md p-4 rounded flex flex-col items-start text-[#0B0748]">
                <p className="text-xs">Utgifter</p>
                <h2 className="text-2xl mt-2">12,655 kr</h2>
                <div className="flex justify-center items-center mt-2">
                    <TrendingDown className="text-red-500" size={24}/>
                    <p className="text-sm ml-1">-3%</p>
                </div>
            </div>
        </div>

        <div className="mt-6">
            <div className="flex justify-between items-center">
                <p>Din budget</p>
                <button className="bg-[#0B0748] p-2 rounded-full flex justify-center items-center">
                    <Sparkles size={16} className="inline mr-2"/>
                    <span>Förbättra</span>
                </button>
            </div>
            <div className="mt-4">
                <ProgressBar start={0} end={20000} current={6655} />
            </div>
            <div className="flex justify-between items-center">
                <p>6,655 kr</p>
                <p>20,000 kr</p>
            </div>
        </div>

        <div className="w-full h-full rounded-3xl bg-white mt-6">
            <div className="flex justify-between items-center p-2">
                <h3 className="text-[#0B0748] font-semibold">Senaste transaktioner</h3>
                <button className="bg-[#0B0748] p-3 rounded-full flex justify-center items-center text-white">
                    <Plus size={16} className="inline mr-2"/>
                    <span>Lägg till</span>
                </button>
            </div>
            <div className="px-4 pb-4">
                {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center py-2 border-b border-gray-300 w-full">
                        <div className="flex flex-col">
                            <p className="font-semibold text-[#0B0748]">{transaction.category}</p>
                            <p className="text-xs text-gray-600">{transaction.date}</p>
                        </div>
                        <p className={`font-semibold ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}>
                            {transaction.type === "income" ? "+ " : "- "}{formatCurrency(transaction.amount)} kr
                        </p>
                    </div>
                ))}
            </div>
        </div>
  </section>;
}
export default OverViewScreen;