import LanguageOption from "../optionFunctions/language";
import CurrencyOption from "../optionFunctions/currency";
import TimeFormatOption from "../optionFunctions/timeFormat";
import AutoBackupOption from "../optionFunctions/backup";
import ResetDataOption from "../optionFunctions/reset";
import ExportUserdataOption from "../optionFunctions/exportUserdata";

import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";

export default function GeneralOptions() {
  const { unsavedChanges, setSaveChanges } = useUnsavedChanges();

  return (
    <section className="text-secondary">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
        <h1 className="text-2xl font-bold w-full text-center">
          Allmänna Inställningar
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
