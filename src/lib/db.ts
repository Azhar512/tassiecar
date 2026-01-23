import { createClient } from '@supabase/supabase-js';

// Types
export interface Vehicle {
    id: string;
    name: string;
    type: 'Economy' | 'SUV' | 'Luxury' | 'Electric';
    image: string;
    price: number;
    passengers: number;
    luggage: number;
    fuel: string;
    transmission: 'Automatic' | 'Manual';
    description: string;
}

export interface Booking {
    id: string;
    vehicleId: string;
    pickupLocation: string;
    dropoffLocation: string;
    pickupDate: string;
    pickupTime: string;
    returnDate: string;
    returnTime: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    totalPrice: number;
    extras: string[];
    status: 'confirmed' | 'cancelled';
    createdAt: string;
}

export interface Message {
    id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    reply?: string;
    createdAt: string;
}


// Database types (snake_case as stored in Supabase)
interface DbVehicle {
    id: string;
    name: string;
    type: 'Economy' | 'SUV' | 'Luxury' | 'Electric';
    image: string;
    price: number;
    passengers: number;
    luggage: number;
    fuel: string;
    transmission: 'Automatic' | 'Manual';
    description: string;
    created_at?: string;
}

interface DbBooking {
    id: string;
    vehicle_id: string;
    pickup_location: string;
    dropoff_location: string;
    pickup_date: string;
    pickup_time: string;
    return_date: string;
    return_time: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    total_price: number;
    extras: string[];
    status: 'confirmed' | 'cancelled';
    created_at?: string;
}

interface DbMessage {
    id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    reply?: string;
    created_at?: string;
}


// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('⚠️ Missing Supabase environment variables!');
    console.error('Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file');
    console.error('Current values:', {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseAnonKey
    });
}

const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createClient('https://placeholder.supabase.co', 'placeholder-key');

export { supabase };

