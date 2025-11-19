export default function AutoBackupOption() {
    return (
        <div className="p-4 grid gap-2 grid-cols-2 items-center">
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Automatisk Säkerhetskopiering</h2>
                <p>Aktivera eller inaktivera automatisk säkerhetskopiering av dina data.</p>
            </div>
            <select className="mt-2 p-2 border rounded w-full bg-primary text-secondary">
                <option value="enabled">Aktiverad</option>
                <option value="disabled">Inaktiverad</option>
            </select>
        </div>
    );
}