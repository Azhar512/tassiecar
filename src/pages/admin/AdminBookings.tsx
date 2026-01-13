import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { api } from '@/services/api';
import { Booking } from '@/lib/db';
import {
    Search,
    Filter,
    MoreVertical,
    CheckCircle2,
    XCircle,
    Clock,
    Car,
    Calendar,
    Eye,
    Trash2,
    Check,
    ChevronRight,
    Loader2
} from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const AdminBookings = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const data = await api.bookings.list();
            setBookings(data);
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
            toast.error('Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleStatusUpdate = async (id: string, newStatus: 'confirmed' | 'cancelled') => {
        try {
            if (newStatus === 'cancelled') {
                await api.bookings.cancel(id);
            }
            toast.success(`Booking status updated successfully`);
            fetchBookings();
        } catch (error) {
            toast.error('Failed to update booking status');
        }
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch =
            booking.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'All' || booking.status === statusFilter.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
            case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
            case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold text-foreground mb-1">Booking Management</h1>
                        <p className="text-muted-foreground font-medium">Monitor and manage all customer reservations.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" onClick={fetchBookings} className="rounded-xl border-border hover:bg-muted transition-colors">
                            Refresh Data
                        </Button>
                        <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold px-6 rounded-xl shadow-lg shadow-secondary/20">
                            Export CSV
                        </Button>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or confirmation code..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 bg-muted/50 border border-transparent focus:border-secondary/20 focus:bg-background rounded-xl text-sm transition-all outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <Filter className="w-4 h-4 text-muted-foreground ml-2" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="h-12 bg-muted/50 border border-transparent focus:border-secondary/20 focus:bg-background rounded-xl px-4 text-sm font-medium outline-none transition-all cursor-pointer min-w-[140px]"
                        >
                            <option>All</option>
                            <option>Confirmed</option>
                            <option>Cancelled</option>
                            <option>Completed</option>
                        </select>
                    </div>
                </div>

                {/* Bookings Table */}
                <div className="bg-card rounded-2xl shadow-soft border border-border/50 overflow-hidden text-sm">
                    {loading ? (
                        <div className="p-20 flex flex-col items-center justify-center text-center">
                            <Loader2 className="w-10 h-10 animate-spin text-secondary mb-4" />
                            <p className="text-muted-foreground font-medium">Fetching booking data...</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-muted/30 text-muted-foreground text-[10px] uppercase tracking-widest font-bold">
                                        <th className="px-6 py-4">Booking Info</th>
                                        <th className="px-6 py-4">Customer Details</th>
                                        <th className="px-6 py-4">Vehicle</th>
                                        <th className="px-6 py-4">Rental Period</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {filteredBookings.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-muted/10 transition-colors group">
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <span className="font-mono text-xs font-bold bg-muted px-2 py-1 rounded text-foreground">
                                                    {booking.id.split('-')[0].toUpperCase()}
                                                </span>
                                                <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-tighter">
                                                    {format(new Date(booking.createdAt), 'MMM dd, yyyy • HH:mm')}
                                                </p>
                                            </td>
                                            <td className="px-6 py-5">
                                                <p className="font-bold text-foreground truncate max-w-[150px]">
                                                    {booking.firstName} {booking.lastName}
                                                </p>
                                                <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                                                    {booking.email}
                                                </p>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <Car className="w-4 h-4 text-secondary" />
                                                    <div>
                                                        <p className="font-semibold text-foreground leading-none">{booking.vehicleName || "Vehicle"}</p>
                                                        <p className="text-[10px] text-muted-foreground mt-0.5">${booking.totalPrice?.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-1.5 text-xs text-foreground font-medium whitespace-nowrap">
                                                        <Clock className="w-3 h-3 text-muted-foreground" />
                                                        {format(new Date(booking.pickupDate), 'MMM dd')}
                                                        <ChevronRight className="w-3 h-3 text-muted-foreground" />
                                                        {format(new Date(booking.returnDate), 'MMM dd')}
                                                    </div>
                                                    <p className="text-[10px] text-muted-foreground ml-4.5 truncate max-w-[120px]">
                                                        {booking.pickupLocation.split(',')[0]}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusColor(booking.status)}`}>
                                                    {booking.status === 'confirmed' ? <CheckCircle2 size={12} /> :
                                                        booking.status === 'cancelled' ? <XCircle size={12} /> : <Calendar size={12} />}
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {booking.status === 'confirmed' && (
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className="w-8 h-8 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                                                            title="Cancel Booking"
                                                            onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                                                        >
                                                            <XCircle size={16} />
                                                        </Button>
                                                    )}
                                                    <Button size="icon" variant="ghost" className="w-8 h-8 text-secondary hover:bg-secondary/10 rounded-lg" title="View Details">
                                                        <Eye size={16} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {!loading && filteredBookings.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-16 text-center">
                                                <div className="flex flex-col items-center justify-center grayscale opacity-60">
                                                    <Search className="w-12 h-12 text-muted-foreground mb-3" />
                                                    <p className="text-lg font-display font-medium text-foreground">No bookings found</p>
                                                    <p className="text-muted-foreground">Try adjusting your filters or search term.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminBookings;
