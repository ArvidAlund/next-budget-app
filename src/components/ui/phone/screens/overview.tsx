import { Bell, Plus, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import ProgressBar from "../../progressBar";
import { formatCurrency } from "@/app/lib/formatcurrency";
import BalanceAnimation from "../../balanceAnimation";
import { useState, useRef, useEffect, use } from "react";
import AddTransaction from "@/components/transactions/addTransaction";
import gsap from "gsap";
import ImproveModal from "@/components/improvement/improveModal";
import NotificationModal from "@/components/notifications/notificationModal";

const transactions = [
    {
        id: 1,
        category: "Transport",
        date: "2024-09-27",
        amount: 300,
        type: "expense",
        title: "Tunnelbanekort",
    },
    {
        id: 2,
        category: "Matinköp",
        date: "2024-09-26",
        amount: 1200,
        type: "expense",
        title: "Veckohandling",
    },
    {
        id: 3,
        category: "Lön",    
        date: "2025-09-25",
        amount: 25000,
        type: "income",
        title: "Månadslön",
    },
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
            gsap.to(totalIncomeRef.current, {
                x: "-150%",
                duration: 0.5,
                ease: "power1.inOut",
            });
            gsap.to(totalExpenseRef.current, {
                x: "150%",
                duration: 0.5,
                ease: "power1.inOut",
            });
            gsap.to(progressBarRef.current, {
                y: "100%",
                opacity: 0,
                duration: 0.5,
                ease: "power1.inOut",
            });
            gsap.to(balanceRef.current, {
                y: "-50%",
                opacity: 0,
                duration: 0.5,
                ease: "power1.inOut",
            });

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
            gsap.to(totalIncomeRef.current, {
                x: "0%",
                duration: 0.5,
                delay: 0.1,
                ease: "power1.inOut",
            });
            gsap.to(totalExpenseRef.current, {
                x: "0%",
                duration: 0.5,
                delay: 0.1,
                ease: "power1.inOut",
            });
            gsap.to(progressBarRef.current, {
                y: "0%",
                opacity: 1,
                duration: 0.5,
                delay: 0.1,
                ease: "power1.inOut",
            });
            gsap.to(balanceRef.current, {
                y: "0%",
                opacity: 1,
                duration: 0.5,
                delay: 0.1,
                ease: "power1.inOut",
            });
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

  return <section className="w-full h-full bg-[#8280FE] *:px-4 relative overflow-hidden" onClick={onClick}>
        <div className="flex justify-between text-black py-4">
            <div className="relative">
                <div className="absolute p-4 bg-blue-500 rounded-full flex justify-center items-center">
                    <p className="font-bold w-6 text-center">B</p>
                </div>
                <div className="absolute p-4 bg-white rounded-full flex justify-center items-center left-10">
                    <Plus size={24} />
                </div>
            </div>


            <button className="bg-[#6c6afa] rounded-full p-4 relative hover:bg-[#5a58e0] transition duration-300" onClick={() => setOpenNotification(true)}>
                <Bell size={24} />
                {notificationCount > 0 && <div className="absolute aspect-square rounded-full top-2 bg-white text-xs w-4 flex justify-center items-center right-2 border border-gray-300">
                    <span className="select-none">{notificationCount}</span>
                </div>}
            </button>
        </div>

        <div className="w-full flex flex-col justify-center items-start mt-8 text-white" ref={balanceRef}>
            <p className="text-xs">Total balans</p>
            <h1 className="text-center w-full text-7xl mt-4 text-[#0B0748]"><BalanceAnimation end={12345} /> kr</h1>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full mt-8">
            <div className="bg-white/30 backdrop-blur-md p-4 rounded flex flex-col items-start text-[#0B0748]" ref={totalIncomeRef}>
                <p className="text-xs">Inkomster</p>
                <h2 className="text-2xl mt-2">25,000 kr</h2>
                <div className="flex justify-center items-center mt-2">
                    <TrendingUp className="text-green-500" size={24}/>
                    <p className="text-sm ml-1">+5%</p>
                </div>
            </div>
            <div className="bg-white/30 backdrop-blur-md p-4 rounded flex flex-col items-start text-[#0B0748]" ref={totalExpenseRef}>
                <p className="text-xs">Utgifter</p>
                <h2 className="text-2xl mt-2">12,655 kr</h2>
                <div className="flex justify-center items-center mt-2">
                    <TrendingDown className="text-red-500" size={24}/>
                    <p className="text-sm ml-1">-3%</p>
                </div>
            </div>
        </div>

        <div className="mt-6" ref={progressBarRef}>
            <div className="flex justify-between items-center">
                <p>Din budget</p>
                <button className="bg-[#0B0748] p-2 rounded-full flex justify-center items-center" onClick={() => setOpenImproveModal(true)}>
                    <Sparkles size={16} className="inline mr-2"/>
                    <span>Förbättra</span>
                </button>
            </div>
            <div className="mt-4">
                <ProgressBar start={0} end={20000} current={6655} />
            </div>
            <div className="flex justify-between items-center">
                <p>6,655 kr</p>
                <p>20,000 kr</p>
            </div>
        </div>

        <div className="w-full h-full rounded-3xl bg-white mt-6">
            <div className="flex justify-between items-center p-2">
                <h3 className="text-[#0B0748] font-semibold">Senaste transaktioner</h3>
                <button className="bg-[#0B0748] p-3 rounded-full flex justify-center items-center text-white" onClick={() => setAddTransactionOpen(true)}>
                    <Plus size={16} className="inline mr-2"/>
                    <span>Lägg till</span>
                </button>
            </div>
            <div className="px-4 pb-4">
                {transactionsList.map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center py-2 border-b border-gray-300 w-full">
                        <div className="flex flex-col">
                            <p className="font-semibold text-[#0B0748]">{transaction.title}</p>
                            <p className="text-xs text-gray-600">{new Date(transaction.date).toLocaleDateString("sv-SE", { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                        </div>
                        <p className={`font-semibold ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}>
                            {transaction.type === "income" ? "+ " : "- "}{formatCurrency(transaction.amount)} kr
                        </p>
                    </div>
                ))}
            </div>
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
                    const newTransaction = {
                        id: transactionsList.length + 1,
                        category: transaction.category,
                        date: transaction.date,
                        amount: Number(transaction.amount),
                        type: transaction.type,
                        title: transaction.title,
                        description: transaction.description,
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
            <div ref={ImproveModalRef} className="absolute top-0 w-full h-full bg-linear-to-b from-[#8280FE] to-white z-50">
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
            <div ref={notificationRef} className="absolute left-0 w-full h-full bg-linear-to-b from-[#8280FE] to-white z-50 rounded-3xl">
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
            
  </section>;
}
export default OverViewScreen;