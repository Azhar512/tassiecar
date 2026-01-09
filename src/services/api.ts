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
    },
    bookings: {
        create: async (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking> => {
            await delay(LATENCY + 500); // slightly longer for bookings
            // Simple validation or availability check could go here
            return db.createBooking(booking);
        },
    },
    contact: {
        send: async (message: Omit<Message, 'id' | 'createdAt'>): Promise<Message> => {
            await delay(LATENCY);
            return db.createMessage(message);
        },
    },
};
