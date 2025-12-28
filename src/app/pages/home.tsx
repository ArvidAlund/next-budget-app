import Navbar, { NavbarHeight } from "@/components/ui/navbar/Navbar";


export default function HomePage() {
  return (
    <>
        <Navbar />
        <main style={{ marginTop: NavbarHeight + "px" }} className="p-4 min-h-screen flex flex-col justify-center items-center">
            <h1>Welcome to the Home Page</h1>
            <p>This is the main landing page of the application.</p>
        </main>
    </>
  );
}