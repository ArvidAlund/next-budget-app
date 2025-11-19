export default function ResetDataOption() {
    return (
        <div className="p-4 grid gap-2 grid-cols-2 items-center">
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Återställ Data</h2>
                <p>Återställ alla dina data till fabriksinställningarna. Detta kan inte ångras.</p>
            </div>
            <button className="p-2 border rounded w-full bg-red-600 text-white hover:bg-red-700 transition-all duration-300">Återställ Data</button>
        </div>
    );
}