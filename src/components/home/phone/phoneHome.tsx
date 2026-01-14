import PhoneBalance from "./HomeScreenComponents/balance";
import PhoneBudget from "./HomeScreenComponents/budget";
import PhoneNavbar from "./HomeScreenComponents/navbar";
import PhoneTransactions from "./HomeScreenComponents/transactions";
import { useState } from "react";

const PhoneHome = () => {
  const [anyModalOpen, setAnyModalOpen] = useState<boolean>(false);
  return (
    <>
        <main className={`w-full h-screen bg-[#8280FE] *:px-4 relative flex flex-col ${anyModalOpen ? "overflow-hidden" : "overflow-y-scroll overflow-x-hidden no-scrollbar"}`}>
            <PhoneNavbar />
            <PhoneBalance />
            <PhoneBudget />
            <PhoneTransactions />
        </main>
    </>
  );
}

export default PhoneHome;