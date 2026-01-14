import supabase, { supabaseUserID } from "../../supabaseClient";

const getNotificationCount = async () => {
    const userId = await supabaseUserID();
    if (!userId) {
        return 0;
    }
    const { count, error } = await supabase.from('user_notifications').select('id', { count: 'exact', head: true }).eq('user_id', userId).eq('read', false);

    if (error) {
        console.error("Error fetching notification count:", error);
        return 0;
    }
    return count ?? 0;
}
export default getNotificationCount;