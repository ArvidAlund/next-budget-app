import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";

/**
 * Render the privacy settings section with a centered title and a conditional save button.
 *
 * The "Spara Ändringar" button is shown when there are unsaved changes and triggers saving via the unsaved-changes hook.
 *
 * @returns The JSX element for the privacy settings UI.
 */
export default function PrivacyOptions() {
    const { unsavedChanges, setSaveChanges } = useUnsavedChanges();
    
    return (
        <section className="text-secondary">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
                <h1 className="text-2xl font-bold w-full text-center">
                Integritets Inställningar
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