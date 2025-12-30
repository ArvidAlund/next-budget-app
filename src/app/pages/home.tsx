import CTA from "@/components/mainpage/cta";
import { Navbar, NavbarHeight } from "@/components/ui/navbar/Navbar";


export default function HomePage() {
  return (
    <>
        <Navbar />
        <main style={{ marginTop: NavbarHeight + "px" }} className="px-4 flex flex-col justify-center items-center">
            <CTA />
        </main>
    </>
  );
}