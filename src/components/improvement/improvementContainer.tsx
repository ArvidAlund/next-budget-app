import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ImprovementConstainer = ({data}: {data: {id: number, title: string, amount: number}}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [buttonWidth, setButtonWidth] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => {
            if (buttonRef.current) {
                setButtonWidth(buttonRef.current.offsetWidth);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <li className="w-full p-4 bg-white rounded-lg shadow-md grid grid-cols-3 items-center py-6">
            <div className="flex flex-col col-span-2">
                <h4 className="font-semibold text-[#0B0748] text-[clamp(0.4rem,10vw,1.2rem)]">{data.title}</h4>
                <p className="text-sm text-gray-600 text-[clamp(0.4rem,5vw,0.8rem)]">Spara {data.amount} kr/månad</p>
            </div>
            <div>
                <button ref={buttonRef} className={`bg-green-700 hover:bg-green-900 text-white w-full h-full rounded flex items-center ${buttonWidth > 80 ? "justify-between" : "justify-center"} transition-colors duration-300 text-[clamp(0.4rem,4vw,0.8rem)] px-[clamp(0.4rem,1vw,0.6rem)] py-[clamp(0.2rem,0.5vw,0.4rem)]`}>
                    <span>Se tips</span> 
                    <ArrowUpRight className={`${buttonWidth > 80 ? "block" : "hidden"}`}/>
                </button>
            </div>
        </li>
    );
}
export default ImprovementConstainer;