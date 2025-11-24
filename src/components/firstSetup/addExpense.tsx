import {useState, useEffect } from 'react'
import { formatCurrency } from '@/app/lib/formatcurrency';
import { emitEvent } from '@/app/lib/eventbus';
import { getCategories } from '@/app/lib/db/getCategories';

type Expense = { day: string; amount: number, description: string, category: string };

interface Category {
  category_key: string;
  icon: string;
  name_en: string;
  name_sv: string;
  transaction_type: 'income' | 'expense';
}

/**
 * Render a form for managing monthly expense entries and display their total.
 *
 * Emits an 'Expense-data' event whenever the expense list changes and fetches available expense categories on mount.
 *
 * @returns The JSX element containing expense inputs, a button to add an expense, and a total expense summary.
 */
export default function AddExpense(){
    const [expense, setExpense] = useState<Expense[]>([{ day: "", amount: 0, description: "", category: "other" }]);
    const [categorys , setCategorys] = useState<Category[]>([]); 
    const [loaded, setLoaded] = useState<boolean>(false)

    const totalExpense = expense.reduce((sum, s) => sum + s.amount, 0);;
    
    useEffect(() => {
        emitEvent('Expense-data', {expense});
    },[expense])

    useEffect(()=> {
        const fetchCategories = async () => {
            const categoryData = await getCategories();
            const filtered = categoryData.filter((cat) => cat.transaction_type.includes("expense"))
            setCategorys(filtered);
            setLoaded(true)
        }

        fetchCategories();
    },[])
    
    return (
        <div className="p-4 grid gap-2 grid-cols-2 items-center">
          <div className="sm:w-3/4">
            <h2 className="text-xl font-semibold mb-2">Ange Utgifter</h2>
            <p>Fyll i hur mycket pengar du har i fasta utgifter varje månad.</p>
          </div>
    
          <div className="flex flex-col justify-center items-center gap-6">
            {/* Löner */}
            {loaded && (
                <div>
                    <p className="font-semibold">Utgift:</p>
                    {expense.map((item, i) => (
                        <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2 items-center justify-center">
                            <input
                                type="number"
                                placeholder="Belopp"
                                className="border p-1 rounded h-10 w-full"
                                value={item.amount === 0 ? "" : item.amount}
                                onChange={(e) =>
                                setExpense((prev) => {
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
                                className="border p-1 rounded h-10 w-full"
                                value={item.day}
                                onChange={(e) =>
                                setExpense((prev) => {
                                    const dayValue = parseInt(e.target.value);
                                    if (dayValue < 1 || dayValue > 31) return prev;
                                    const newArr = [...prev];
                                    newArr[i].day = e.target.value;
                                    return newArr;
                                })
                                }
                            />
                            <input 
                                type="text" 
                                placeholder='Namn'
                                className='border p-1 rounded h-10 w-full'
                                value={item.description}
                                onChange={(e) =>
                                    setExpense((prev) => {
                                        const newArr = [...prev]
                                        newArr[i].description = e.target.value;
                                        return newArr
                                    })
                                }
                            />
                            <select className="mt-2 p-2 border rounded bg-primary text-secondary h-10 w-full" onChange={(e) => setExpense((prev) => {
                                const newArr = [...prev]
                                newArr[i].category = e.target.value;
                                return newArr
                            })}>
                                {categorys.map((cat) => (
                                    <option key={cat.category_key} value={cat.category_key} selected={expense[i].category === cat.category_key}>{cat.name_sv}</option>
                                ))}
                            </select>
                            <hr className='col-span-full bg-primary h-[2px]'/>
                        </div>
                    ))}
                    <button
                        className="mt-2 px-2 py-1 border rounded bg-gray-100"
                        onClick={() => setExpense((prev) => [...prev, { day: "", amount: 0, description: "", category:"other" }])}
                    >
                        Lägg till en utgift
                    </button>
                    </div>
            )}
    
            {/* Summering */}
            <div className="mt-4 p-2 border rounded bg-gray-50">
              <div className='grid sm:grid-cols-2 text-center'><strong>Totala utgifter: </strong><p>{formatCurrency(totalExpense)} kr</p></div>
            </div>
          </div>
        </div>
      );
}