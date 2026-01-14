import PhoneBalance from "./HomeScreenComponents/balance";
import PhoneBudget from "./HomeScreenComponents/budget";
import PhoneNavbar from "./HomeScreenComponents/navbar";
import PhoneTransactions from "./HomeScreenComponents/transactions";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    const isAnyModalOpen = Object.values(modalsOpen).some((isOpen) => isOpen);
    setAnyModalOpen(isAnyModalOpen);
  }, [modalsOpen]);

  return (
    <>
        <main className={`w-full h-screen bg-[#8280FE] *:px-4 relative flex flex-col ${anyModalOpen ? "overflow-hidden" : "overflow-y-scroll overflow-x-hidden no-scrollbar"}`}>
            <PhoneNavbar optionsOpen={() => setModalsOpen(prev => ({...prev, settingsOpen:true}))} notificationsOpen={() => setModalsOpen(prev => ({...prev, notificationsOpen:true}))} />
            <PhoneBalance />
            <PhoneBudget openImproveModal={() => setModalsOpen(prev => ({...prev, improvementsOpen:true}))}/>
            <PhoneTransactions openNewTransaction={() => setModalsOpen(prev => ({...prev, addTransactionOpen: true}))} openAllTransactions={() => setModalsOpen(prev => ({...prev, allTransactionsOpen: true}))} />
        </main>
    </>
  );
}

export default PhoneHome;