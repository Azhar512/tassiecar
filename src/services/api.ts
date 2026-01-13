import { db, Vehicle, Booking, Message } from '@/lib/db';

const LATENCY = 800; // ms

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const api = {
    vehicles: {
        list: async (): Promise<Vehicle[]> => {
            await delay(LATENCY);
            return db.getVehicles();
        },
        get: async (id: string): Promise<Vehicle | undefined> => {
            await delay(LATENCY);
            return db.getVehicle(id);
        },
        create: async (vehicle: Omit<Vehicle, 'id'>): Promise<Vehicle> => {
            await delay(LATENCY + 200);
            return db.createVehicle(vehicle);
        },
        update: async (id: string, updates: Partial<Vehicle>): Promise<Vehicle> => {
            await delay(LATENCY + 200);
            return db.updateVehicle(id, updates);
        },
        delete: async (id: string): Promise<void> => {
            await delay(LATENCY + 200);
            return db.deleteVehicle(id);
        },
    },

    bookings: {
        list: async (): Promise<Booking[]> => {
            await delay(LATENCY);
            return db.getBookings();
        },
        create: async (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking> => {

            await delay(LATENCY + 500); // slightly longer for bookings
            // Simple validation or availability check could go here
            return db.createBooking(booking);
        },
        lookup: async (email: string, confirmationCode: string): Promise<Booking> => {
            await delay(LATENCY);
            const bookings = await db.getBookings();
            const booking = bookings.find(
                b => b.email.toLowerCase() === email.toLowerCase() &&
                    b.id.toUpperCase().startsWith(confirmationCode.toUpperCase())
            );
            if (!booking) {
                throw new Error('Booking not found');
            }
            return booking;
        },
        cancel: async (bookingId: string): Promise<Booking> => {
            await delay(LATENCY + 300);
            // ✅ Now updates the database!
            return await db.updateBookingStatus(bookingId, 'cancelled');
        },
        update: async (bookingId: string, updates: Partial<Omit<Booking, 'id' | 'createdAt'>>): Promise<Booking> => {
            await delay(LATENCY + 500);
            // ✅ Updates booking details in database
            return await db.updateBooking(bookingId, updates);
        },
    },
    contact: {
        list: async (): Promise<Message[]> => {
            await delay(LATENCY);
            return db.getMessages();
        },
        reply: async (id: string, content: string): Promise<Message> => {
            await delay(LATENCY);
            return db.updateMessage(id, { reply: content });
        },
        send: async (message: Omit<Message, 'id' | 'createdAt'>): Promise<Message> => {

            await delay(LATENCY);
            return db.createMessage(message);
        },
    },
};
