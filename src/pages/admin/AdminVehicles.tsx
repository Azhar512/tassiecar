import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { api } from '@/services/api';
import { Vehicle } from '@/lib/db';
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    Users,
    Briefcase,
    Fuel,
    CheckCircle2,
    XCircle,
    MoreVertical,
    Loader2,
    Filter,
    Image as ImageIcon,
    X,
    Save,
    AlertTriangle,
    Car
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const AdminVehicles = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [isSaving, setIsSaving] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState<Omit<Vehicle, 'id'>>({
        name: '',
        type: 'Economy',
        image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
        price: 0,
        passengers: 5,
        luggage: 2,
        fuel: 'Petrol',
        transmission: 'Automatic',
        description: ''
    });

    const fetchVehicles = async () => {
        setLoading(true);
        try {
            const data = await api.vehicles.list();
            setVehicles(data);
        } catch (error) {
            console.error('Failed to fetch vehicles:', error);
            toast.error('Failed to load fleet data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const handleOpenAdd = () => {
        setModalMode('add');
        setEditingId(null);
        setFormData({
            name: '',
            type: 'Economy',
            image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
            price: 0,
            passengers: 5,
            luggage: 2,
            fuel: 'Petrol',
            transmission: 'Automatic',
            description: ''
        });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (vehicle: Vehicle) => {
        setModalMode('edit');
        setEditingId(vehicle.id);
        setFormData({
            name: vehicle.name,
            type: vehicle.type,
            image: vehicle.image,
            price: vehicle.price,
            passengers: vehicle.passengers,
            luggage: vehicle.luggage,
            fuel: vehicle.fuel,
            transmission: vehicle.transmission,
            description: vehicle.description
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string, name: string) => {
        if (!window.confirm(`Are you sure you want to delete "${name}" from the fleet?`)) return;

        try {
            await api.vehicles.delete(id);
            toast.success('Vehicle removed from fleet');
            fetchVehicles();
        } catch (error) {
            console.error('Failed to delete vehicle:', error);
            toast.error('Failed to delete vehicle');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            if (modalMode === 'add') {
                await api.vehicles.create(formData);
                toast.success('New vehicle added successfully');
            } else if (editingId) {
                await api.vehicles.update(editingId, formData);
                toast.success('Vehicle information updated');
            }
            setIsModalOpen(false);
            fetchVehicles();
        } catch (error) {
            console.error('Failed to save vehicle:', error);
            toast.error('Failed to save vehicle details');
        } finally {
            setIsSaving(false);
        }
    };

    const filteredVehicles = vehicles.filter(v => {
        const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'All' || v.type === typeFilter;
        return matchesSearch && matchesType;
    });

    const vehicleTypes = ['All', 'Economy', 'SUV', 'Luxury', 'Electric'];

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold text-foreground mb-1">Fleet Management</h1>
                        <p className="text-muted-foreground font-medium">Add, edit, and monitor your vehicle inventory.</p>
                    </div>
                    <Button
                        onClick={handleOpenAdd}
                        className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold px-6 rounded-xl shadow-lg shadow-secondary/20 flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Vehicle
                    </Button>
                </div>

                {/* Filters & Search */}
                <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search vehicles by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 bg-muted/50 border border-transparent focus:border-secondary/20 focus:bg-background rounded-xl text-sm transition-all outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <Filter className="w-4 h-4 text-muted-foreground ml-2" />
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="h-12 bg-muted/50 border border-transparent focus:border-secondary/20 focus:bg-background rounded-xl px-4 text-sm font-medium outline-none transition-all cursor-pointer min-w-[140px]"
                        >
                            {vehicleTypes.map(type => <option key={type}>{type}</option>)}
                        </select>
                    </div>
                </div>

                {/* Vehicles Grid */}
                {loading ? (
                    <div className="p-20 flex flex-col items-center justify-center text-center">
                        <Loader2 className="w-10 h-10 animate-spin text-secondary mb-4" />
                        <p className="text-muted-foreground font-medium">Loading vehicle fleet...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredVehicles.map((vehicle) => (
                            <div key={vehicle.id} className="bg-card rounded-2xl shadow-soft border border-border/50 overflow-hidden group hover:border-secondary/20 transition-all flex flex-col">
                                {/* Vehicle Image */}
                                <div className="h-48 relative overflow-hidden bg-muted">
                                    <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute top-4 left-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                                        {vehicle.type}
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-card/90 text-foreground px-3 py-1 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
                                        ${vehicle.price}/day
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-display font-bold text-lg text-foreground truncate">{vehicle.name}</h3>
                                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                            <CheckCircle2 size={10} />
                                            Active
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                                        {vehicle.description}
                                    </p>

                                    {/* Specs */}
                                    <div className="grid grid-cols-3 gap-2 mb-6">
                                        <div className="flex flex-col items-center p-2 bg-muted/30 rounded-xl text-center">
                                            <Users className="w-3.5 h-3.5 text-muted-foreground mb-1" />
                                            <span className="text-[10px] font-bold">{vehicle.passengers} Seats</span>
                                        </div>
                                        <div className="flex flex-col items-center p-2 bg-muted/30 rounded-xl text-center">
                                            <Briefcase className="w-3.5 h-3.5 text-muted-foreground mb-1" />
                                            <span className="text-[10px] font-bold">{vehicle.luggage} Bags</span>
                                        </div>
                                        <div className="flex flex-col items-center p-2 bg-muted/30 rounded-xl text-center">
                                            <Fuel className="w-3.5 h-3.5 text-muted-foreground mb-1" />
                                            <span className="text-[10px] font-bold uppercase truncate w-full px-1">{vehicle.fuel}</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="mt-auto flex items-center gap-2">
                                        <Button
                                            onClick={() => handleOpenEdit(vehicle)}
                                            variant="outline"
                                            className="flex-1 rounded-xl border-border hover:bg-muted text-xs font-bold gap-2"
                                        >
                                            <Edit2 className="w-3.5 h-3.5" />
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(vehicle.id, vehicle.name)}
                                            variant="outline"
                                            className="w-10 h-10 p-0 rounded-xl border-border hover:bg-red-50 hover:text-red-500 hover:border-red-100"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {filteredVehicles.length === 0 && !loading && (
                            <div className="col-span-full py-16 text-center bg-card rounded-3xl border border-dashed border-border">
                                <Car className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-30" />
                                <p className="text-muted-foreground font-medium">No vehicles found matching your criteria.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Form Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-border animate-in zoom-in-95 duration-200">
                            <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
                                <div>
                                    <h2 className="text-xl font-bold text-foreground">
                                        {modalMode === 'add' ? 'Add New Vehicle' : 'Edit Vehicle Details'}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        {modalMode === 'add' ? 'Create a new entry in your fleet.' : `Update details for ${formData.name}`}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-muted rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Basic Info */}
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Vehicle Name</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full h-11 bg-muted/40 border border-border rounded-xl px-4 text-sm focus:outline-none focus:border-secondary transition-all"
                                                placeholder="e.g. Tesla Model 3"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Vehicle Type</label>
                                            <select
                                                className="w-full h-11 bg-muted/40 border border-border rounded-xl px-4 text-sm focus:outline-none focus:border-secondary"
                                                value={formData.type}
                                                onChange={e => setFormData({ ...formData, type: e.target.value as Vehicle['type'] })}
                                            >
                                                <option value="Economy">Economy</option>
                                                <option value="SUV">SUV</option>
                                                <option value="Luxury">Luxury</option>
                                                <option value="Electric">Electric</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Daily Price ($)</label>
                                            <input
                                                required
                                                type="number"
                                                value={formData.price}
                                                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                                                className="w-full h-11 bg-muted/40 border border-border rounded-xl px-4 text-sm focus:outline-none focus:border-secondary"
                                            />
                                        </div>
                                    </div>

                                    {/* Image & URL */}
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Image URL</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.image}
                                                onChange={e => setFormData({ ...formData, image: e.target.value })}
                                                className="w-full h-11 bg-muted/40 border border-border rounded-xl px-4 text-sm focus:outline-none focus:border-secondary"
                                                placeholder="https://..."
                                            />
                                        </div>
                                        <div className="aspect-video bg-muted rounded-xl overflow-hidden border border-border group relative">
                                            <img src={formData.image} className="w-full h-full object-cover transition-opacity" alt="Preview"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800';
                                                }}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-[10px] font-bold text-white uppercase italic tracking-widest bg-black/40 px-3 py-1 rounded-full">Image Preview</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Specs Row */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Passengers</label>
                                        <input
                                            type="number"
                                            value={formData.passengers}
                                            onChange={e => setFormData({ ...formData, passengers: Number(e.target.value) })}
                                            className="w-full h-11 bg-muted/40 border border-border rounded-xl px-4 text-sm focus:outline-none focus:border-secondary"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Luggage</label>
                                        <input
                                            type="number"
                                            value={formData.luggage}
                                            onChange={e => setFormData({ ...formData, luggage: Number(e.target.value) })}
                                            className="w-full h-11 bg-muted/40 border border-border rounded-xl px-4 text-sm focus:outline-none focus:border-secondary"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Fuel</label>
                                        <input
                                            type="text"
                                            value={formData.fuel}
                                            onChange={e => setFormData({ ...formData, fuel: e.target.value })}
                                            className="w-full h-11 bg-muted/40 border border-border rounded-xl px-4 text-sm focus:outline-none focus:border-secondary"
                                            placeholder="Petrol"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Trans.</label>
                                        <select
                                            className="w-full h-11 bg-muted/40 border border-border rounded-xl px-4 text-sm focus:outline-none focus:border-secondary"
                                            value={formData.transmission}
                                            onChange={e => setFormData({ ...formData, transmission: e.target.value as 'Automatic' | 'Manual' })}
                                        >
                                            <option value="Automatic">Automatic</option>
                                            <option value="Manual">Manual</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="w-full bg-muted/40 border border-border rounded-xl p-4 text-sm focus:outline-none focus:border-secondary resize-none"
                                        placeholder="Enter a brief marketing description for the vehicle..."
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>

                                <div className="pt-4 flex items-center justify-end gap-3 sticky bottom-0 bg-card py-4 border-t border-border mt-6">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => setIsModalOpen(false)}
                                        className="rounded-xl font-bold h-12 px-6"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold h-12 px-8 rounded-xl shadow-lg shadow-secondary/10 flex items-center gap-2"
                                        disabled={isSaving}
                                    >
                                        {isSaving ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <Save className="w-5 h-5" />
                                        )}
                                        {modalMode === 'add' ? 'Create Vehicle' : 'Save Changes'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminVehicles;

