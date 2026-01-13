import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/db';
import {
    LayoutDashboard,
    BookOpen,
    Car,
    MessageSquare,
    Settings,
    LogOut,
    ChevronLeft,
    Users,
    ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Bookings', path: '/admin/bookings', icon: BookOpen },
    { name: 'Fleet', path: '/admin/vehicles', icon: Car },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
];

const AdminSidebar = () => {
    const location = useLocation();

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            toast.success('Signed out successfully');
        } catch (error: any) {
            toast.error('Logout failed: ' + error.message);
        }
    };

    return (
        <aside className="w-64 bg-card border-r border-border h-screen sticky top-0 flex flex-col pt-8 pb-4">
            {/* Header/Logo */}
            <div className="px-6 mb-8">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Car className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <div className="font-display font-bold text-xl text-foreground">
                        Tassie<span className="text-secondary">Cars</span>
                        <span className="block text-[10px] uppercase tracking-tighter text-muted-foreground -mt-1 font-sans">Admin Portal</span>
                    </div>
                </Link>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 px-3 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium group",
                                isActive
                                    ? "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/10"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <Icon className={cn("w-5 h-5", isActive ? "text-secondary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="px-3 space-y-1 pt-4 border-t border-border">
                <Link
                    to="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all font-medium"
                >
                    <ExternalLink className="w-5 h-5" />
                    Visit Website
                </Link>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all font-medium"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
