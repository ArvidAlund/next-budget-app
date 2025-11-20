import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { supabaseUserID } from "@/app/lib/supabaseClient"
import supabase from "@/app/lib/supabaseClient"
import { getCategories } from "@/app/lib/db/getCategories"

type Props = {
  category: string,
  name:string,
  onClose: () => void
} 

type Transaction = {
  id: string;
  amount: number;
  description: string;
  date: string;
  recurring: boolean;
};

interface Category {
  category_key: string;
  icon: string;
  name_en: string;
  name_sv: string;
  transaction_type: 'income' | 'expense';
}

export function ExpandedMenuCategory({ category, name, onClose }: Props) {

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [openTransactions, setOpenTransactions] = useState<Record<string, boolean>>({});
    const [closing, setClosing ] = useState(false);
    const [loading, setLoading ] = useState(true);
    const isVisible = !loading && !closing;
    const [categorys , setCategorys] = useState<Category[]>([]);

    useEffect(() => {
        const getCategorys = async () => {
            const categoryData = await getCategories();
            setCategorys(categoryData);
        }

        getCategorys();
    },[])

    useEffect(() =>{

        if (categorys.length === 0) return

        const categoryValue = categorys.find(opt => opt.category_key === category)?.category_key;
        
        if (!categoryValue) return;

        const getData = async () => {
            const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0];
            const currentday = new Date().toISOString().split("T")[0];
            const userID = await supabaseUserID();

            const { data, error } = await supabase
            .from("transactions")
            .select("*")
            .eq("user_id", userID)
            .eq("type", "expense")
            .eq("category", categoryValue)
            .or(
                `date.gte.${firstDayOfMonth},recurring.eq.true`
            )
            .lte("date", currentday)

            if (error) {
                console.error("Error fetching transactions:", error);
                return
            }

            if (!error && data) {
                setTransactions(data);

                setLoading(false)
            }

        }

        getData();
    }, [categorys, category]) 

    const handleExtendMenu = (id: string) => {
    setOpenTransactions(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
        onClose();
        }, 300); // samma som duration i animation
    };

    if (!loading) return(
        <section className="fixed top-0 left-0 w-full h-full z-10 flex justify-center backdrop-blur-sm">
            <div className={`fixed w-90 h-fit bg-primary-900 text-secondary top-10 rounded-md text-center overflow-hidden bg-opacity-50
        transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}>
                <nav className="bg-accent text-primary w-full relative flex h-10 justify-center align-middle items-center">
                    <h1 className="text-2xl font-bold">{name}</h1>
                    <button className="absolute top-1/2 right-2 transform -translate-y-1/2" onClick={handleClose}><FontAwesomeIcon icon={faX}/></button>
                </nav>
                {transactions.map(transaction => 
                <div key={transaction.id} className={`border-b-2 p-1 min-h-15 h-fit grid ${openTransactions[transaction.id] ? "mt-3" : ""}`}>
    
                    {/* Rad med ikon + description/amount */}
                    <div className="flex items-center cursor-pointer" onClick={() => handleExtendMenu(transaction.id)}>
                    <div className="w-10 flex justify-center">
                        {openTransactions[transaction.id] 
                        ? <FontAwesomeIcon icon={faChevronDown}/> 
                        : <FontAwesomeIcon icon={faChevronUp}/>}
                    </div>
                    <div className="flex justify-between items-center flex-1 pl-2">
                        <p className="text-lg">{transaction.description}</p>
                        <p>{transaction.amount} kr</p>
                    </div>
                    </div>

                    {/* Extra info under raden */}
                    {openTransactions[transaction.id] && (
                    <div className={`mt-2 pl-12 flex flex-row gap-1 justify-between`}>
                        <p>{transaction.date}</p>
                        <p>Återkommande: {transaction.recurring ? "Ja" : "Nej"}</p>
                    </div>
                    )}

                </div>
                )}

            </div>
        </section>
    )
}