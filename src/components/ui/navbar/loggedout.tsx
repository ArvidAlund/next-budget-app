const LoggedOutNavbar = ({ NavbarHeight }: { NavbarHeight: number }) => {
    return (
    <header style={{ height: NavbarHeight + "px" }} className="fixed grid grid-cols-10 top-0 left-0 w-full bg-primary/20 backdrop-blur-md border-0 z-50 lg:h-20 lg:pt-2 lg:pb-2 transition-all duration-300">
        <div className="col-span-10 flex justify-center items-center">
            <h1 className="text-secondary text-lg font-semibold">Welcome, Guest!</h1>
        </div>
    </header>
    );
}
export default LoggedOutNavbar;