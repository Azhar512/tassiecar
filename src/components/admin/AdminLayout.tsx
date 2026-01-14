import React from 'react';
import AdminSidebar from './AdminSidebar';
import { Menu, X, Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SupportHub from '../SupportHub';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-muted/30">
            <SupportHub />
            {/* Sidebar - Desktop */}
            <div className="hidden lg:block lg:flex-shrink-0">
                <AdminSidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-20 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
                    {/* Left side (Mobile Toggle & Title) */}
                    <div className="flex items-center gap-4">
                        <button className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors">
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="relative hidden md:block w-72 lg:w-96">
                            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search bookings, vehicles..."
                                className="w-full h-10 pl-12 pr-4 bg-muted/50 border-transparent focus:bg-background focus:border-secondary/20 rounded-full text-sm transition-all focus:ring-0"
                            />
                        </div>
                    </div>

                    {/* Right side (Actions & Profile) */}
                    <div className="flex items-center gap-2 lg:gap-4">
                        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground rounded-full">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-card"></span>
                        </Button>

                        <div className="h-8 w-px bg-border mx-2 hidden sm:block"></div>

                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-foreground leading-none mb-1">Admin User</p>
                                <p className="text-[10px] text-secondary font-bold uppercase tracking-widest leading-none">Super Administrator</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary font-bold">
                                AD
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Body */}
                <main className="flex-1 p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto animate-fade-in">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
