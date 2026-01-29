import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import DeleteDataOption from "../optionFunctions/delete";
import LogOutOption from "../optionFunctions/logout";

/**
 * Renders an account settings section with a centered "Konto Inställningar" heading and a styled container for option rows.
 *
 * @returns The JSX element representing the account settings section.
 */
export default function SecurityOptions() {
    const { unsavedChanges, setSaveChanges } = useUnsavedChanges();
    
    return (
        <section className="text-secondary">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
                <h1 className="text-2xl font-bold w-full text-center">
                Konto Inställningar
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
                <LogOutOption/>
                <DeleteDataOption/>
            </div>
        </section>
    );
}