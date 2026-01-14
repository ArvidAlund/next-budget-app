type Transaction = {
    id: string;
    type: "income" | "expense";
    category: string;
    amount: number;
    date: string;
    description?: string;
    user_id: string;
    recurring: boolean;
};

export type { Transaction };