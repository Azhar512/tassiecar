import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/db';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = true }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (!session) {
                    setAuthenticated(false);
                    setIsAdmin(false);
                } else {
                    setAuthenticated(true);
                    // Check for admin role in user metadata
                    const userRole = session.user.user_metadata?.role;
                    setIsAdmin(userRole === 'admin');
                }
            } catch (error) {
                console.error('Auth check error:', error);
                setAuthenticated(false);
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setAuthenticated(true);
                setIsAdmin(session.user.user_metadata?.role === 'admin');
            } else {
                setAuthenticated(false);
                setIsAdmin(false);
            }
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-secondary mx-auto mb-4" />
                    <p className="text-muted-foreground font-medium">Verifying access...</p>
                </div>
            </div>
        );
    }

    if (!authenticated) {
        // Redirect to admin login if they were trying to access admin pages
        if (location.pathname.startsWith('/admin')) {
            return <Navigate to="/admin/login" state={{ from: location }} replace />;
        }
        return <Navigate to="/" replace />;
    }

    if (requireAdmin && !isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <div className="max-w-md w-full bg-card rounded-2xl p-8 shadow-soft text-center border-2 border-destructive/20">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-2">Access Denied</h2>
                    <p className="text-muted-foreground mb-6">
                        You do not have the necessary permissions to access this area.
                    </p>
                    <a href="/" className="inline-block px-6 py-2 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:brightness-110 transition-all">
                        Return to Homepage
                    </a>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
