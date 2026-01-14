import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
    Users,
    BookOpen,
    Car,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    CheckCircle2,
    XCircle,
    TrendingUp,
    CreditCard
} from 'lucide-react';
import { api } from '@/services/api';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalBookings: 0,
        activeRentals: 0,
        pendingPayments: 0,
        totalRevenue: 0,
        confirmedBookings: 0,
        cancelledBookings: 0
    });
    const [loading, setLoading] = useState(true);
    const [recentBookings, setRecentBookings] = useState<any[]>([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const bookings = await api.bookings.list(); // Assuming list returns all for admin or we extend it
                const vehicles = await api.vehicles.list();

                const confirmed = bookings.filter(b => b.status === 'confirmed').length;
                const cancelled = bookings.filter(b => b.status === 'cancelled').length;
                const revenue = bookings
                    .filter(b => b.status === 'confirmed')
                    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

                setStats({
                    totalBookings: bookings.length,
                    activeRentals: Math.floor(bookings.length * 0.4), // Mock logic for demo
                    pendingPayments: Math.floor(bookings.length * 0.1),
                    totalRevenue: revenue,
                    confirmedBookings: confirmed,
                    cancelledBookings: cancelled
                });

                setRecentBookings(bookings.slice(0, 5));
            } catch (error) {
                console.error('Failed to fetch dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        { name: 'Total Bookings', value: stats.totalBookings, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50', change: '+12%', trend: 'up' },
        { name: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50', change: '+18.5%', trend: 'up' },
        { name: 'Active Rentals', value: stats.activeRentals, icon: Car, color: 'text-secondary', bg: 'bg-secondary/10', change: '+5%', trend: 'up' },
        { name: 'Cancellation Rate', value: `${((stats.cancelledBookings / stats.totalBookings || 0) * 100).toFixed(1)}%`, icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', change: '-2%', trend: 'down' },
    ];

    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Welcome Header */}
                <div>
                    <h1 className="font-display text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
                    <p className="text-muted-foreground font-medium">Welcome back, Admin. Here's what's happening today.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="bg-card p-6 rounded-2xl shadow-soft border border-border/50 group hover:border-secondary/20 transition-all">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={cn("p-3 rounded-xl", stat.bg)}>
                                        <Icon className={cn("w-6 h-6", stat.color)} />
                                    </div>
                                    <div className={cn(
                                        "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                                        stat.trend === 'up' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                    )}>
                                        {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                        {stat.change}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">{stat.name}</p>
                                    <p className="text-3xl font-bold text-foreground tracking-tight">{stat.value}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Bookings Table */}
                    <div className="lg:col-span-2 bg-card rounded-2xl shadow-soft border border-border/50 overflow-hidden">
                        <div className="p-6 border-b border-border flex items-center justify-between">
                            <h3 className="font-display font-bold text-lg text-foreground">Recent Bookings</h3>
                            <Button variant="ghost" size="sm" asChild className="text-secondary font-bold">
                                <Link to="/admin/bookings">View All</Link>
                            </Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-muted/30 text-muted-foreground text-xs uppercase tracking-widest font-bold">
                                        <th className="px-6 py-4">Customer</th>
                                        <th className="px-6 py-4">Vehicle</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {recentBookings.map((booking, idx) => (
                                        <tr key={idx} className="hover:bg-muted/20 transition-colors group">
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-foreground leading-none mb-1">{booking.firstName} {booking.lastName}</p>
                                                <p className="text-xs text-muted-foreground">{booking.email}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Car className="w-4 h-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium text-foreground">{booking.vehicleName || "Hatchback"}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                                                    booking.status === 'confirmed' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                                )}>
                                                    {booking.status === 'confirmed' ? (
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                    ) : (
                                                        <XCircle className="w-3.5 h-3.5" />
                                                    )}
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="font-bold text-foreground">${booking.totalPrice?.toFixed(2)}</span>
                                            </td>
                                        </tr>
                                    ))}
                                    {recentBookings.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                                                No recent bookings found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Activity / Performance Feed */}
                    <div className="space-y-8">
                        <div className="bg-card rounded-2xl shadow-soft border border-border/50 p-6">
                            <h3 className="font-display font-bold text-lg text-foreground mb-6">System Performance</h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-muted-foreground">Fleet Utilization</span>
                                        <span className="text-sm font-bold text-foreground">84%</span>
                                    </div>
                                    <div className="w-full h-2 bg-muted rounded-full">
                                        <div className="w-[84%] h-full bg-secondary rounded-full"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-muted-foreground">User Satisfaction</span>
                                        <span className="text-sm font-bold text-foreground">92%</span>
                                    </div>
                                    <div className="w-full h-2 bg-muted rounded-full">
                                        <div className="w-[92%] h-full bg-green-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-muted-foreground">Conversion Rate</span>
                                        <span className="text-sm font-bold text-foreground">12.5%</span>
                                    </div>
                                    <div className="w-full h-2 bg-muted rounded-full">
                                        <div className="w-[12%] h-full bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card rounded-2xl shadow-soft border border-border/50 overflow-hidden group">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800"
                                    alt="Luxury Car"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-4 left-4">
                                    <h4 className="font-display font-bold text-white text-xl">Executive Collection</h4>
                                    <p className="text-white/70 text-xs font-medium uppercase tracking-widest">Premium Fleet Status</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Your premium fleet is performing exceptionally. Ensure all high-end vehicles are maintained for maximum customer satisfaction.
                                </p>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-secondary/10 flex items-center justify-center">
                                                <Car className="w-4 h-4 text-secondary" />
                                            </div>
                                        ))}
                                    </div>
                                    <Button variant="ghost" size="sm" asChild className="text-secondary font-bold hover:bg-secondary/10">
                                        <Link to="/admin/vehicles">Manage Fleet</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}
