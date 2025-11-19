import ConnectButton from "@/components/Calendar/ConnectCalander";

export default function ConnectCalendarOption() {
    return (
        <div className="p-4 grid gap-2 grid-cols-2 items-center">
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Anslut Kalender</h2>
                <p>Anslut din kalender för att synkronisera händelser och påminnelser.</p>
            </div>
            <ConnectButton />
        </div>
    );
}