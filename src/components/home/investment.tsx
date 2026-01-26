import { useState, useEffect } from "react";
import supabase from "@/app/lib/supabaseClient";
import { supabaseUserID } from "@/app/lib/supabaseClient";
import calcInvestment from "@/app/lib/calcInvestment";
import { Container } from "../ui/container";
import { formatCurrency } from "@/app/lib/formatcurrency";
import { onEvent } from "@/app/lib/eventbus";

interface InvestmentProps {
  className?: string;
}

/**
 * Renders an investment status card that shows the recommended monthly investment or confirms the user has invested.
 *
 * This component computes the recommended investment amount, checks the user's transactions to determine whether that amount has been invested (via a Supabase query), and displays a styled card whose content and appearance reflect the investment status.
 *
 * @returns The rendered JSX element displaying the investment status card.
 */
export default function Investment({ className }: InvestmentProps) {
  const [investmentAmount, setInvestmentAmount] = useState<number>();
  const [hasInvested, setHasInvested] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(()=>{
      const getInvestmentAmount = async ()=>{
          const result: {amount: number, invested: boolean} | 0 = await calcInvestment();
          if (result === 0){
            setInvestmentAmount(0);
            return;
          }
          setInvestmentAmount(result.amount);
          setHasInvested(result.invested);
      }

        const unsubscribe = onEvent("modalChange", (e: { opened: boolean }) => {
          setShow(!e.opened);
        });

        getInvestmentAmount()

        return () => {
          unsubscribe();
        }
    },[]);


    return (
    <section className={`${className} w-full h-full`}>
          <Container>
            <h3 className="text-white mb-6 tracking-wide">Investera</h3>

            <div
              className={`w-full max-w-md px-6 py-4 flex-col items-center justify-center rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-300
              ${
                hasInvested ? "border-green-400/60 bg-linear-to-r from-green-900/40 to-green-700/30" 
                            : "border-red-400/60 bg-linear-to-r from-red-900/40 to-red-700/30"
              }
              ${show ? "flex" : "hidden"}
              `}
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