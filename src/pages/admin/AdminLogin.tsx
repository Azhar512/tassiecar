import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Car, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/admin/dashboard';

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.user) {
                // Double check admin role
                if (data.user.user_metadata?.role !== 'admin') {
                    // If logged in but not admin, sign out immediately
                    await supabase.auth.signOut();
                    toast.error('Access denied. Admin privileges required.');
                    return;
                }

                toast.success('Welcome back, Admin!');
                navigate(from, { replace: true });
            }
        } catch (error: any) {
            console.error('Login error:', error);
            toast.error(error.message || 'Failed to sign in. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-secondary flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary mb-4 shadow-lg shadow-secondary/20 scale-110">
                        <Car className="w-10 h-10 text-secondary-foreground" />
                    </div>
                    <h1 className="font-display text-3xl font-bold text-primary-foreground mb-2">
                        Tassie<span className="text-secondary">Cars</span> Admin
                    </h1>
                    <p className="text-primary-foreground/70">
                        Sign in to manage your fleet and bookings
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-card/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 animate-fade-in">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground ml-1">Admin Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-premium w-full"
                                placeholder="admin@tassiecars.com"
                                autoComplete="email"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-premium w-full pr-12"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground py-6 rounded-2xl text-lg font-bold shadow-lg shadow-secondary/20 group transition-all"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                'Secure Sign In'
                            )}
                        </Button>
                    </form>

                    {/* Help Info */}
                    <div className="mt-8 pt-6 border-t border-border/50">
                        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-2xl border border-white/5">
                            <AlertCircle className="w-5 h-5 text-secondary mt-0.5" />
                            <div>
                                <p className="text-xs font-semibold text-foreground mb-1 uppercase tracking-wider">Note for Admins</p>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Only authorized personnel with verified admin roles can access this portal.
                                    Login attempts are monitored and recorded.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <a href="/" className="text-primary-foreground/60 hover:text-primary-foreground text-sm font-medium transition-colors">
                        ← Back to Customer Website
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
