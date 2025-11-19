import ConnectButton from "@/components/Calendar/ConnectCalander";

/**
 * Renders a two-column option UI for connecting a calendar.
 *
 * The left column contains a title and description (in Swedish) explaining calendar synchronization; the right column renders a ConnectButton.
 *
 * @returns A JSX element representing the "Connect Calendar" option layout.
 */
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