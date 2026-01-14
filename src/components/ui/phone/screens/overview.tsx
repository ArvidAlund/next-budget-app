import { Bell, Plus, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import ProgressBar from "../../progressBar";
import { formatCurrency } from "@/app/lib/formatcurrency";
import BalanceAnimation from "../../balanceAnimation";
import { useState, useRef, useEffect } from "react";
import AddTransaction from "@/components/transactions/addTransaction";
import gsap from "gsap";
import ImproveModal from "@/components/improvement/improveModal";
import NotificationModal from "@/components/notifications/notificationModal";
import PhoneTransactionCon from "@/components/home/transactions/phoneTransactionCon";
import PhoneOptionsModal from "@/components/options/phoneOptionsModal";
import { animateBackItems, animateAwayItems } from "@/app/animations/appComponents";
import { Transaction } from "@/app/lib/types";

const transactions: Transaction[] = [
    {
        id: "1",
        category: "Transport",
        date: "2025-09-27",
        amount: 300,
        type: "expense",
        description: "Tunnelbanekort",
        user_id: "demo-user",
        recurring: false,
    },
    {
        id: "2",
        category: "Matinköp",
        date: "2025-09-26",
        amount: 1200,
        type: "expense",
        description: "Veckohandling",
        user_id: "demo-user",
        recurring: false,
    },
    {
        id: "3",
        category: "Lön",
        date: "2025-09-25",
        amount: 25000,
        type: "income",
        description: "Månadslön",
        user_id: "demo-user",
        recurring: false,
    },
    {
        id: "4",
        category: "Nöjen",
        date: "2025-09-24",
        amount: 450,
        type: "expense",
        description: "Bio med vänner",
        user_id: "demo-user",
        recurring: false,
    },
    {
        id: "5",
        category: "Hälsa",
        date: "2025-09-23",
        amount: 800,
        type: "expense",
        description: "Gymmedlemskap",
        user_id: "demo-user",
        recurring: false,
    },
    {
        id: "6",
        category: "Övrigt",
        date: "2025-09-22",
        amount: 150,
        type: "expense",
        description: "Present till kollega",
        user_id: "demo-user",
        recurring: false,
    },
    {
        id: "7",
        category: "Hushåll",
        date: "2025-09-01",
        amount: 12000,
        type: "expense",
        description: "Hyra",
        user_id: "demo-user",
        recurring: false,
    },
    {
        id: "8",
        category: "Hushåll",
        date: "2025-09-01",
        amount: 600,
        type: "expense",
        description: "Elräkning",
        user_id: "demo-user",
        recurring: false,
    }
];



const OverViewScreen = ({onClick} : {onClick: () => void}) => {
    const [addTransactionOpen, setAddTransactionOpen] = useState<boolean>(false);
    const [closeTransactionOpen, setCloseTransactionOpen] = useState<boolean>(false);
    const transactionComponentRef = useRef<HTMLDivElement>(null);
    const [transactionsList, setTransactionsList] = useState(transactions);
    const [openImproveModal, setOpenImproveModal] = useState<boolean>(false);
    const [closeImproveModal, setCloseImproveModal] = useState<boolean>(false);
    const ImproveModalRef = useRef<HTMLDivElement>(null);
    const totalIncomeRef = useRef<HTMLDivElement>(null);
    const totalExpenseRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const balanceRef = useRef<HTMLDivElement>(null);
    const [openNotification, setOpenNotification] = useState<boolean>(false);
    const [closeNotification, setCloseNotification] = useState<boolean>(false);
    const notificationRef = useRef<HTMLDivElement>(null);
    const [notificationCount, setNotificationCount] = useState<number>(4);
    const [totalExpense, setTotalExpense] = useState<number>(0);
    const [totalIncome, setTotalIncome] = useState<number>(0);
    const [totalBalance, setTotalBalance] = useState<number>(0);
    const budget = 25000;
    const [anyModalOpen, setAnyModalOpen] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [optionsOpen, setOptionsOpen] = useState<boolean>(false);
    const [optionsClose, setOptionsClose] = useState<boolean>(false);
    const iconRef = useRef<HTMLDivElement>(null);
    const [animationComplete, setAnimationComplete] = useState<boolean>(false);
    const transactionsConRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (transactionsList.length === 0) {
            setTotalExpense(0);
            setTotalIncome(0);
            setTotalBalance(0);
            return;
        }
        let expense = 0;
        let income = 0;
        transactionsList.forEach(t => {
            if (t.type === "expense") {
                expense += t.amount;
            } else if (t.type === "income") {
                income += t.amount;
            }
        });
        setTotalExpense(expense);
        setTotalIncome(income);
        setTotalBalance(income - expense);
    }, [transactionsList]);

    useEffect(() => {
        if (addTransactionOpen && transactionComponentRef.current) {
            gsap.fromTo(transactionComponentRef.current,
                { left: "100%" },
                { left: "0%", duration: 0.5 }
            );
        }
    }, [addTransactionOpen]);

    useEffect(() => {
        if (closeTransactionOpen && transactionComponentRef.current) {
            gsap.fromTo(transactionComponentRef.current,
                { left: "0%" },
                { left: "100%", duration: 0.5 }
            );
        }
    }, [closeTransactionOpen]);

    useEffect(() => {
        // Animate total income and expense cards to go to sides then improve modal to come from bottom and fill screen
        if (openImproveModal && ImproveModalRef.current && totalIncomeRef.current && totalExpenseRef.current && progressBarRef.current && balanceRef.current) {
            animateAwayItems({totalIncome: totalIncomeRef.current, totalExpense: totalExpenseRef.current, progressBar: progressBarRef.current, balance: balanceRef.current, transactionsCon: transactionsConRef.current});

            gsap.fromTo(ImproveModalRef.current,
                { y: "100%" },
                { y: "0%", duration: 0.5, delay: 0.1, ease: "power1.inOut" }
            );
        }
    }, [openImproveModal]);

    useEffect(() => {
        if (closeImproveModal && ImproveModalRef.current && totalIncomeRef.current && totalExpenseRef.current && progressBarRef.current && balanceRef.current) {
            gsap.to(ImproveModalRef.current, {
                y: "100%",
                duration: 0.5,
                ease: "power1.inOut",
            });
            animateBackItems({totalIncome: totalIncomeRef.current, totalExpense: totalExpenseRef.current, progressBar: progressBarRef.current, balance: balanceRef.current, transactionsCon: transactionsConRef.current});
        }
    }, [closeImproveModal]);


    useEffect(() => {
        if (openNotification && notificationRef.current) {
            gsap.fromTo(notificationRef.current,
                { bottom: "100%" },
                { bottom: "0%", duration: 0.5 }
            );
        }
    }, [openNotification]);

    useEffect(() => {
        if (closeNotification && notificationRef.current) {
            gsap.fromTo(notificationRef.current,
                { bottom: "0%" },
                { bottom: "100%", duration: 0.5 }
            );
        }
    }, [closeNotification]);

    useEffect(() => {
        setAnyModalOpen(addTransactionOpen || openImproveModal || openNotification);
    }, [addTransactionOpen, openImproveModal, openNotification]);

    useEffect(() => {
        if (containerRef.current && anyModalOpen) {
            containerRef.current.scrollTo({ top: 0, behavior: "instant" });
        }
    }, [anyModalOpen]);

    useEffect(() => {
        // Animate iconref to change color and scale up from start position to full screen then open options page
        // All other elements should go away sideways during the animation
        if (optionsOpen && iconRef.current && containerRef.current) {
            const iconRect = iconRef.current.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();
            const scaleX = containerRect.width / iconRect.width;
            const scaleY = containerRect.height / iconRect.height;
            const scale = Math.max(scaleX, scaleY);
            const x = containerRect.left + containerRect.width / 2 - (iconRect.left + iconRect.width / 2);
            const y = containerRect.top + containerRect.height / 2 - (iconRect.top + iconRect.height / 2);
            gsap.to(iconRef.current, {
                x: x,
                y: y,
                scale: scale,
                borderRadius: 0,
                duration: 0.5,
                backgroundColor: "#000",
                ease: "power1.inOut",
            });
            animateAwayItems({totalIncome: totalIncomeRef.current, totalExpense: totalExpenseRef.current, progressBar: progressBarRef.current, balance: balanceRef.current, transactionsCon: transactionsConRef.current});
            const timer = setTimeout(() => {
                setAnimationComplete(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [optionsOpen]);

    useEffect(() => {
        if (optionsClose && iconRef.current) {
            gsap.to(iconRef.current, {
                x: 0,
                y: 0,
                scale: 1,
                borderRadius: "50%",
                duration: 0.5,
                backgroundColor: "",
                ease: "power1.inOut",
            });
            animateBackItems({totalIncome: totalIncomeRef.current, totalExpense: totalExpenseRef.current, progressBar: progressBarRef.current, balance: balanceRef.current, transactionsCon: transactionsConRef.current});
        }
    }, [optionsClose]);


  return <section ref={containerRef} className={`w-full h-full bg-[#8280FE] *:px-4 relative ${anyModalOpen ? "overflow-hidden" : "overflow-y-scroll overflow-x-hidden no-scrollbar"}`} onClick={onClick}>
        <div className="flex justify-between text-black py-4 select-none *:cursor-pointer">
            <div className="relative">
                <div ref={iconRef} className="absolute p-[clamp(2px,1.2vw,1rem)] bg-blue-500 rounded-full flex justify-center items-center" onClick={() => setOptionsOpen(true)}>
                    <p className="font-bold w-[clamp(1rem,2vw,1.5rem)] h-[clamp(1rem,2vw,1.5rem)] text-center">B</p>
                </div>
                <div className="absolute p-[clamp(2px,1.2vw,1rem)] bg-white rounded-full flex justify-center items-center left-10">
                    <Plus className="w-[clamp(1rem,2vw,1.5rem)] h-[clamp(1rem,2vw,1.5rem)]" />
                </div>
            </div>


            <button className="bg-[#6c6afa] rounded-full p-[clamp(2px,1.2vw,1rem)] relative hover:bg-[#5a58e0] transition duration-300" onClick={() => setOpenNotification(true)}>
                <Bell className="w-[clamp(1rem,2vw,1.5rem)] h-[clamp(1rem,2vw,1.5rem)]" />
                {notificationCount > 0 && <div className="absolute aspect-square rounded-full top-2 bg-white text-xs w-4 flex justify-center items-center right-2 border border-gray-300">
                    <span className="select-none">{notificationCount}</span>
                </div>}
            </button>
        </div>

        <div className="w-full flex flex-col justify-center items-start mt-8 text-white" ref={balanceRef}>
            <p className="text-xs">Total balans</p>
            <h1 className="text-center w-full text-[clamp(0.8rem,4vw,6rem)] mt-4 text-[#0B0748]"><BalanceAnimation end={totalBalance} /> kr</h1>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full mt-8">
            <div className="bg-white/30 backdrop-blur-md p-4 rounded flex flex-col items-start text-[#0B0748]" ref={totalIncomeRef}>
                <p className="text-xs">Inkomster</p>
                <h2 className="text-[clamp(0.5rem,1.2vw,2rem)] mt-2">{formatCurrency(totalIncome)} kr</h2>
                <div className="flex justify-center items-center mt-2">
                    <TrendingUp className="text-green-500" size={24}/>
                    <p className="text-sm ml-1">+5%</p>
                </div>
            </div>
            <div className="bg-white/30 backdrop-blur-md p-4 rounded flex flex-col items-start text-[#0B0748]" ref={totalExpenseRef}>
                <p className="text-xs">Utgifter</p>
                <h2 className="text-[clamp(0.5rem,1.2vw,2rem)] mt-2">{formatCurrency(totalExpense)} kr</h2>
                <div className="flex justify-center items-center mt-2">
                    <TrendingDown className="text-red-500" size={24}/>
                    <p className="text-sm ml-1">-3%</p>
                </div>
            </div>
        </div>

        <div className="mt-6" ref={progressBarRef}>
            <div className="flex justify-between items-center text-[clamp(0.5rem,0.8vw,1.5rem)]">
                <p>Din budget</p>
                <button className="bg-[#0B0748] p-2 rounded-full flex justify-center items-center" onClick={() => setOpenImproveModal(true)}>
                    <Sparkles size={16} className="inline mr-2"/>
                    <span>Förbättra</span>
                </button>
            </div>
            <div className="mt-4">
                <ProgressBar start={0} end={budget} current={totalExpense} />
            </div>
            <div className="flex justify-between items-center text-[clamp(0.5rem,0.8vw,1.5rem)]">
                <p>{formatCurrency(totalExpense)} kr</p>
                <p>{formatCurrency(budget)} kr</p>
            </div>
        </div>

        <div ref={transactionsConRef} className="w-full h-fit max-h-screen rounded-3xl bg-white mt-6">
            <div className="flex justify-between items-center p-2">
                <h3 className="text-[#0B0748] font-semibold w-fit text-[clamp(0.5rem,1.3vw,1.5rem)]">Senaste transaktioner</h3>
                <button className="bg-[#0B0748] p-3 rounded-full flex justify-center items-center text-white text-[clamp(0.5rem,0.8vw,1.5rem)]" onClick={() => setAddTransactionOpen(true)}>
                    <Plus size={16} className="inline mr-2"/>
                    <span className="text-nowrap">Lägg till</span>
                </button>
            </div>
            <ul className="px-4 pb-4">
                {transactionsList.map((transaction, index) => (
                    <PhoneTransactionCon key={transaction.id} transaction={transaction} index={index} />
                ))}
            </ul>
        </div>

        {addTransactionOpen && (
            <div ref={transactionComponentRef} className="absolute top-0 w-full h-full bg-primary z-50">
                <AddTransaction onClose={(transaction) => {
                    if (!transaction) {
                        setCloseTransactionOpen(true);
                        setTimeout(() => {
                            setAddTransactionOpen(false);
                            setCloseTransactionOpen(false);
                        }, 500);
                        return;
                    }
                    const newTransaction : Transaction = {
                        id: Math.random().toString(36).substring(2, 9),
                        category: transaction.category,
                        date: transaction.date,
                        amount: Number(transaction.amount),
                        type: transaction.type,
                        description: String(transaction.description),
                        recurring: transaction.recurring,
                        user_id: "demo-user",
                    };
                    setTransactionsList([newTransaction, ...transactionsList]);
                    setCloseTransactionOpen(true);
                    setTimeout(() => {
                        setAddTransactionOpen(false);
                        setCloseTransactionOpen(false);
                    }, 500);
                }}/>
            </div>
        )}

        {openImproveModal && (
            <div ref={ImproveModalRef} className="absolute top-0 w-full h-full bg-linear-to-b from-[#8280FE] to-white z-50 overflow-x-hidden overflow-y-scroll no-scrollbar">
                <ImproveModal onClose={() => {
                    setCloseImproveModal(true);
                    setTimeout(() => {
                        setOpenImproveModal(false);
                        setCloseImproveModal(false);
                    }, 500);
                }} />
            </div>
        )}

        {openNotification && (
            <div ref={notificationRef} className="absolute left-0 w-full h-full bg-linear-to-b from-[#8280FE] to-white z-50 rounded-3xl overflow-x-hidden overflow-y-scroll no-scrollbar">
                <NotificationModal onClose={(unreadCount) => {
                    setNotificationCount(unreadCount);
                    setCloseNotification(true);
                    setTimeout(() => {
                        setOpenNotification(false);
                        setCloseNotification(false);
                    }, 500);
                }} />
            </div>
        )}
            
        {optionsOpen && animationComplete && (
            <div className="absolute top-0 left-0 w-full h-full bg-black z-50 overflow-x-hidden overflow-y-scroll no-scrollbar">
                <PhoneOptionsModal onClose={() => {
                    setOptionsClose(true);
                    setOptionsOpen(false);
                    setTimeout(() => {
                        setAnimationComplete(false);
                        setOptionsClose(false);
                    }, 500);
                }} />
            </div>
        )}
        
  </section>;
}
export default OverViewScreen;