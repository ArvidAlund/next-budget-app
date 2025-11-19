import ConnectCalendarOption from "../optionFunctions/connectCalendar";
import PaydayOption from "../optionFunctions/payday";
import MarkRecurringOption from "../optionFunctions/markRecurring";

import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";


/**
 * Renders the calendar settings UI with controls for connecting a calendar, configuring paydays, and marking recurring events.
 *
 * The component shows a header labeled "Kalender Inställningar", the three option components (ConnectCalendarOption, PaydayOption, MarkRecurringOption), and a conditional "Spara Ändringar" button when there are unsaved changes.
 *
 * @returns The JSX element for the calendar settings section; the "Spara Ändringar" button appears when unsaved changes exist and triggers saving when clicked.
 */
export default function CalanderOptions() {
    const { unsavedChanges, setSaveChanges } = useUnsavedChanges();
    return (
        <section className="text-secondary">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
                <h1 className="text-2xl font-bold w-full text-center">
                Kalender Inställningar
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
                <ConnectCalendarOption />
                <PaydayOption />
                <MarkRecurringOption />
            </div>
        </section>
    );
}