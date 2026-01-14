import supabase, {supabaseUserID} from "../../supabaseClient";

const getAllNotifications = async () => {
    const userId = await supabaseUserID();
    if (!userId) {
        return [];
    }
    const { data, error } = await supabase.from('user_notifications').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (error) {
        console.error("Error fetching notifications:", error);
        return [];
    }
    return data || [];
}
export default getAllNotifications;