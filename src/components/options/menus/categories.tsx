import SortCategoriesOption from "../optionFunctions/sortCategories";

import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";

/**
 * Render the categories settings UI, including the sort option and a conditional save button.
 *
 * Renders a section with a header ("Kategori Inställningar"), the SortCategoriesOption component,
 * and a "Spara Ändringar" button when there are unsaved changes.
 *
 * @returns The component's React element tree: a section containing the header, an optional "Spara Ändringar" button shown when `unsavedChanges` has entries, and the `SortCategoriesOption` node.
 */
export default function CategoriesOptions() {
    const { unsavedChanges, setSaveChanges } = useUnsavedChanges();
    return (
        <section className="text-secondary">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
                <h1 className="text-2xl font-bold w-full text-center">
                Kategori Inställningar
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
                <SortCategoriesOption />
            </div>
        </section>
    );
}