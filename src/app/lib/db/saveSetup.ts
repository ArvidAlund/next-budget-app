type Transaction =
  | {
      day: string;
      amount: number;
      type: "salary";
    }
  | {
      day: string;
      amount: number;
      type: "grant";
    }
  | {
      day: string;
      amount: number;
      description: string;
      category: string;
      type: "expense";
    }
  | {
      amount: number;
      type: "startAmount";
    };



export default async function saveSetup(transactions: Transaction[]) {
    console.log(transactions)
}