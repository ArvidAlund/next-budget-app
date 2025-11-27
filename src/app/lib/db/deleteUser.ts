import supabase, { supabaseUserID } from "../supabaseClient";


 export default async function deleteUser(){
    const userId = await supabaseUserID();
    if (!userId) {
        return { success: false, error: "User ID not found" };
    }

    const { error: deleteTransactionsError } = await supabase.from('transactions')
    .delete()
    .eq('user_id', userId)

    if (deleteTransactionsError) {
        console.error('Error deleting transactions:', deleteTransactionsError);
        return { success: false, error: deleteTransactionsError.message };
    }
 
     const { data, error } = await supabase.auth.admin.deleteUser(userId)
 
     if (error) {
        console.error('Error deleting user:', error);
        return { success: false, error: error.message };
     } else {
        console.log('User deleted:', data);
        return { success: true };
     }
 }