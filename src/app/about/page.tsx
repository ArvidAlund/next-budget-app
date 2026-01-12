import Personal from "@/components/about/personal";
import { Navbar, NavbarHeight } from "@/components/ui/navbar/Navbar";

const aboutPage = () => {
  return (
    <>
        <Navbar />
        <h1 style={{marginTop: NavbarHeight}} className="w-full text-center md:text-8xl">Om oss</h1>
        <Personal />
    </>
  )
}
export default aboutPage;