import ConnectCalendarOption from "../optionFunctions/connectCalendar";


export default function CalanderOptions() {
    return (
        <section className="text-secondary">
            <h1 className="text-2xl font-bold mb-4 w-full text-center">Kalender Inställningar</h1>
            <div className="space-y-4 [&>*]:border-b [&>*]:pb-4">
                <ConnectCalendarOption />
            </div>
        </section>
    );
}