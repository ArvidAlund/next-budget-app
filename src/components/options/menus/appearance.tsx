import ThemeOption from "../optionFunctions/theme";

import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";

/**
 * Renders the appearance settings section including theme controls and a conditional "Spara Ändringar" button.
 *
 * The button appears when there are unsaved changes and signals a save by calling the hook's setter.
 *
 * @returns The React element for the appearance settings UI.
 */
export default function AppearanceOptions() {
    const { unsavedChanges, setSaveChanges } = useUnsavedChanges();
    return (
        <section className="text-secondary">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
                <h1 className="text-2xl font-bold w-full text-center">
                Utseende Inställningar
                </h1>
                {unsavedChanges && Object.keys(unsavedChanges).length > 0 && (
                <button
                    className="border text-secondary px-4 py-2 rounded-md hover:bg-accent-300 transition-all duration-300 text-sm w-fit"
                    onClick={() => setSaveChanges(true)}
                >
                    Spara Ändringar
                </button>
                )}
            </div>
            <div className="space-y-4 [&>*]:border-b [&>*]:pb-4">
                <ThemeOption />
            </div>
        </section>
    );
}