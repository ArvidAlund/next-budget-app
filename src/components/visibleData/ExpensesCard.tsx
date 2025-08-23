import { useEffect, useState } from "react";
import { Container } from "../ui/container";
import { ExpensesCategory } from "../ui/ExpensesCategory";
import {
  faHouse, faBowlFood, faCarSide, faCartShopping, faBriefcase,
  faDumbbell, faGamepad, faGlobe, faMoneyBills, faCircleQuestion
} from "@fortawesome/free-solid-svg-icons";
import supabase from "@/app/lib/supabaseClient";
import { getbudget } from "@/app/lib/getbudget";
import { GetTransactionsMonth } from "@/app/lib/getTransactionsMonth";

type BudgetData = {
  boende: number;
  mat: number;
  transport: number;
  arbete: number;
  abonnemang: number;
  halsa: number;
  shopping: number;
  nojen: number;
  sparande: number;
  ovrigt: number;
};

type Transaction = {
  id: string;
  user_id: string;
  category?: string | null;
  amount?: number | null;
  date: string;
  recurring: boolean;
  description: string;
};

// Beräkna procent av budget som spenderats
function calculatePercentage(totsum: number, expense: number): number {
  if (totsum <= 0) return 0;
  const percentage = (expense / totsum) * 100;
  return Math.min(Math.round(percentage), 100);
}

export function ExpensesCard() {
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  const [categorySums, setCategorySums] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchData = async () => {
      // Hämta inloggad användare
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        console.error("Ingen användare inloggad");
        return;
      }

      // Hämta budget
      const { data, error } = await getbudget(user.id);
      if (error) {
        console.error("Fel vid hämtning av budget:", error);
        return;
      }
      setBudgetData(data ?? null);

      // Hämta transaktioner för månaden
      const { data: expensesDataRaw, error: expensesDataError } = await GetTransactionsMonth();
      if (expensesDataError) {
        console.error("Fel vid hämtning av transaktioner.");
        return;
      }

      const expensesData: Transaction[] = expensesDataRaw ?? [];

      // Summera utgifter per kategori
      const summed = expensesData.reduce((acc: Record<string, number>, item) => {
        const cat = item.category ?? "Övrigt";
        const amount = item.amount ?? 0;
        acc[cat] = (acc[cat] || 0) + amount;
        return acc;
      }, {});
      setCategorySums(summed);
    };

    fetchData();
  }, []);

  // Visas medan budgetData laddas
  if (!budgetData) {
    return (
      <Container sizeClass="w-full" colorClass="bg-accent">
        <p>Laddar budget...</p>
      </Container>
    );
  }

  return (
    <Container sizeClass="w-full">
      {/* Header med titel och länk */}
      <div className="flex w-full justify-between">
        <p>Utgifter</p>
        <a href="/transactions" className="text-blue-700">Visa alla</a>
      </div>
      <hr className="bg-primary w-full mt-2 mb-2" />

      {/* Rendera varje kategori med ExpensesCategory */}
      <ExpensesCategory
        image={faHouse}
        category="Boende"
        totsum={budgetData.boende}
        expense={categorySums["boende"] || 0}
        percentageValue={calculatePercentage(budgetData.boende, categorySums["boende"] || 0)}
      />
      <hr className="bg-primary w-full mt-2 mb-2" />
      <ExpensesCategory
        image={faBowlFood}
        category="Mat & Hushåll"
        totsum={budgetData.mat}
        expense={categorySums["mat"] || 0}
        percentageValue={calculatePercentage(budgetData.mat, categorySums["mat"] || 0)}
      />
      <hr className="bg-primary w-full mt-2 mb-2" />
      <ExpensesCategory 
      image={faCarSide} 
      category="Transport" 
      totsum={budgetData.transport} 
      expense={categorySums["transport"] || 0} 
      percentageValue={calculatePercentage(budgetData.transport, categorySums["transport"] || 0)} 
      />
      <hr className="bg-primary w-full mt-2 mb-2" />
      <ExpensesCategory 
      image={faBriefcase} 
      category="Arbete & Studier" 
      totsum={budgetData.arbete} 
      expense={categorySums["arbete"] || 0} 
      percentageValue={calculatePercentage(budgetData.arbete, 
      categorySums["arbete"] || 0)} 
      />
      <hr className="bg-primary w-full mt-2 mb-2" />
      <ExpensesCategory 
      image={faGlobe} 
      category="Abonnemang & Tjänster" 
      totsum={budgetData.abonnemang} 
      expense={categorySums["abonnemang"] || 0} 
      percentageValue={calculatePercentage(budgetData.abonnemang, categorySums["abonnemang"] || 0)} 
      />
      <hr className="bg-primary w-full mt-2 mb-2" />
      <ExpensesCategory 
      image={faDumbbell} 
      category="Hälsa & Välmående" 
      totsum={budgetData.halsa} 
      expense={categorySums["halsa"] || 0} 
      percentageValue={calculatePercentage(budgetData.halsa, categorySums["halsa"] || 0)} 
      />
      <hr className="bg-primary w-full mt-2 mb-2" />
      <ExpensesCategory 
      image={faCartShopping} 
      category="Shopping & Kläder" 
      totsum={budgetData.shopping} 
      expense={categorySums["shopping"] || 0} 
      percentageValue={calculatePercentage(budgetData.shopping, categorySums["shopping"] || 0)} 
      />
      <hr className="bg-primary w-full mt-2 mb-2" />
      <ExpensesCategory 
      image={faGamepad} 
      category="Nöjen & Fritid" 
      totsum={budgetData.nojen} 
      expense={categorySums["nojen"] || 0} 
      percentageValue={calculatePercentage(budgetData.nojen, categorySums["nojen"] || 0)} 
      />
      <hr className="bg-primary w-full mt-2 mb-2" />
      <ExpensesCategory 
      image={faMoneyBills} 
      category="Sparande" 
      totsum={budgetData.sparande} 
      expense={categorySums["sparande"] || 0} 
      percentageValue={calculatePercentage(budgetData.sparande, categorySums["sparande"] || 0)} 
      />
      <hr className="bg-primary w-full mt-2 mb-2" />
      <ExpensesCategory 
      image={faCircleQuestion} 
      category="Övrigt" 
      totsum={budgetData.ovrigt} 
      expense={categorySums["ovrigt"] || 0} 
      percentageValue={calculatePercentage(budgetData.ovrigt, categorySums["ovrigt"] || 0)} 
      />
    </Container>
  );
}
