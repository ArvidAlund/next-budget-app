import PhoneBalance from "./HomeScreenComponents/balance";
import PhoneBudget from "./HomeScreenComponents/budget";
import PhoneNavbar from "./HomeScreenComponents/navbar";
import PhoneTransactions from "./HomeScreenComponents/transactions";
import { useState, useEffect, useRef } from "react";
import { emitEvent } from "@/app/lib/eventbus";
import PhoneOptionsModal from "@/components/options/phoneOptionsModal";
import { animateAwayItemsDuration } from "@/app/lib/globalSettings";
import NotificationModal from "@/components/notifications/notificationModal";
import ImproveModal from "@/components/improvement/improveModal";
import AddTransaction from "@/components/transactions/addTransaction";
import { Transaction } from "@/app/lib/types";


type ModalsOpenState = {
    addTransactionOpen: boolean;
    allTransactionsOpen: boolean;
    notificationsOpen: boolean;
    settingsOpen: boolean;
    improvementsOpen: boolean;
};
const PhoneHome = () => {
  const [anyModalOpen, setAnyModalOpen] = useState<boolean>(false);
  const [modalsOpen, setModalsOpen] = useState<ModalsOpenState>({
    addTransactionOpen: false,
    allTransactionsOpen: false,
    notificationsOpen: false,
    settingsOpen: false,
    improvementsOpen: false,
  });
  const containerRef = useRef<HTMLElement | null>(null);
  const [canShowSettings, setCanShowSettings] = useState<boolean>(false);
  const [createdTransactions, setCreatedTransactions] = useState<Transaction[] | null>(null);

  useEffect(() => {
    const isAnyModalOpen = Object.values(modalsOpen).some((isOpen) => isOpen);
    setAnyModalOpen(isAnyModalOpen);
    if (containerRef.current && isAnyModalOpen) {
        containerRef.current.scrollTo({ top: 0, behavior: "instant" });
        emitEvent("animateAwayItems");
    }

    if (!isAnyModalOpen) {
        emitEvent("animateBackItems");
    }

    if (modalsOpen.settingsOpen){
      setTimeout(() => {
        setCanShowSettings(true);
      }, animateAwayItemsDuration * 1000);
    } else {
      setCanShowSettings(false);
    }
  }, [modalsOpen]);

  return (
    <>
        <main ref={containerRef} className={`w-full h-screen bg-[#8280FE] *:px-4 relative flex flex-col ${anyModalOpen ? "overflow-hidden" : "overflow-y-scroll overflow-x-hidden no-scrollbar"}`}>
            <PhoneNavbar 
            optionsOpen={() => setModalsOpen(prev => ({...prev, settingsOpen:true}))} 
            notificationsOpen={() => setModalsOpen(prev => ({...prev, notificationsOpen:true}))} 
            settingsOpen={modalsOpen.settingsOpen} />

            <PhoneBalance createdTransactions={createdTransactions} />
            
            <PhoneBudget openImproveModal={() => setModalsOpen(prev => ({...prev, improvementsOpen:true}))}/>

            <PhoneTransactions 
            openNewTransaction={() => setModalsOpen(prev => ({...prev, addTransactionOpen: true}))} 
            openAllTransactions={() => setModalsOpen(prev => ({...prev, allTransactionsOpen: true}))} 
            createdTransactions={createdTransactions}
            />

            {modalsOpen.settingsOpen && canShowSettings && (
              <div className="absolute top-0 left-0 w-full h-full bg-black z-50 overflow-x-hidden overflow-y-scroll no-scrollbar">
                <PhoneOptionsModal onClose={() => setModalsOpen(prev => ({...prev, settingsOpen:false}))} />
              </div>
            )}

            {modalsOpen.notificationsOpen && (
                <NotificationModal onClose={() => {
                    setTimeout(() => {
                        setModalsOpen(prev => ({...prev, notificationsOpen:false}));
                    }, animateAwayItemsDuration * 1000);
                }} />
            )}

            {modalsOpen.improvementsOpen && (
              <ImproveModal onClose={() => {
                  setTimeout(() => {
                      setModalsOpen(prev => ({...prev, improvementsOpen:false}));
                  }, animateAwayItemsDuration * 1000);
              }} />
            )}

            {modalsOpen.addTransactionOpen && (
              <AddTransaction onClose={(transactionData) => {
                        if (transactionData){
                            setCreatedTransactions(prev => {
                              const newTransaction: Transaction = {
                                  id: String(prev ? prev.length + 1 : 1),
                                  type: transactionData.type,
                                  category: transactionData.category,
                                  amount: transactionData.amount,
                                  date: transactionData.date,
                                  description: transactionData.description,
                                  user_id: "",
                                  recurring: transactionData.recurring ?? false,
                              };

                              if (prev) {
                                  return [...prev, newTransaction];
                              } else {
                                  return [newTransaction];
                              }
                          });

                        }
                        setModalsOpen(prev => ({...prev, addTransactionOpen:false}));
                }} />
            )}
        </main>
    </>
  );
}

export default PhoneHome;