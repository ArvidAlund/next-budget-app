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

type Notification = {
    id: number;
    message: string;
    read: boolean;
    date: string;
    created_at?: string;
};
export type { Transaction, Notification };