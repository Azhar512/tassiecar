import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Message } from '@/lib/db';
import { api } from '@/services/api';
import {
    Mail,

    Phone,
    User,
    Calendar,
    Trash2,
    Search,
    Loader2,
    Inbox,
    Clock,
    ExternalLink,
    MessageSquare,
    Send
} from 'lucide-react';

import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const AdminMessages = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyContent, setReplyContent] = useState('');
    const [sendingReply, setSendingReply] = useState(false);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const data = await api.contact.list();
            setMessages(data || []);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
            toast.error('Failed to load messages');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleSendReply = async (id: string) => {
        if (!replyContent.trim()) {
            toast.error('Please enter a reply');
            return;
        }

        setSendingReply(true);
        try {
            await api.contact.reply(id, replyContent);
            toast.success('Reply sent successfully');
            setReplyingTo(null);
            setReplyContent('');
            fetchMessages();
        } catch (error) {
            console.error('Failed to send reply:', error);
            toast.error('Failed to send reply');
        } finally {
            setSendingReply(false);
        }
    };

    const filteredMessages = messages.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold text-foreground mb-1">Customer Messages</h1>
                        <p className="text-muted-foreground font-medium">Read and respond to inquiries from the contact form.</p>
                    </div>
                    <Button variant="outline" onClick={fetchMessages} className="rounded-xl border-border hover:bg-muted font-bold px-6">
                        Refresh Messages
                    </Button>
                </div>

                {/* Search */}
                <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                    <div className="relative w-full">
                        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search messages by name, email, or content..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 bg-muted/50 border border-transparent focus:border-secondary/20 focus:bg-background rounded-xl text-sm transition-all outline-none"
                        />
                    </div>
                </div>

                {/* Messages List */}
                {loading ? (
                    <div className="p-20 flex flex-col items-center justify-center text-center">
                        <Loader2 className="w-10 h-10 animate-spin text-secondary mb-4" />
                        <p className="text-muted-foreground font-medium">Loading inbox...</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredMessages.map((msg) => (
                            <div key={msg.id} className="bg-card p-6 rounded-2xl shadow-soft border border-border/50 hover:border-secondary/20 transition-all group">
                                <div className="flex flex-col lg:flex-row gap-6">
                                    {/* Sender Info */}
                                    <div className="lg:w-1/4 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold">
                                                {msg.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground leading-none mb-1">{msg.name}</p>
                                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {format(new Date(msg.createdAt), 'MMM dd, HH:mm')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-1.5 pt-2">
                                            <a href={`mailto:${msg.email}`} className="text-xs text-muted-foreground hover:text-secondary flex items-center gap-2 transition-colors">
                                                <Mail className="w-3.5 h-3.5" />
                                                {msg.email}
                                            </a>
                                            {msg.phone && (
                                                <a href={`tel:${msg.phone}`} className="text-xs text-muted-foreground hover:text-secondary flex items-center gap-2 transition-colors">
                                                    <Phone className="w-3.5 h-3.5" />
                                                    {msg.phone}
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Message Content */}
                                    <div className="lg:w-3/4 space-y-4">
                                        <div>
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="font-display font-bold text-lg text-foreground">{msg.subject}</h3>
                                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-8 text-secondary hover:bg-secondary/10 flex items-center gap-2 rounded-lg"
                                                        onClick={() => {
                                                            setReplyingTo(replyingTo === msg.id ? null : msg.id);
                                                            if (msg.reply) setReplyContent(msg.reply);
                                                        }}
                                                    >
                                                        <MessageSquare size={16} />
                                                        {msg.reply ? 'Edit Reply' : 'Reply'}
                                                    </Button>
                                                    <Button size="icon" variant="ghost" className="w-8 h-8 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg">
                                                        <Trash2 size={16} />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="bg-muted/30 p-4 rounded-xl text-sm text-foreground leading-relaxed whitespace-pre-wrap border border-border/50">
                                                {msg.message}
                                            </div>
                                        </div>

                                        {/* Reply Display */}
                                        {msg.reply && replyingTo !== msg.id && (
                                            <div className="bg-secondary/5 border border-secondary/10 p-4 rounded-xl">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center text-[10px] font-bold">A</div>
                                                    <p className="text-xs font-bold text-secondary uppercase tracking-wider">Admin Reply</p>
                                                </div>
                                                <p className="text-sm text-foreground/80 italic">"{msg.reply}"</p>
                                            </div>
                                        )}

                                        {/* Reply Form */}
                                        {replyingTo === msg.id && (
                                            <div className="bg-muted/50 p-4 rounded-xl border border-secondary/20 animate-in fade-in slide-in-from-top-2">
                                                <textarea
                                                    className="w-full bg-background border border-border rounded-lg p-3 text-sm focus:outline-none focus:border-secondary transition-all resize-none mb-3"
                                                    placeholder="Type your answer here..."
                                                    rows={3}
                                                    value={replyContent}
                                                    onChange={(e) => setReplyContent(e.target.value)}
                                                />
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-9 px-4 rounded-lg font-bold"
                                                        onClick={() => setReplyingTo(null)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        className="h-9 px-4 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold rounded-lg shadow-sm"
                                                        onClick={() => handleSendReply(msg.id)}
                                                        disabled={sendingReply}
                                                    >
                                                        {sendingReply ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                                                        {msg.reply ? 'Save Changes' : 'Send Answer'}
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {filteredMessages.length === 0 && !loading && (
                            <div className="py-20 text-center bg-card rounded-3xl border border-dashed border-border">
                                <Inbox className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
                                <h3 className="text-xl font-display font-bold text-foreground mb-1">Inbox Empty</h3>
                                <p className="text-muted-foreground">No customer messages found in the database.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminMessages;
