export default function ExportDataOption() {
    return (
        <div className="p-4 grid gap-2 grid-cols-2 items-center">  
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Exportera Data</h2>
                <p>Exportera dina data i olika format för säkerhetskopiering eller överföring.</p>
            </div>
            <div className="flex flex-col gap-2 [&>button]:cursor-pointer">
                <button className="p-2 border rounded w-full bg-primary text-secondary hover:bg-primary-300 transition-all duration-300">Exportera som CSV</button>
                <button className="p-2 border rounded w-full bg-primary text-secondary hover:bg-primary-300 transition-all duration-300">Exportera som JSON</button>
            </div>
        </div>
    );
}