import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BookingLookupProps {
    onLookup: (email: string, confirmationCode: string) => Promise<void>;
    loading?: boolean;
}

export const BookingLookup: React.FC<BookingLookupProps> = ({ onLookup, loading = false }) => {
    const [email, setEmail] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [errors, setErrors] = useState({ email: '', code: '' });

    const validateForm = () => {
        const newErrors = { email: '', code: '' };
        let isValid = true;

        if (!email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        if (!confirmationCode) {
            newErrors.code = 'Confirmation code is required';
            isValid = false;
        } else if (confirmationCode.length < 6) {
            newErrors.code = 'Confirmation code must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            await onLookup(email.toLowerCase().trim(), confirmationCode.toUpperCase().trim());
        }
    };

    return (
        <div className="bg-card rounded-2xl p-8 shadow-soft max-w-xl mx-auto">
            <div className="text-center mb-8">
                <Search className="w-16 h-16 mx-auto mb-4 text-secondary" />
                <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                    Find Your Booking
                </h2>
                <p className="text-muted-foreground">
                    Enter your email and confirmation code to view and manage your booking
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors({ ...errors, email: '' });
                        }}
                        className={cn(
                            'input-premium w-full',
                            errors.email && 'border-destructive'
                        )}
                        placeholder="your.email@example.com"
                        disabled={loading}
                    />
                    {errors.email && (
                        <p className="text-sm text-destructive mt-1">{errors.email}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Confirmation Code *
                    </label>
                    <input
                        type="text"
                        value={confirmationCode}
                        onChange={(e) => {
                            setConfirmationCode(e.target.value.toUpperCase());
                            setErrors({ ...errors, code: '' });
                        }}
                        className={cn(
                            'input-premium w-full font-mono uppercase',
                            errors.code && 'border-destructive'
                        )}
                        placeholder="ABC123"
                        disabled={loading}
                        maxLength={20}
                    />
                    {errors.code && (
                        <p className="text-sm text-destructive mt-1">{errors.code}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                        Found in your booking confirmation email
                    </p>
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Searching...
                        </>
                    ) : (
                        <>
                            <Search className="w-5 h-5 mr-2" />
                            Find My Booking
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
};
