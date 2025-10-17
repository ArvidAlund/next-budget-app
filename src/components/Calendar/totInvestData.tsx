import { useEffect, useState } from "react";
import calcInvestment from "@/app/lib/calcInvestment";
import { Container } from "../ui/container";

export default function TotInvestData(){
    const [investmentAmount, setInvestmentAmount] = useState<Number>();

    useEffect(()=>{
        const getInvestmentAmount = async ()=>{
            const result: number = await calcInvestment();
            if (result === 0) return console.error("Något gick fel försök igen senare");
            setInvestmentAmount(result);
        }

        getInvestmentAmount()
    },[])

    return (investmentAmount ?<Container sizeClass="w-full h-fit flex flex-col" colorClass="bg-white">
        <div className="text-black text-center font-bold">
            <h1>Att invstera denna månad</h1>
            <h3>{investmentAmount ? `${investmentAmount} kr`:"Laddar..."}</h3>
        </div>
    </Container> :
    null)
}