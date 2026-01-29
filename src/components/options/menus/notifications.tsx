import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";

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
    const { unsavedChanges, setSaveChanges } = useUnsavedChanges();
    
    return (
        <section className="text-secondary">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
                <h1 className="text-2xl font-bold w-full text-center">
                Notifikations Inställningar
                </h1>
                {unsavedChanges && Object.keys(unsavedChanges).length > 0 && (
                <button
                    className="border text-secondary px-4 py-2 rounded-md hover:bg-neutral-800 transition-all duration-300 text-sm w-fit"
                    onClick={() => setSaveChanges(true)}
                >
                    Spara Ändringar
                </button>
                )}
            </div>
            <div className="space-y-4 *:border-b *:pb-4">
            </div>
        </section>
    );
}