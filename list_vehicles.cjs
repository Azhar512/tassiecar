const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://kcljadifenbqjbmurygx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjbGphZGlmZW5icWpibXVyeWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MDU3NTUsImV4cCI6MjA4MzM4MTc1NX0.nIT5gNcQV03OgvSFhDW1s6seFXBVIoA5sxYCuLNVve4';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function listVehicles() {
    const { data, error } = await supabase.from('vehicles').select('*');
    if (error) {
        console.error('Error fetching vehicles:', error);
        return;
    }
    fs.writeFileSync('vehicles.json', JSON.stringify(data, null, 2), 'utf8');
    console.log('Vehicles written to vehicles.json');
}

listVehicles();
