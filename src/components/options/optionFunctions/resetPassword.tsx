import supabase from "@/app/lib/supabaseClient";
import { useState } from "react";

/**
 * Renders a password-reset option that triggers sending a reset link to the current user's email and displays success or error messages.
 *
 * When activated, the component attempts to identify the currently authenticated user and request a password reset email redirected to /reset-password. It shows a localized success message if the email was sent or a warning message if no user/email is found or an error occurs.
 *
 * @returns A React element containing the reset-password UI and message feedback.
 */
export default function ResetPasswordOption() {
    const [warningMessage, setWarningMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleResetPassword = async () => {
        try {
            setWarningMessage(null);
            setSuccessMessage(null);
            supabase.auth.getUser().then(({ data: { user } }) => {
                if (user && user.email) {
                    supabase.auth.resetPasswordForEmail(user.email, {
                        redirectTo: `${window.location.origin}/reset-password`,
                    }).then(({ error }) => {
                        if (error) {
                            setWarningMessage(`Fel vid återställning av lösenord: ${error.message}`);
                        } else {
                            setSuccessMessage("Återställningslänk för lösenord har skickats till din e-post.");
                        }
                    });
                } else {
                    setWarningMessage("Ingen inloggad användare hittades.");
                }
            });
        } catch (error) {
            setWarningMessage(`Ett oväntat fel inträffade: ${error}`);
        }
    };

    return (
        <div className="p-4 grid gap-2 grid-cols-2 items-center">
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Återställ lösenord</h2>
                <p>Återställ ditt lösenord genom att följa instruktionerna som skickas till din e-post.</p>
            </div>
            <button className="p-2 border rounded w-full bg-red-600 text-white hover:bg-red-700 transition-all duration-300" onClick={handleResetPassword}>Återställ Lösenord</button>
            {warningMessage && <p className="text-red-500 mt-2 col-span-2">{warningMessage}</p>}
            {successMessage && <p className="text-green-500 mt-2 col-span-2">{successMessage}</p>}
        </div>
    );
}