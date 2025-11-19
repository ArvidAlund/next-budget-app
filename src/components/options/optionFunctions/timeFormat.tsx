export default function TimeFormatOption() {
    return (
        <div className="p-4 grid gap-2 grid-cols-2 items-center">
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Tidsformat</h2>
                <p>Välj det tidsformat du vill använda i appen.</p>
            </div>
            <select className="mt-2 p-2 border rounded w-full bg-primary text-secondary">
                <option value="24h">24-timmarsformat</option>
                <option value="12h">12-timmarsformat (AM/PM)</option>
            </select>
        </div>
    );
}