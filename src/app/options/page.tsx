
const optionsList = [
  { id: 'general', name: 'Allmänt' },
  { id: 'appearance', name: 'Utseende' },
  { id: 'calendar', name: 'Kalender' },
  { id: 'notifications', name: 'Notifikationer' },
  { id: 'privacy', name: 'Integritet' },
  { id: 'security', name: 'Säkerhet' },
  { id: 'account', name: 'Konto & Synk' },
  { id: 'budget', name: 'Budget & Transaktioner' },
  { id: 'categories', name: 'Kategorier' },
];


export default function OptionsPage() {
  return (
    <>
        <main className="grid sm:grid-cols-2">
            <div>
                {optionsList.map(option => (
                    <div key={option.id} className="p-4 border-b bg-primary-400 text-secondary">
                        <h2 className="text-lg font-semibold">{option.name}</h2>
                        <p className="text-sm text-gray-600">Inställningar för {option.name.toLowerCase()}.</p>
                    </div>
                ))}
            </div>
        </main>
    </>
  );
}