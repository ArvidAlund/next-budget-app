import { addTransaction } from "../transactions";

type Transaction =
  | { day: string; amount: number; type: "salary" }
  | { day: string; amount: number; type: "grant" }
  | { day: string; amount: number; description: string; category: string; type: "expense" }
  | { amount: number; type: "startAmount" };

/**
 * Save an array of transactions to persistent storage.
 *
 * Processes each transaction and creates a stored record with a computed date, resolved description, category, type, amount, and recurring flag. Date is built from the current year and month and the transaction's `day` if present (defaults to `1`). For `expense` items the stored `type` is `"expense"`; for all other variants it is `"income"`. The stored `category` is the transaction's `category` when present, otherwise the transaction `type`. Descriptions are resolved as follows: expense -> the transaction's `description`; salary -> `"Salary income"`; grant -> `"Grant income"`; startAmount -> `"Inital Amount"`. The `recurring` flag is `false` for `startAmount` and `true` for other types.
 *
 * @param transactions - Array of transactions; each item must be one of the union variants: `{ day: string; amount: number; type: "salary" }`, `{ day: string; amount: number; type: "grant" }`, `{ day: string; amount: number; description: string; category: string; type: "expense" }`, or `{ amount: number; type: "startAmount" }`.
 * @returns An object with `success` set to `true`.
 */
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