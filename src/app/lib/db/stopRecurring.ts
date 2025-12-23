import { supabaseUserID } from "../supabaseClient";
import supabase from "../supabaseClient";

const StopRecurring = async (transaction_id: string) => {
    const userId = await supabaseUserID();
    if (!userId) throw new Error("Användare inte autentiserad");

    // 1. Hämta originaltransaktionen
    const { data: original, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("id", transaction_id)
        .eq("user_id", userId)
        .eq("recurring", true)
        .single();

    if (error || !original) {
        console.error("Kunde inte hämta återkommande transaktion:", error?.message);
        return { error };
    }

    // === Samma struktur som handleEnd ===

    // Dagens datum
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    // Startdatum
    const [startYearStr, startMonthStr, startDayStr] = original.date.split("-");
    let year = parseInt(startYearStr);
    let month = parseInt(startMonthStr);
    const day = parseInt(startDayStr);

    console.log("Start:", year, month, day);
    console.log("Today:", currentYear, currentMonth, currentDay);

    const inserts = [];

    // Loopa tills vi når dagens år/månad
    while (year < currentYear || (year === currentYear && month <= currentMonth)) {
        const date = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
        const dateObj = new Date(date);
      
        // Endast skapa om datumet är i framtiden för innevarande månad
        if (dateObj <= today) {
            const activeItem = {
                type: original.type,
                category: original.category,
                amount: original.amount,
                date: date,
                description: original.description,
                recurring: false,
                user_id: original.user_id,
            };
            inserts.push(activeItem);
         }
        

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

    // Sätt in alla transaktioner
    if (inserts.length > 0) {
        await supabase.from("transactions").insert(inserts);
    } else {
        console.log("Inga nya transaktioner behövde skapas.");
    }

    // Ta bort originalet
    await supabase
        .from("transactions")
        .delete()
        .eq("id", transaction_id)
        .eq("user_id", userId);

    return { success: true };
};

export default StopRecurring;
