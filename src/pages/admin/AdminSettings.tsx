import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
    Settings,
    Shield,
    Database,
    Globe,
    Bell,
    Save,
    CheckCircle2,
    Lock,
    Mail,
    Smartphone,
    Info,
    Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminSettings = () => {
    return (
        <AdminLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="font-display text-3xl font-bold text-foreground mb-1">System Settings</h1>
                    <p className="text-muted-foreground font-medium">Configure your platform preferences and security.</p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="xl:col-span-2 space-y-6">
                        {/* General Settings */}
                        <div className="bg-card rounded-2xl shadow-soft border border-border/50 p-6 lg:p-8">
                            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border">
                                <Globe className="w-6 h-6 text-secondary" />
                                <h3 className="font-display font-bold text-xl text-foreground">General Configuration</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-foreground ml-1">Company Name</label>
                                        <input type="text" className="input-premium w-full" defaultValue="Tassie Drive Experience" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-foreground ml-1">Support Email</label>
                                        <input type="email" className="input-premium w-full" defaultValue="tassieautorentals@gmail.com" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground ml-1">Currency Symbol</label>
                                    <select className="input-premium w-full">
                                        <option>AUD ($)</option>
                                        <option>USD ($)</option>
                                        <option>EUR (€)</option>
                                    </select>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        <div>
                                            <p className="text-sm font-bold text-foreground leading-none mb-1">Online Booking Enabled</p>
                                            <p className="text-xs text-muted-foreground font-medium">Customers can place reservations instantly</p>
                                        </div>
                                    </div>
                                    <div className="w-12 h-6 bg-secondary rounded-full relative cursor-pointer">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-secondary-foreground rounded-full shadow-sm"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-border flex justify-end">
                                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold px-8 rounded-xl flex items-center gap-2">
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </Button>
                            </div>
                        </div>

                        {/* Email Notifications */}
                        <div className="bg-card rounded-2xl shadow-soft border border-border/50 p-6 lg:p-8">
                            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border">
                                <Bell className="w-6 h-6 text-blue-500" />
                                <h3 className="font-display font-bold text-xl text-foreground">Notification Settings</h3>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { title: 'New Booking Alerts', desc: 'Get notified for every reservation', icon: Mail },
                                    { title: 'Cancellation Alerts', desc: 'Get notified when a user cancels', icon: Trash2 },
                                    { title: 'System Heartbeat', desc: 'Daily summary of performance', icon: Smartphone }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl group hover:bg-muted transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-foreground leading-none mb-1">{item.title}</p>
                                                <p className="text-xs text-muted-foreground font-medium">{item.desc}</p>
                                            </div>
                                        </div>
                                        <div className="w-12 h-6 bg-muted rounded-full relative cursor-pointer group-hover:bg-muted-foreground/20">
                                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Settings */}
                    <div className="space-y-6">
                        {/* Account Security */}
                        <div className="bg-card rounded-2xl shadow-soft border border-border/50 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Shield className="w-5 h-5 text-red-500" />
                                <h3 className="font-display font-bold text-lg text-foreground">Security Portal</h3>
                            </div>
                            <p className="text-xs text-muted-foreground mb-6 font-medium leading-relaxed">
                                Manage your credentials and API keys. Ensure rotation every 90 days.
                            </p>
                            <div className="space-y-3">
                                <Button variant="outline" className="w-full rounded-xl border-border hover:bg-muted text-xs font-bold gap-2">
                                    <Lock className="w-3.5 h-3.5" />
                                    Rotate API Keys
                                </Button>
                                <Button variant="outline" className="w-full rounded-xl border-border hover:bg-muted text-xs font-bold gap-2">
                                    <Shield className="w-3.5 h-3.5" />
                                    Security Audit Log
                                </Button>
                            </div>
                        </div>

                        {/* Database Stats */}
                        <div className="bg-card rounded-2xl shadow-soft border border-border/50 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Database className="w-5 h-5 text-indigo-500" />
                                <h3 className="font-display font-bold text-lg text-foreground">Supabase Status</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm font-medium">
                                    <span className="text-muted-foreground">Database Usage</span>
                                    <span className="text-foreground">1.4% / 500MB</span>
                                </div>
                                <div className="w-full h-1.5 bg-muted rounded-full">
                                    <div className="w-[1.4%] h-full bg-secondary rounded-full"></div>
                                </div>
                                <div className="flex justify-between items-center text-sm font-medium pt-2">
                                    <span className="text-muted-foreground">Region</span>
                                    <span className="text-foreground uppercase text-xs font-bold tracking-widest">us-east-1</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-medium">
                                    <span className="text-muted-foreground">Backup Status</span>
                                    <span className="text-green-500 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
                                        <CheckCircle2 size={12} />
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-muted/50 rounded-2xl p-6 border border-dashed border-border opacity-60">
                            <div className="flex items-start gap-3">
                                <Info className="w-5 h-5 text-secondary shrink-0" />
                                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold leading-relaxed">
                                    Last system-wide backup completed on Jan 12, 2026.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminSettings;
