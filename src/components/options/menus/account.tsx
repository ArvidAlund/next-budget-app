import DeleteDataOption from "../optionFunctions/delete";
import LogOutOption from "../optionFunctions/logout";

/**
 * Renders an account settings section with a centered "Konto Inställningar" heading and a styled container for option rows.
 *
 * @returns The JSX element representing the account settings section.
 */
export default function SecurityOptions() {
    return (
        <section className="text-secondary">
            <h1 className="text-2xl font-bold mb-4 w-full text-center">Konto Inställningar</h1>
            <div className="space-y-4 *:border-b *:pb-4">
                <LogOutOption/>
                <DeleteDataOption/>
            </div>
        </section>
    );
}