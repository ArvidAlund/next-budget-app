import supabase, {supabaseUserID} from "../supabaseClient"

const getOptions = async () => {
    const userId = await supabaseUserID();
    if (!userId) throw new Error("User not authenticated");
    const cacheKey = `user_options_${userId}`;
    const optionsInLocalStorage = sessionStorage.getItem(cacheKey);

    if (optionsInLocalStorage) {
        return {data: JSON.parse(optionsInLocalStorage), success: true};
    }
    
    const { data, error } = await supabase
        .from("user_options")
        .select("*")
        .eq("user_id", userId)
        .single();
    if (error) throw error;

    // Remove user_id from the returned data
    const filterdData = { ...data };
    delete filterdData.user_id;

    sessionStorage.setItem(cacheKey, JSON.stringify(filterdData));

    return {data: filterdData, success: true};
}

export default getOptions;