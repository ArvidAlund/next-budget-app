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
    date: string;
    read: boolean;
    title?: string;
    type?: NotificationType;
};

type NotificationType = "info" | "warning" | "error" | "success";
export type { Transaction, Notification, NotificationType };