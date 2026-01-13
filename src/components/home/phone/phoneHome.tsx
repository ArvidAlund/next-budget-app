import PhoneBalance from "./HomeScreenComponents/Balance";
import PhoneBudget from "./HomeScreenComponents/Budget";
import PhoneNavbar from "./HomeScreenComponents/Navbar";

const PhoneHome = () => {


  return (
    <>
        <main className="w-full h-screen bg-[#8280FE] *:px-4 relative">
            <PhoneNavbar />
            <PhoneBalance />
            <PhoneBudget />
        </main>
    </>
  );
}

export default PhoneHome;