import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";

/**
 * Renders the privacy settings section with a centered header and a container for privacy option items.
 *
 * @returns The JSX structure for the privacy settings section.
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