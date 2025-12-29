import { useState, useEffect } from "react";
import { formatCurrency } from "../../app/lib/formatcurrency";

const BalanceAnimation = ({start = 0, end, duration = 1000} : {start?: number, end: number, duration?: number}) => {
    const [balance, setBalance] = useState(start);

    useEffect(() => {
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setBalance(Math.floor(progress * (end - start) + start));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [start, end, duration]);

    return (
        <span>{formatCurrency(balance)}</span>
    )
}

export default BalanceAnimation;