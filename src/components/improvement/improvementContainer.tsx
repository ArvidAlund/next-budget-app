import { ArrowUpRight } from "lucide-react";

const ImprovementConstainer = ({data}: {data: {id: number, title: string, amount: number}}) => {
    return (
        <div className="w-full p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
            <div className="flex flex-col">
                <h4 className="text-lg font-semibold text-[#0B0748]">{data.title}</h4>
                <p className="text-sm text-gray-600">Spara {data.amount} kr/månad</p>
            </div>
            <div>
                <button className="bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded flex items-center space-x-2">
                    <span>Se tips</span> 
                    <ArrowUpRight />
                </button>
            </div>
        </div>
    );
}
export default ImprovementConstainer;