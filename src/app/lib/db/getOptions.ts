import supabase, {supabaseUserID} from "../supabaseClient"

const getOptions = async () => {
    const optionsInLocalStorage = localStorage.getItem("user_options");
    if (optionsInLocalStorage) {
        return {data: JSON.parse(optionsInLocalStorage), success: true};
    }
    const userId = await supabaseUserID();
    if (!userId) throw new Error("User not authenticated");
    const { data, error } = await supabase
        .from("user_options")
        .select("*")
        .eq("user_id", userId)
        .single();
    if (error) throw error;

    // Remove user_id from the returned data
    const filterdData = { ...data };
    delete filterdData.user_id;

    localStorage.setItem("user_options", JSON.stringify(filterdData));

    return {data: filterdData, success: true};
}

export default getOptions;