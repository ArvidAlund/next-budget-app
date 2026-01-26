import supabase from "../../supabaseClient";
import { supabaseUserID } from "../../supabaseClient";
import { NotificationType } from "../../types";

type props = {
    title: string;
    message: string;
    type: NotificationType;
}

const CreateNotification = async (props: props) => {
    const userId = await supabaseUserID();
    if (!userId) throw new Error("Användare inte autentiserad");

    const { data:existingNotification, error: existingError } = await supabase
        .from("user_notifications")
        .select("*")
        .eq("user_id", userId)
        .eq("title", props.title)
        .eq("message", props.message)
        .eq("type", props.type)
        .eq("read", false)
        .limit(1)
        .single();
        
    if (existingError && existingError.code !== "PGRST116") {
        throw existingError;
    }

    if (existingNotification) {
        return existingNotification;
    }

    const { data, error } = await supabase
        .from("user_notifications")
        .insert([{
            user_id: userId,
            title: props.title,
            message: props.message,
            date: new Date().toISOString(),
            read: false,
            type: props.type
        }])
        .select()
        .single();
    if (error) {
        throw error;
    }
    return data;
}
export default CreateNotification;