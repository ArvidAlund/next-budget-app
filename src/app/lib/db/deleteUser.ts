import supabase, { supabaseUserID } from "../supabaseClient";


export default async function deleteUser(){
    const userId = await supabaseUserID();

    await supabase.from('transactions')
    .delete()
    .eq('user_id', userId)

    const { data, error } = await supabase.auth.admin.deleteUser(userId)

    if (error) {
    console.error('Error deleting user:', error)
    } else {
    console.log('User deleted:', data)
    }

    return {success:true}
}