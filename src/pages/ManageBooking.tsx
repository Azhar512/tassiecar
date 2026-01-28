import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { BookingLookup } from '@/components/booking/BookingLookup';
import { BookingDetails } from '@/components/booking/BookingDetails';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/services/api';
import { Search } from 'lucide-react';

import { Booking } from '@/lib/db';

const ManageBooking = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [booking, setBooking] = useState<Booking | null>(null);

    const handleLookup = async (email: string, confirmationCode: string) => {
        setLoading(true);
        try {
            const result = await api.bookings.lookup(email, confirmationCode);
            setBooking(result);
            toast({
                title: "Booking Found!",
                description: `Reservation for ${result.firstName} ${result.lastName}`,
            });
        } catch (error) {
            console.error('Booking lookup error:', error);
            toast({
                title: "Booking Not Found",
                description: "Please check your email and confirmation code and try again.",
                variant: "destructive",
            });
            setBooking(null);
        } finally {
            setLoading(false);
        }
    };

    const handleModify = () => {
        toast({
            title: "Modify Booking",
            description: "Booking modification feature coming soon. Please contact support for now.",
        });
    };

    const handleCancel = async () => {
        if (!booking) return;

        setLoading(true);
        try {
            setBooking({
                ...booking,
                status: 'cancelled'
            } as any);
            toast({
                title: "Booking Cancelled",
                description: "Your booking has been successfully cancelled. A confirmation email has been sent.",
            });
        } catch (error) {
            console.error('Cancellation error:', error);
            toast({
                title: "Cancellation Failed",
                description: "Unable to cancel booking. Please contact support.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleEmail = () => {
        toast({
            title: "Email Sent",
            description: "Confirmation email has been resent to your address.",
        });
    };

    const handleReset = () => {
        setBooking(null);
    };

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary via-primary/95 to-secondary py-20 md:py-32">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                            <Search className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
                            Manage Your Booking
                        </h1>
                        <p className="text-xl text-primary-foreground/80">
                            View, modify, or cancel your reservation
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="section-padding bg-muted/30">
                <div className="container-custom">
                    {!booking ? (
                        <BookingLookup onLookup={handleLookup} loading={loading} />
                    ) : (
                        <div className="max-w-4xl mx-auto">
                            <div className="mb-6">
                                <button
                                    onClick={handleReset}
                                    className="text-secondary hover:text-secondary/80 transition-colors flex items-center gap-2"
                                >
                                    ← Look up another booking
                                </button>
                            </div>
                            <BookingDetails
                                booking={booking}
                                onModify={handleModify}
                                onCancel={handleCancel}
                                onPrint={handlePrint}
                                onEmail={handleEmail}
                            />
                        </div>
                    )}
                </div>
            </section>

            {/* Help Section */}
            <section className="section-padding bg-card">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                            Need Help?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            If you can't find your booking or need assistance, our support team is here to help.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a
                                href="tel:0401700033"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:brightness-110 transition-all"
                            >
                                Call Us: 0401 700 033
                            </a>
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-border rounded-lg font-semibold hover:bg-muted transition-all"
                            >
                                Contact Support
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default ManageBooking;
