import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function listVehicles() {
    const { data, error } = await supabase.from('vehicles').select('*');
    if (error) {
        console.error('Error fetching vehicles:', error);
        return;
    }
    console.log(JSON.stringify(data, null, 2));
}

listVehicles();
