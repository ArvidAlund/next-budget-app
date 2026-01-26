import supabase, {supabaseUserID} from "../../supabaseClient";


const markAsRead = async (notificationId: number) => {
    const userId = await supabaseUserID();
    if (!userId) throw new Error("User not authenticated");
    const { data, error } = await supabase
        .from("user_notifications")
        .update({ read: true })
        .eq("id", notificationId)
        .eq("user_id", userId)
        .select()
        .single();
    if (error) {
        throw error;
    }
    return data;
}
export default markAsRead;