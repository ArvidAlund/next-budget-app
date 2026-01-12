import HowWeWork from "@/components/about/howWeWork";
import Personal from "@/components/about/personal";
import UsersSection from "@/components/about/userCards";
import Vision from "@/components/about/vision";
import { Navbar, NavbarHeight } from "@/components/ui/navbar/Navbar";

const aboutPage = () => {
  return (
    <>
        <Navbar />
        <h1 style={{marginTop: NavbarHeight}} className="w-full text-center md:text-8xl">Om oss</h1>
        <Vision />
        <Personal />
        <HowWeWork />
        <UsersSection />
        <div className="h-20"/>
    </>
  )
}
export default aboutPage;