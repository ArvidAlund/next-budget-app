/**
 * Renders the Notifications settings menu UI.
 *
 * The component outputs a section with a centered header reading "Notifikations Inställningar"
 * and an empty container reserved for notification options.
 *
 * @returns A React element: a section (class "text-secondary") containing a centered `h1`
 * with the title and a styled `div` intended to hold notification setting entries.
 */
export default function NotificationsMenu() {
    return (
        <section className="text-secondary">
            <h1 className="text-2xl font-bold mb-4 w-full text-center">Notifikations Inställningar</h1>
            <div className="space-y-4 [&>*]:border-b [&>*]:pb-4">
            </div>
        </section>
    );
}