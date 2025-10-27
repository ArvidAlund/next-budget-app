import { useEffect, useState } from "react";
import calcInvestment from "@/app/lib/calcInvestment";
import { Container } from "../ui/container";
import { formatCurrency } from "@/app/lib/formatcurrency";
import supabase, { supabaseUserID } from "@/app/lib/supabaseClient";

export default function TotInvestData(){
    const [investmentAmount, setInvestmentAmount] = useState<number>();
    const [hasInvested, setHasInvested] = useState(false);

    useEffect(()=>{
        const getInvestmentAmount = async ()=>{
            const result: number = await calcInvestment();
            if (result === 0) return console.error("Något gick fel försök igen senare");
            setInvestmentAmount(result);

            await getAvanzaInvestment(result);
        }

        const getAvanzaInvestment = async (amount: number) => {
            const user = await supabaseUserID();

            const { data, error } = await supabase
                .from('transaction')
                .select('*')
                .eq('type', 'utgift')
                .eq('description', 'Avanza')
                .eq("user_id", user)
                .eq('amount', amount)
                .eq('category', 'sparande');

            if (error) {
                console.error("Supabase error:", error);
                setHasInvested(false);
                return;
            }

            setHasInvested(data && data.length > 0);
        };

        getInvestmentAmount()
    },[])

    return (investmentAmount ?<Container sizeClass="w-full h-fit flex flex-col" colorClass={hasInvested ? "bg-green-500" : "bg-red-500"}>
        <div className="text-black text-center font-bold">
            <h1>{hasInvested ? "Du har redan investerat månadens överskott": "Månadens rekommenderade investering"}</h1>
            <h3>{investmentAmount ? `${formatCurrency(investmentAmount)} kr`:"Laddar..."}</h3>
        </div>
    </Container> :
    null)
}