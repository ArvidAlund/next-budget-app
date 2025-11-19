import exportUserData from "@/app/lib/export/userdata";
import { useState, useEffect } from "react";

/**
 * Renders a UI option for exporting user data and initiates an export in the selected format while preventing concurrent exports.
 *
 * The component displays explanatory text and two buttons ("CSV" and "JSON"). Clicking a button starts an export for that format and disables re-entrant exports until the current export completes.
 *
 * @returns A React element containing controls to export user data; clicking a format button initiates an export for that format (`'csv'` or `'json'`).
 */
export default function ExportUserdataOption() {
    const [exporting, setExporting] = useState(false);
        const [format, setFormat] = useState<'csv' | 'json' | null>(null);
    
        useEffect(() => {
            if (exporting) return;
            
            setExporting(true);
    
            const performExport = async () => {
                if (format) {
                    await exportUserData({format});
                }
                setExporting(false);
            };
    
            performExport();
            
        }, [exporting, format]);
    
        const handleExport = (format: 'csv' | 'json') => {
            console.log(`Exporting as ${format}`);
            setFormat(format);
        }
    return (
        <div className="p-4 grid gap-2 grid-cols-2 items-center">  
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Exportera Användardata</h2>
                <p>Exportera din användardata i olika format för säkerhetskopiering eller överföring.</p>
            </div>
            <div className="flex flex-col gap-2 [&>button]:cursor-pointer">
                <button className="p-2 border rounded w-full bg-primary text-secondary hover:bg-primary-300 transition-all duration-300" onClick={() => handleExport("csv")}>Exportera som CSV</button>
                <button className="p-2 border rounded w-full bg-primary text-secondary hover:bg-primary-300 transition-all duration-300" onClick={() => handleExport("json")}>Exportera som JSON</button>
            </div>
        </div>
    );
}