import { useState, useEffect } from "react";
import getUserOption from "@/app/lib/db/getUserOption";
import { emitEvent } from "@/app/lib/eventbus";
import SwitchButton from "@/components/ui/switchButton";

/**
 * Renders the transaction format settings UI and manages loading, local state, and unsaved-change events.
 *
 * On mount, loads the user's saved "transaction_decimals" and "thousand_separator" options and initializes component state.
 * Emits "unsaved-changes" when the current values differ from the saved values, and "remove-unsaved-changes" when they match.
 *
 * @returns A React element containing controls for toggling decimal display and selecting the thousands separator.
 */
export default function TransactionFormatOption() {
    const [loaded, setLoaded] = useState(false);
    const [transactionDecimals, setTransactionDecimals] = useState<boolean | null>(null);
    const [userTransactionDecimals, setUserTransactionDecimals] = useState<boolean | null>(null);
    const [thousandSeparator, setThousandSeparator] = useState<string | null>(null);
    const [userThousandSeparator, setUserThousandSeparator] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransactionFormat = async () => {
            try {
                const res = await getUserOption("transaction_decimals");
                if (typeof res === "boolean") {
                    setTransactionDecimals(res);
                    setUserTransactionDecimals(res);
                }
                const seperator = await getUserOption("thousand_separator");
                if (typeof seperator === "string") {
                    setThousandSeparator(seperator);
                    setUserThousandSeparator(seperator);
                }
                setLoaded(true);
            } catch (error) {
                console.error("Error fetching transaction format option:", error);
            }
        };

        fetchTransactionFormat();
    }, []);

    useEffect(() => {
        if (!loaded) return;
        let hasChanges = false;
        if (userTransactionDecimals !== null && transactionDecimals !== userTransactionDecimals) {
            hasChanges = true;
        }
        if (userThousandSeparator !== null && thousandSeparator !== userThousandSeparator) {
            hasChanges = true;
        }
        if (!hasChanges) {
            emitEvent("remove-unsaved-changes", {
                "transaction_decimals": transactionDecimals,
                "thousand_separator": thousandSeparator,
            });
            return;
        }
        emitEvent("unsaved-changes", {
            "transaction_decimals": transactionDecimals,
            "thousand_separator": thousandSeparator,
        });
    }, [transactionDecimals, userTransactionDecimals, thousandSeparator, userThousandSeparator, loaded]);

    return (
        <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 items-center min-h-50">
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Transaktionsformat</h2>
                <p>Välj hur du vill att transaktionsbelopp ska visas.</p>
            </div>
            {loaded ? (
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <span>Visa decimaler</span>
                        <SwitchButton
                            start={transactionDecimals || false}
                            onChange={() => setTransactionDecimals(!transactionDecimals)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Tusenavgränsare</span>
                        <select
                            value={thousandSeparator || "none"}
                            onChange={(e) => setThousandSeparator(e.target.value)}
                            className="border rounded p-1 bg-black"
                        >
                            <option value="none">Ingen (10000)</option>
                            <option value="comma">Komma (10,000)</option>
                            <option value="dot">Punkt (10.000)</option>
                            <option value="space">Mellanslag (10 000)</option> 
                        </select>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center">
                    <p>Laddar...</p>
                </div>
            )}
        </div>
    );
}