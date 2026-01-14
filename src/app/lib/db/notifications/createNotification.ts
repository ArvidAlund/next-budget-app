import supabase, { supabaseUserID } from "@/app/lib/supabaseClient";


const createNotification = async (message: string) => {
    const userId = await supabaseUserID();
    if (!userId) {
        console.error("No user ID found. Cannot create notification.");
        return;
    }
    const { data, error } = await supabase.from('user_notifications').insert([
        { user_id: userId, message, read: false, date: new Date() }
    ]).select();
    if (error) {
        console.error("Error creating notification:", error);
    }
    return data;
}
export default createNotification;