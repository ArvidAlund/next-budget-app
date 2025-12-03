import { useState, useEffect } from "react";
import supabase from "@/app/lib/supabaseClient";
import { supabaseUserID } from "@/app/lib/supabaseClient";
import calcInvestment from "@/app/lib/calcInvestment";
import { Container } from "../ui/container";
import { formatCurrency } from "@/app/lib/formatcurrency";

interface InvestmentProps {
  className?: string;
}

export default function Investment({ className }: InvestmentProps) {
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
                .from('transactions')
                .select('*')
                .eq('type', 'expense')
                .eq('description', 'Avanza')
                .eq("user_id", user)
                .eq('amount', amount)
                .eq('category', 'savings');

            if (error) {
                console.error("Supabase error:", error);
                setHasInvested(false);
                return;
            }

            setHasInvested(data && data.length > 0);
        };

        getInvestmentAmount()
    },[])

    return (
    <section className={`${className} w-full h-full`}>
          <Container>
            <h3 className="text-2xl font-semibold text-white mb-6 tracking-wide">Investera</h3>

            <div
              className={`w-full max-w-md px-6 py-4 flex flex-col items-center justify-center rounded-xl border ${
                hasInvested ? "border-green-400/60 bg-gradient-to-r from-green-900/40 to-green-700/30" 
                            : "border-red-400/60 bg-gradient-to-r from-red-900/40 to-red-700/30"
              } shadow-lg backdrop-blur-sm transition-all duration-300`}
            >
              <p className="text-white text-center font-medium">
                {hasInvested
                  ? "Du har investerat månadens överskott!"
                  : "Månadens rekommenderade investering:"}
              </p>

              {!hasInvested && (
                <p className="mt-2 text-lg font-semibold ">
                  {investmentAmount ? `${formatCurrency(investmentAmount)} kr` : "Laddar..."}
                </p>
              )}
            </div>

          </Container>
    </section>
  )
}
