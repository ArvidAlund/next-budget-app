import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";

/**
 * Renders the Notifications settings UI section.
 *
 * When unsaved changes are present, includes a "Spara Ändringar" button that triggers saving.
 *
 * @returns The section element containing the centered title and a container for notification settings.
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