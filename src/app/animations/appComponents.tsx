import gsap from "gsap";

type AnimateItemsParams = {
    totalIncome: HTMLElement | null;
    totalExpense: HTMLElement | null;
    progressBar: HTMLElement | null;
    balance: HTMLElement | null;
    transactionsCon: HTMLElement | null;
};


const animateAwayItems = ({totalIncome, totalExpense, progressBar, balance, transactionsCon}: AnimateItemsParams) => {
        if (totalIncome && totalExpense && progressBar && balance && transactionsCon) {
            const animationDuration = 0.2;
            gsap.to(totalIncome, {
                x: "-150%",
                duration: animationDuration,
                ease: "power1.inOut",
            });
            gsap.to(totalExpense, {
                x: "150%",
                duration: animationDuration,
                ease: "power1.inOut",
            });
            gsap.to(progressBar, {
                y: "100%",
                opacity: 0,
                duration: animationDuration,
                ease: "power1.inOut",
            });
            gsap.to(balance, {
                y: "-50%",
                opacity: 0,
                duration: animationDuration,
                ease: "power1.inOut",
                delay: 0.1,
            });
            gsap.to(transactionsCon, {
                y: "150%",
                opacity: 0,
                duration: animationDuration,
                ease: "power1.inOut",
                delay: 0.1,
            });
        }
    }

    const animateBackItems = ({totalIncome, totalExpense, progressBar, balance, transactionsCon}: AnimateItemsParams) => {
        if (totalIncome && totalExpense && progressBar && balance && transactionsCon) {
            const animationDuration = 0.5;
            gsap.to(totalIncome, {
                x: "0%",
                duration: animationDuration,
                ease: "power1.inOut",
            });
            gsap.to(totalExpense, {
                x: "0%",
                duration: animationDuration,
                ease: "power1.inOut",
            });
            gsap.to(progressBar, {
                y: "0%",
                opacity: 1,
                duration: animationDuration,
                ease: "power1.inOut",
            });
            gsap.to(balance, {
                y: "0%",
                opacity: 1,
                duration: animationDuration,
                ease: "power1.inOut",
                delay: 0.1,
            });
            gsap.to(transactionsCon, {
                y: "0%",
                opacity: 1,
                duration: animationDuration,
                ease: "power1.inOut",
                delay: 0.1,
            });
        }
    }

export { animateAwayItems, animateBackItems };