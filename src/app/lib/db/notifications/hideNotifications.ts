import supabase, {supabaseUserID} from "../../supabaseClient";


/**
 * Hides notifications older than 30 days by marking them as hidden.
 * @returns A promise that resolves when the notifications are hidden.
 */
const hideNotifications = async () => {
    const userId = await supabaseUserID();
    if (!userId) throw new Error("Användare inte autentiserad");

    const {data:notifications, error: fetchError} = await supabase
        .from("user_notifications")
        .select("*")
        .eq("user_id", userId)
        .lt("date", new Date(new Date().setDate(new Date().getDate() - 30)).toISOString())
        .eq("hidden", false);
    
    if (fetchError) {
        throw fetchError;
    }
    for (const notification of notifications) {
        await hideNotification(notification.id, userId);
    }
    return;
}

const hideNotification = async (notificationId: number, userId: string) => {
    const { data, error } = await supabase
        .from("user_notifications")
        .update({ hidden: true })
        .eq("id", notificationId)
        .eq("user_id", userId);
    if (error) {
        throw error;
    }
    return data;
}
export default hideNotifications;