// Helper functions to convert between camelCase and snake_case
function toVehicle(dbVehicle: DbVehicle): Vehicle {
    let image = dbVehicle.image;
    // Fix for production: redirect local asset paths to public folder
    if (image.includes('src/assets/')) {
        image = image.replace(/.*src\/assets\//, '/vehicles/');
    }

    return {
        id: dbVehicle.id,
        name: dbVehicle.name,
        type: dbVehicle.type,
        image: image,
        price: dbVehicle.price,
        passengers: dbVehicle.passengers,
        luggage: dbVehicle.luggage,
        fuel: dbVehicle.fuel,
        transmission: dbVehicle.transmission,
        description: dbVehicle.description,
    };
}

function toBooking(dbBooking: DbBooking): Booking {
    return {
        id: dbBooking.id,
        vehicleId: dbBooking.vehicle_id,
        pickupLocation: dbBooking.pickup_location,
        dropoffLocation: dbBooking.dropoff_location,
        pickupDate: dbBooking.pickup_date,
        pickupTime: dbBooking.pickup_time,
        returnDate: dbBooking.return_date,
        returnTime: dbBooking.return_time,
        firstName: dbBooking.first_name,
        lastName: dbBooking.last_name,
        email: dbBooking.email,
        phone: dbBooking.phone,
        totalPrice: dbBooking.total_price,
        extras: dbBooking.extras,
        status: dbBooking.status,
        createdAt: dbBooking.created_at || new Date().toISOString(),
    };
}

function toMessage(dbMessage: DbMessage): Message {
    return {
        id: dbMessage.id,
        name: dbMessage.name,
        email: dbMessage.email,
        phone: dbMessage.phone,
        subject: dbMessage.subject,
        message: dbMessage.message,
        reply: dbMessage.reply,
        createdAt: dbMessage.created_at || new Date().toISOString(),
    };
}


class SupabaseDB {
    // Vehicles
    async getVehicles(): Promise<Vehicle[]> {
        const { data, error } = await supabase
            .from('vehicles')
            .select('*')
            .order('type', { ascending: true });

        if (error) {
            console.error('Error fetching vehicles:', error);
            throw new Error(`Failed to fetch vehicles: ${error.message}`);
        }

        return (data || []).map(toVehicle);
    }

    async createVehicle(vehicle: Omit<Vehicle, 'id'>): Promise<Vehicle> {
        const { data, error } = await supabase
            .from('vehicles')
            .insert(vehicle)
            .select()
            .single();

        if (error) {
            console.error('Error creating vehicle:', error);
            throw new Error(`Failed to create vehicle: ${error.message}`);
        }

        return toVehicle(data);
    }

    async updateVehicle(id: string, updates: Partial<Vehicle>): Promise<Vehicle> {
        const { data, error } = await supabase
            .from('vehicles')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating vehicle:', error);
            throw new Error(`Failed to update vehicle: ${error.message}`);
        }

        return toVehicle(data);
    }

    async deleteVehicle(id: string): Promise<void> {
        const { error } = await supabase
            .from('vehicles')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting vehicle:', error);
            throw new Error(`Failed to delete vehicle: ${error.message}`);
        }
    }


    async getVehicle(id: string): Promise<Vehicle | undefined> {
        const { data, error } = await supabase
            .from('vehicles')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                // Not found
                return undefined;
            }
            console.error('Error fetching vehicle:', error);
            throw new Error(`Failed to fetch vehicle: ${error.message}`);
        }

        return data ? toVehicle(data) : undefined;
    }

    // Bookings
    async createBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking> {
        const dbBooking: Omit<DbBooking, 'id' | 'created_at'> = {
            vehicle_id: booking.vehicleId,
            pickup_location: booking.pickupLocation,
            dropoff_location: booking.dropoffLocation,
            pickup_date: booking.pickupDate,
            pickup_time: booking.pickupTime,
            return_date: booking.returnDate,
            return_time: booking.returnTime,
            first_name: booking.firstName,
            last_name: booking.lastName,
            email: booking.email,
            phone: booking.phone,
            total_price: booking.totalPrice,
            extras: booking.extras,
            status: 'confirmed',
        };

        const { data, error } = await supabase
            .from('bookings')
            .insert(dbBooking)
            .select()
            .single();

        if (error) {
            console.error('Error creating booking:', error);
            throw new Error(`Failed to create booking: ${error.message}`);
        }

        return toBooking(data);
    }

    async getBookings(): Promise<Booking[]> {
        const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching bookings:', error);
            throw new Error(`Failed to fetch bookings: ${error.message}`);
        }

        return (data || []).map(toBooking);
    }

    async getBooking(id: string): Promise<Booking | undefined> {
        const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                // Not found
                return undefined;
            }
            console.error('Error fetching booking:', error);
            throw new Error(`Failed to fetch booking: ${error.message}`);
        }

        return data ? toBooking(data) : undefined;
    }

    async updateBookingStatus(id: string, status: 'confirmed' | 'cancelled'): Promise<Booking> {
        const { data, error } = await supabase
            .from('bookings')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating booking status:', error);
            throw new Error(`Failed to update booking status: ${error.message}`);
        }

        return toBooking(data);
    }

    async updateBooking(id: string, updates: Partial<Omit<Booking, 'id' | 'createdAt'>>): Promise<Booking> {
        // Convert camelCase to snake_case for database
        const dbUpdates: Record<string, any> = {};

        if (updates.vehicleId !== undefined) dbUpdates.vehicle_id = updates.vehicleId;
        if (updates.pickupLocation !== undefined) dbUpdates.pickup_location = updates.pickupLocation;
        if (updates.dropoffLocation !== undefined) dbUpdates.dropoff_location = updates.dropoffLocation;
        if (updates.pickupDate !== undefined) dbUpdates.pickup_date = updates.pickupDate;
        if (updates.pickupTime !== undefined) dbUpdates.pickup_time = updates.pickupTime;
        if (updates.returnDate !== undefined) dbUpdates.return_date = updates.returnDate;
        if (updates.returnTime !== undefined) dbUpdates.return_time = updates.returnTime;
        if (updates.firstName !== undefined) dbUpdates.first_name = updates.firstName;
        if (updates.lastName !== undefined) dbUpdates.last_name = updates.lastName;
        if (updates.email !== undefined) dbUpdates.email = updates.email;
        if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
        if (updates.totalPrice !== undefined) dbUpdates.total_price = updates.totalPrice;
        if (updates.extras !== undefined) dbUpdates.extras = updates.extras;
        if (updates.status !== undefined) dbUpdates.status = updates.status;

        const { data, error } = await supabase
            .from('bookings')
            .update(dbUpdates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating booking:', error);
            throw new Error(`Failed to update booking: ${error.message}`);
        }

        return toBooking(data);
    }

    // Messages
    async createMessage(message: Omit<Message, 'id' | 'createdAt'>): Promise<Message> {
        const dbMessage: Omit<DbMessage, 'id' | 'created_at'> = {
            name: message.name,
            email: message.email,
            phone: message.phone,
            subject: message.subject,
            message: message.message,
        };

        const { data, error } = await supabase
            .from('messages')
            .insert(dbMessage)
            .select()
            .single();

        if (error) {
            console.error('Error creating message:', error);
            throw new Error(`Failed to create message: ${error.message}`);
        }

        return toMessage(data);
    }

    async getMessages(): Promise<Message[]> {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching messages:', error);
            throw new Error(`Failed to fetch messages: ${error.message}`);
        }

        return (data || []).map(toMessage);
    }

    async updateMessage(id: string, updates: Partial<Message>): Promise<Message> {
        const dbUpdates: Record<string, any> = {};

        if (updates.name !== undefined) dbUpdates.name = updates.name;
        if (updates.email !== undefined) dbUpdates.email = updates.email;
        if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
        if (updates.subject !== undefined) dbUpdates.subject = updates.subject;
        if (updates.message !== undefined) dbUpdates.message = updates.message;
        if (updates.reply !== undefined) dbUpdates.reply = updates.reply;

        const { data, error } = await supabase
            .from('messages')
            .update(dbUpdates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating message:', error);
            throw new Error(`Failed to update message: ${error.message}`);
        }

        return toMessage(data);
    }

}


export const db = new SupabaseDB();
