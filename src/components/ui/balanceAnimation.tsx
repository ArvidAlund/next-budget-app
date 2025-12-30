import { useState, useEffect } from "react";
import { formatCurrency } from "../../app/lib/formatcurrency";

const BalanceAnimation = ({start = 0, end, duration = 1000} : {start?: number, end: number, duration?: number}) => {
    const [balance, setBalance] = useState(start);

    useEffect(() => {
        let startTimestamp: number | null = null;
        let animationId: number;
        const startBalance = balance;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setBalance(Math.floor(progress * (end - startBalance) + startBalance));
            if (progress < 1) {
                animationId = window.requestAnimationFrame(step);
            }
        };
        animationId = window.requestAnimationFrame(step);

        return () => {
            window.cancelAnimationFrame(animationId);
        };
    }, [end, duration]);

    return (
        <span>{formatCurrency(balance)}</span>
    )
}

export default BalanceAnimation;