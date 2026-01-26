import supabase, {supabaseUserID} from "../supabaseClient";


const getAvanzaInvestment = async (amount: number) => {
            const user = await supabaseUserID();

            const { data, error } = await supabase
                .from('transactions')
                .select('*')
                .eq('type', 'expense')
                .eq('description', 'Avanza')
                .eq("user_id", user)
                .eq('amount', amount)
                .eq('category', 'savings');
            
            if (error) {
                throw error;
            }
            return data;
};

export default getAvanzaInvestment;