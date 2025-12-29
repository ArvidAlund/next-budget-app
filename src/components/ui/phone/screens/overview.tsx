import { Bell, Plus, TrendingDown, TrendingUp } from "lucide-react";

const OverViewScreen = () => {
  return <section className="w-full h-full bg-[#8280FE] p-4">
        <div className="flex justify-between text-black">
            <div className="relative *:p-4 *:absolute">
                <div className="bg-blue-500 rounded-full flex justify-center items-center">
                    <p className="font-bold w-6 text-center">B</p>
                </div>
                <div className="bg-white rounded-full flex justify-center items-center left-10">
                    <Plus size={24} />
                </div>
            </div>
            <div className="bg-[#6c6afa] rounded-full p-4 relative">
                <Bell size={24} />
                <div className="absolute aspect-square rounded-full top-2 bg-white text-xs w-4 flex justify-center items-center right-2 border border-gray-300 animate-ping">
                    <div className="">4</div>
                </div>
            </div>
        </div>

        <div className="w-full flex flex-col justify-center items-start mt-8 text-white">
            <p className="text-xs">Total balans</p>
            <h1 className="text-center w-full text-7xl mt-4 text-[#0B0748]">12,345 kr</h1>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full mt-8">
            <div className="bg-white/30 backdrop-blur-md p-4 rounded flex flex-col items-start text-[#0B0748]">
                <p className="text-xs">Inkomster</p>
                <h2 className="text-2xl mt-2">25,000 kr</h2>
                <div className="flex justify-center items-center mt-2">
                    <TrendingUp className="text-green-500" size={24}/>
                    <p className="text-sm text-green-500 ml-1">+5%</p>
                </div>
            </div>
            <div className="bg-white/30 backdrop-blur-md p-4 rounded flex flex-col items-start text-[#0B0748]">
                <p className="text-xs">Utgifter</p>
                <h2 className="text-2xl mt-2">12,655 kr</h2>
                <div className="flex justify-center items-center mt-2">
                    <TrendingDown className="text-red-500" size={24}/>
                    <p className="text-sm text-red-500 ml-1">-3%</p>
                </div>
            </div>
        </div>

        <div></div>

  </section>;
}
export default OverViewScreen;