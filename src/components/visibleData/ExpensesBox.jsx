import { Container } from "../ui/container"
import { formatCurrency } from "@/app/lib/formatcurrency"
import { useEffect, useState } from "react"
import supabase from "@/app/lib/supabaseClient"
import { supabaseUserID } from "@/app/lib/supabaseClient"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { addTransaction, deleteTransaction } from "@/app/lib/transactions"

/**
 * Trunkera text till max 20 tecken
 * @param text Text som ska trunkeras
 * @returns Trunkerad text med "..." om den är längre än 20 tecken
 */
export function truncate(text){
  return text.length > 20
    ? text.slice(0, 20).trim() + "..."
    : text
}


/**
 * ExpensesBox
 * ----------------
 * Visar en enkel lista av utgifter i en box med rubrik
 */
export function ExpensesBox() {
  const [reccuringItems, setReccuringItems] = useState([]);
  const [ activeItem, setActiveItem ] = useState();

  useEffect(() =>{
    const fetchData = async () => {
        const userID = await supabaseUserID();
      
        const { data, error } = await supabase.from("transactions")
        .select('*')
        .eq("user_id", userID)
        .eq("recurring", true)
      
        if (error) return

        console.log("recurring: ", data)
        if (!error && data){
          setReccuringItems(data)
        }
    }

    fetchData()
  }, []);
  
  const handleClick = (id) => {
    const found = reccuringItems.find(element => element.id === id);
    if (found) {
      setActiveItem(found);
    }
  };

  const handleClose = () =>{
    setActiveItem();
  }

  const handleEnd = async () => {
    if (!activeItem) return;

    // Dagens datum
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // getMonth() är 0-indexerad
    const currentDay = today.getDate();

    // Startdatum från aktivt objekt
    const [startYearStr, startMonthStr, startDayStr] = activeItem.date.split("-");
    let year = parseInt(startYearStr);
    let month = parseInt(startMonthStr);
    const day = parseInt(startDayStr);

    console.log("Start:", year, month, day);
    console.log("Today:", currentYear, currentMonth, currentDay);

    // Loopa tills vi når dagens år/månad
    while (year < currentYear || (year === currentYear && month <= currentMonth)) {
      const date = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      console.log("Adding transaction for:", date);

      // Skapa transaktion
      await addTransaction({
        type: "expense",
        category: activeItem.category,
        amount: activeItem.amount,
        description: activeItem.description,
        recurring: false,
        date: date,
      });

      // Öka månaden
      if (month === 12) {
        month = 1;
        year += 1;
      } else {
        month += 1;
      }

      // Avsluta om vi precis lagt till dagens månad
      if (year === currentYear && month > currentMonth) break;
    }

    console.log("All missing transactions added!");
    console.log(activeItem.id, "     -------    ", activeItem.user_id)

    if (activeItem?.id && activeItem?.user_id) {
      await deleteTransaction(activeItem.id, activeItem.user_id);
    } else {
      console.error("Cannot delete: activeItem.id or user_id missing");
    }
    
    window.location.reload();
  };
  return (
    <> 
      <Container sizeClass="w-full h-fit flex flex-col" colorClass="bg-white">
        {/* Rubrik */}
        <h3 className="text-center font-bold pb-4 text-primary">Utgifter</h3>

        {reccuringItems.map((item) => (
          
            <div
              className="flex justify-between font-bold cursor-pointer bg-primary p-4 rounded-lg mb-2"
              onClick={() => handleClick(item.id)}
              key={item.id} 
            >
              {/* Utgiftsbeskrivning */}
              <p>{truncate(item.description)}</p>

              {/* Belopp */}
              <div className={`${item.type === "expense" ? "text-red-500": "text-green-500"}`}>{item.type === "expense" ? "-" : null} {formatCurrency(item.amount)} KR</div>
            </div>
          
        ))}
      </Container>
      {activeItem ? (
        <div className="fixed top-0 left-0 w-screen h-screen bg-[rgb(0,0,0,0.5)] backdrop-blur-sm flex items-center justify-center">
          <div className="w-1/2 h-fit p-2 bg-secondary text-center font-semibold relative flex flex-col gap-2">
            <button className="absolute -top-[15px] -right-[15px] bg-secondary p-2 rounded-md border-2 border-primary" onClick={handleClose}><FontAwesomeIcon icon={faX}/></button>
            <h4 className="text-center font-bold">{activeItem.description}</h4>
            <p className="text-lg">{formatCurrency(activeItem.amount)} kr</p>
            <button className="border-2 p-2 rounded-md text-secondary bg-red-500" onClick={handleEnd}>Avsluta utgift</button>
          </div>

        </div>
      ) : null}
    </>
  )
}
