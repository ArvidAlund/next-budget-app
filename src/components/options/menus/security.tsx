import AutoLockOption from "../optionFunctions/autoLock";
import PinOption from "../optionFunctions/pin";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";

/**
 * Renders the security settings section with a centered Swedish heading and an empty container for option items.
 *
 * @returns The JSX element representing the security settings section.
 */
export default function SecurityOptions() {
    const { unsavedChanges, setSaveChanges } = useUnsavedChanges();

    return (
        <section className="text-secondary">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
                <h1 className="text-2xl font-bold w-full text-center">
                Säkerhets Inställningar
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
            <div className="space-y-4 [&>*]:border-b [&>*]:pb-4">
                <PinOption/>
                <AutoLockOption/>
            </div>
        </section>
    );
}