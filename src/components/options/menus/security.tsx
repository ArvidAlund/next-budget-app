import PinOption from "../optionFunctions/pin";

/**
 * Renders the security settings section with a centered Swedish heading and an empty container for option items.
 *
 * @returns The JSX element representing the security settings section.
 */
export default function SecurityOptions() {
    return (
        <section className="text-secondary">
            <h1 className="text-2xl font-bold mb-4 w-full text-center">Säkerhets Inställningar</h1>
            <div className="space-y-4 [&>*]:border-b [&>*]:pb-4">
                <PinOption/>
            </div>
        </section>
    );
}