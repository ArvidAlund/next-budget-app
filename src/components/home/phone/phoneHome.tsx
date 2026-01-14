import PhoneBalance from "./HomeScreenComponents/balance";
import PhoneBudget from "./HomeScreenComponents/budget";
import PhoneNavbar from "./HomeScreenComponents/navbar";
import PhoneTransactions from "./HomeScreenComponents/transactions";

const PhoneHome = () => {


  return (
    <>
        <main className="w-full h-screen bg-[#8280FE] *:px-4 relative flex flex-col">
            <PhoneNavbar />
            <PhoneBalance />
            <PhoneBudget />
            <PhoneTransactions />
        </main>
    </>
  );
}

export default PhoneHome;