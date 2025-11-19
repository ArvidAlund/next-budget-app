import LanguageOption from "../optionFunctions/language";
import CurrencyOption from "../optionFunctions/currency";
import TimeFormatOption from "../optionFunctions/timeFormat";
import AutoBackupOption from "../optionFunctions/backup";
import ResetDataOption from "../optionFunctions/reset";
import ExportUserdataOption from "../optionFunctions/exportUserdata";

import { useState, useEffect } from "react";
import { emitEvent, onEvent } from "@/app/lib/eventbus";
import saveChangesToDb from "@/app/lib/db/saveChanges";

interface UnsavedDetails {
  [key: string]: string | number | boolean;
}

interface UnsavedChanges {
    language?: string;
    default_currency?: string;
    time_format?: string;
    auto_backup?: boolean;
    [key: string]: string | number | boolean | undefined;
}

export default function GeneralOptions() {
    const [unsavedChanges, setUnsavedChanges] = useState<UnsavedChanges>({});
    const [saveChanges, setSaveChanges] = useState(false);

    useEffect(() => {
        console.log("Unsaved changes:", unsavedChanges);
        if(!saveChanges) return;

        const performSave = async () => {
            try {
                await saveChangesToDb(unsavedChanges as Record<string, string | number | boolean>);
                setUnsavedChanges({});
                emitEvent("general-changes-saved");
            } catch (error) {
                console.error("Error saving changes:", error);
            } finally {
                setSaveChanges(false);
            }
        };

        performSave();
    }, [unsavedChanges, saveChanges]);

    useEffect(() => {
        const handleUnsavedChanges = onEvent<UnsavedDetails>(
        "unsaved-general-changes",
        (details) => {
            setUnsavedChanges((prev) => {
                return { ...prev, ...details };
            });
        }
        );

        const handleRemoveUnsavedChanges = onEvent<UnsavedDetails>(
        "remove-unsaved-general-changes",
        (details) => {
            setUnsavedChanges((prev) => {
            const updated = { ...prev };
            for (const key in details) {
                delete updated[key as keyof UnsavedChanges];
            }
            return updated;
            });
        }
        );


        return () => {
            handleUnsavedChanges();
            handleRemoveUnsavedChanges();
        };
    },[]);
    return (
        <section className="text-secondary">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
                <h1 className="text-2xl font-bold w-full text-center">Allmänna Inställningar</h1>
                {unsavedChanges && Object.keys(unsavedChanges).length > 0 && (
                    <button className="border text-secondary px-4 py-2 rounded-md hover:bg-accent-300 transition-all duration-300 text-sm w-fit" onClick={() => setSaveChanges(true)}>Spara Ändringar</button>
                )} 
            </div>
            <div className="space-y-4 [&>*]:border-b [&>*]:pb-4">
                <LanguageOption />
                <CurrencyOption />
                <TimeFormatOption />
                <AutoBackupOption />
                <ExportUserdataOption />
                <ResetDataOption />
            </div>
        </section>
    );
}