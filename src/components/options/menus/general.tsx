import LanguageOption from "../optionFunctions/language";
import CurrencyOption from "../optionFunctions/currency";
import TimeFormatOption from "../optionFunctions/timeFormat";
import AutoBackupOption from "../optionFunctions/backup";
import ResetDataOption from "../optionFunctions/reset";
import ExportUserdataOption from "../optionFunctions/exportUserdata";


export default function GeneralOptions() {
    return (
        <section className="text-secondary">
            <h1 className="text-2xl font-bold mb-4 w-full text-center">Allmänna Inställningar</h1>
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