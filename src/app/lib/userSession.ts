import supabase from "./supabaseClient";



const UserSession = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
        return false;
    }
    return true;
};

export default UserSession;