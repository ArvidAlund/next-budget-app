import { useState, useEffect } from "react";
import { formatCurrency } from "@/app/lib/formatcurrency";
import { emitEvent } from "@/app/lib/eventbus";

type Income = { day: string; amount: number };

export default function AddIncome() {
  const [salary, setSalary] = useState<Income[]>([{ day: "", amount: 0 }]);
  const [grants, setGrants] = useState<Income[]>([{ day: "", amount: 0 }]);

  const totalSalary = salary.reduce((sum, s) => sum + s.amount, 0);
  const totalGrants = grants.reduce((sum, g) => sum + g.amount, 0);
  const totalIncome = totalSalary + totalGrants;

  useEffect(() => {
    emitEvent('Income-data', {
        detail: {
            salary,
            grants
        }
    });
  },[salary, grants])

  return (
    <div className="p-4 grid gap-2 grid-cols-2 items-center">
      <div className="sm:w-3/4">
        <h2 className="text-xl font-semibold mb-2">Ange inkomst</h2>
        <p>Fyll i hur mycket pengar du får in varje månad.</p>
      </div>

      <div className="flex flex-col justify-center items-center gap-6">
        {/* Löner */}
        <div>
          <p className="font-semibold">Lön:</p>
          {salary.map((item, i) => (
            <div key={i} className="grid sm:grid-cols-[3fr_1fr] gap-2 mb-2">
              <input
                type="number"
                placeholder="Belopp"
                className="border p-1 rounded"
                value={item.amount === 0 ? "" : item.amount}
                onChange={(e) =>
                  setSalary((prev) => {
                    const newArr = [...prev];
                    newArr[i].amount = parseInt(e.target.value) || 0;
                    return newArr;
                  })
                }
              />
              <input
                type="number"
                placeholder="Dag"
                min={1}
                max={31}
                className="border p-1 rounded"
                value={item.day}
                onChange={(e) =>
                  setSalary((prev) => {
                    const dayValue = parseInt(e.target.value);
                    if (dayValue < 1 || dayValue > 31) return prev;
                    const newArr = [...prev];
                    newArr[i].day = e.target.value;
                    return newArr;
                  })
                }
              />
              <hr className="h-[2px] bg-primary col-span-full"/>
            </div>
          ))}
          <button
            className="mt-2 px-2 py-1 border rounded bg-gray-100"
            onClick={() => setSalary((prev) => [...prev, { day: "", amount: 0 }])}
          >
            Lägg till en till lön
          </button>
        </div>

        {/* Bidrag */}
        <div>
          <p className="font-semibold">Bidrag:</p>
          {grants.map((item, i) => (
            <div key={i} className="grid sm:grid-cols-[3fr_1fr] gap-2 mb-2">
              <input
                type="number"
                placeholder="Belopp"
                className="border p-1 rounded"
                value={item.amount === 0 ? "" : item.amount}
                onChange={(e) =>
                  setGrants((prev) => {
                    const newArr = [...prev];
                    newArr[i].amount = parseInt(e.target.value) || 0;
                    return newArr;
                  })
                }
              />
              <input
                type="number"
                placeholder="Dag"
                min={1}
                max={31}
                className="border p-1 rounded"
                value={item.day}
                onChange={(e) =>
                  setGrants((prev) => {
                    const dayValue = parseInt(e.target.value);
                    if (dayValue < 1 || dayValue > 31) return prev;
                    const newArr = [...prev];
                    newArr[i].day = e.target.value;
                    return newArr;
                  })
                }
              />
              <hr className="h-[2px] bg-primary col-span-full"/>
            </div>
          ))}
          <button
            className="mt-2 px-2 py-1 border rounded bg-gray-100"
            onClick={() => setGrants((prev) => [...prev, { day: "", amount: 0 }])}
          >
            Lägg till ett bidrag
          </button>
        </div>

        {/* Summering */}
        <div className="mt-4 p-2 border rounded bg-gray-50">
          <p><strong>Total lön:</strong> {formatCurrency(totalSalary)} kr</p>
          <p><strong>Total bidrag:</strong> {formatCurrency(totalGrants)} kr</p>
          <p><strong>Total inkomst:</strong> {formatCurrency(totalIncome)} kr</p>
        </div>
      </div>
    </div>
  );
}
