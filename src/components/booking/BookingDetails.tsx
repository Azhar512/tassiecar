import React, { useState } from 'react';
import { Calendar, MapPin, Car, Package, DollarSign, Mail, Phone, User, AlertCircle, Check, X, Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface Booking {
    id: string;
    confirmationCode?: string;
    vehicleId: string;
    vehicleName?: string;
    vehicleImage?: string;
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
    extras?: string[];
    status: 'confirmed' | 'cancelled' | 'completed';
    createdAt: string;
}

interface BookingDetailsProps {
    booking: Booking;
    onModify?: () => void;
    onCancel?: () => void;
    onPrint?: () => void;
    onEmail?: () => void;
}

export const BookingDetails: React.FC<BookingDetailsProps> = ({
    booking,
    onModify,
    onCancel,
    onPrint,
    onEmail
}) => {
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);

    const pickupDate = new Date(booking.pickupDate);
    const returnDate = new Date(booking.returnDate);
    const isUpcoming = pickupDate > new Date();
    const isPast = returnDate < new Date();

    const statusConfig = {
        confirmed: { color: 'text-green-600 bg-green-50', label: 'Confirmed', icon: Check },
        cancelled: { color: 'text-red-600 bg-red-50', label: 'Cancelled', icon: X },
        completed: { color: 'text-blue-600 bg-blue-50', label: 'Completed', icon: Check }
    };

    const status = statusConfig[booking.status];
    const StatusIcon = status.icon;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-card rounded-2xl p-6 shadow-soft">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                            Booking Confirmation
                        </h2>
                        <p className="text-lg text-muted-foreground font-mono">
                            {booking.confirmationCode || booking.id.split('-')[0].toUpperCase()}
                        </p>
                    </div>
                    <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${status.color}`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="font-semibold">{status.label}</span>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-3">
                    {onEmail && (
                        <Button variant="outline" size="sm" onClick={onEmail}>
                            <Mail className="w-4 h-4 mr-2" />
                            Email Confirmation
                        </Button>
                    )}
                    {onPrint && (
                        <Button variant="outline" size="sm" onClick={onPrint}>
                            <Printer className="w-4 h-4 mr-2" />
                            Print
                        </Button>
                    )}
                </div>
            </div>

            {/* Rental Details */}
            <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Car className="w-5 h-5 text-secondary" />
                    Rental Details
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Pickup */}
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-secondary mt-1" />
                            <div>
                                <p className="text-sm text-muted-foreground">Pickup Location</p>
                                <p className="font-medium text-foreground">{booking.pickupLocation}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-secondary mt-1" />
                            <div>
                                <p className="text-sm text-muted-foreground">Pickup Date & Time</p>
                                <p className="font-medium text-foreground">
                                    {format(pickupDate, 'PPP')} at {booking.pickupTime}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Dropoff */}
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-secondary mt-1" />
                            <div>
                                <p className="text-sm text-muted-foreground">Drop-off Location</p>
                                <p className="font-medium text-foreground">{booking.dropoffLocation}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-secondary mt-1" />
                            <div>
                                <p className="text-sm text-muted-foreground">Return Date & Time</p>
                                <p className="font-medium text-foreground">
                                    {format(returnDate, 'PPP')} at {booking.returnTime}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vehicle Info */}
                <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-3">
                        <Car className="w-5 h-5 text-secondary" />
                        <div>
                            <p className="text-sm text-muted-foreground">Vehicle</p>
                            <p className="font-medium text-foreground">{booking.vehicleName || 'Vehicle ID: ' + booking.vehicleId}</p>
                        </div>
                    </div>
                </div>

                {/* Extras */}
                {booking.extras && booking.extras.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-border">
                        <div className="flex items-start gap-3">
                            <Package className="w-5 h-5 text-secondary mt-1" />
                            <div>
                                <p className="text-sm text-muted-foreground mb-2">Selected Extras</p>
                                <div className="flex flex-wrap gap-2">
                                    {booking.extras.map(extra => (
                                        <span key={extra} className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                                            {extra}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Price */}
                <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <DollarSign className="w-5 h-5 text-secondary" />
                            <span className="text-sm text-muted-foreground">Total Price</span>
                        </div>
                        <p className="font-display text-2xl font-bold text-secondary">
                            ${booking.totalPrice.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-secondary" />
                    Contact Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm text-muted-foreground">Name</p>
                            <p className="font-medium text-foreground">{booking.firstName} {booking.lastName}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="font-medium text-foreground">{booking.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm text-muted-foreground">Phone</p>
                            <p className="font-medium text-foreground">{booking.phone}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            {booking.status === 'confirmed' && isUpcoming && !showCancelConfirm && (
                <div className="bg-card rounded-2xl p-6 shadow-soft">
                    <div className="flex flex-wrap gap-3">
                        {onModify && (
                            <Button onClick={onModify} className="flex-1">
                                Modify Booking
                            </Button>
                        )}
                        {onCancel && (
                            <Button
                                variant="destructive"
                                onClick={() => setShowCancelConfirm(true)}
                                className="flex-1"
                            >
                                Cancel Booking
                            </Button>
                        )}
                    </div>
                </div>
            )}

            {/* Cancel Confirmation */}
            {showCancelConfirm && (
                <div className="bg-destructive/10 border-2 border-destructive rounded-2xl p-6">
                    <div className="flex items-start gap-3 mb-4">
                        <AlertCircle className="w-6 h-6 text-destructive mt-1" />
                        <div>
                            <h4 className="font-semibold text-foreground mb-2">Cancel Booking?</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                                Are you sure you want to cancel this booking?
                                <strong> Cancellations made less than 24 hours before pickup are non-refundable.</strong>
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setShowCancelConfirm(false)}
                        >
                            Keep Booking
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                onCancel?.();
                                setShowCancelConfirm(false);
                            }}
                        >
                            Yes, Cancel Booking
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
