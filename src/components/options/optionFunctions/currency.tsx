export default function CurrencyOption() {
    return (
        <div className="p-4 grid gap-2 grid-cols-2 items-center">
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Valuta</h2>
                <p>Välj den valuta du vill använda i appen.</p>
            </div>
            <select className="mt-2 p-2 border rounded w-full bg-primary text-secondary">
                <option value="SEK">Svenska Kronor (SEK)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
            
            </select>
        </div>
    );
}
