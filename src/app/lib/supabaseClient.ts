import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { error } from 'console';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClientComponentClient({ supabaseUrl, supabaseKey });

export default supabase;

export async function supabaseUserID(): Promise<string> {
    const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()

    if (authError || !user ) return "";
    return user.id ?? "";
}
