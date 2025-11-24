import { addTransaction } from "../transactions";

type Transaction =
  | { day: string; amount: number; type: "salary" }
  | { day: string; amount: number; type: "grant" }
  | { day: string; amount: number; description: string; category: string; type: "expense" }
  | { amount: number; type: "startAmount" };

export default async function saveSetup(transactions: Transaction[]) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  await Promise.all(
    transactions.map(item => {
      let description: string;

        switch (item.type) {
        case "expense":
            description = item.description;
            break;
        case "salary":
            description = "Salary income";
            break;
        case "grant":
            description = "Grant income";
            break;
        case "startAmount":
            description = "Inital Amount";
            break;
        }


      return addTransaction({
        type: item.type === "expense" ? "expense" : "income",
        category: "category" in item ? item.category : item.type,
        amount: item.amount,
        date: `${year}-${month}-${"day" in item ? item.day : 1}`,
        description,
        recurring: item.type === "startAmount" ? false : true,
      });
    })
  );
  return {success:true}
}
