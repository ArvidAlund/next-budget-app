import CTA from "@/components/mainpage/cta";
import { Navbar, NavbarHeight } from "@/components/ui/navbar/Navbar";


/**
 * Render the home page containing the top navigation and a centered call-to-action.
 *
 * The main content is offset vertically by `NavbarHeight` so it appears below the navbar.
 *
 * @returns A React element containing the `Navbar` and a `main` element with the `CTA`.
 */
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