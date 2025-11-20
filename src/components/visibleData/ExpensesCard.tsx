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
import { getCategories } from "@/app/lib/db/getCategories";
import { getIcon } from "@/app/lib/iconDefenition";
import { get } from "http";

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

interface Category {
  category_key: string;
  icon: string;
  name_en: string;
  name_sv: string;
  transaction_type: 'income' | 'expense';
}

const categoryList = [
  { image: faHouse, category: "Boende", key: "boende" },
  { image: faBowlFood, category: "Mat & Hushåll", key: "mat" },
  { image: faCarSide, category: "Transport", key: "transport" },
  { image: faBriefcase, category: "Arbete & Studier", key: "arbete" },
  { image: faGlobe, category: "Abonnemang & Tjänster", key: "abonnemang" },
  { image: faDumbbell, category: "Hälsa & Välmående", key: "halsa" },
  { image: faCartShopping, category: "Shopping & Kläder", key: "shopping" },
  { image: faGamepad, category: "Nöjen & Fritid", key: "nojen" },
  { image: faMoneyBills, category: "Sparande", key: "sparande" },
  { image: faCircleQuestion, category: "Övrigt", key: "ovrigt" },
];

// Beräkna procent av budget som spenderats
function calculatePercentage(totsum: number, expense: number): number {
  if (totsum <= 0) return 0;
  const percentage = (expense / totsum) * 100;
  return Math.min(Math.round(percentage), 100);
}

export function ExpensesCard() {
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  const [categorySums, setCategorySums] = useState<Record<string, number>>({});
  const [categorys , setCategorys] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();

      const categoryData = await getCategories();
      console.log("Category data in ExpensesCard:", categoryData);
      setCategorys(categoryData);

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

      const expensesData: Transaction[] = expensesDataRaw?.filter(item => parseInt(item.date.split("-")[2], 10) <= date.getDate()) ?? [];

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
      
      {categorys.length > 0 && categorys.filter((c) => c.transaction_type.includes('expense')).map(({ category_key, icon, name_sv }, index) => (
        <div key={category_key}>
          <ExpensesCategory
            image={getIcon(icon)}
            category={category_key}
            name={name_sv}
            totsum={budgetData[category_key as keyof BudgetData]}
            expense={categorySums[category_key] || 0}
            percentageValue={calculatePercentage(budgetData[category_key as keyof BudgetData], categorySums[category_key] || 0)}
          />
          {index < categoryList.length - 1 && <hr className="bg-primary w-full mt-2 mb-2" />}
        </div>
      ))}
    </Container>
  );
}
