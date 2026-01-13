import React, { useState } from 'react';
import {
    MessageCircle,
    X,
    HelpCircle,
    MessageSquare,
    Phone,
    Send,
    CheckCircle2,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import { toast } from "sonner";

const SupportHub = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showContactForm, setShowContactForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const phoneNumber = "0401700033";
    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await api.contact.send({
                ...formData,
                phone: '',
                subject: 'Live Support Request'
            });
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setShowContactForm(false);
                setFormData({ name: '', email: '', message: '' });
                setIsOpen(false);
            }, 3000);
        } catch (error) {
            toast.error("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            {/* Expanded Menu */}
            {isOpen && !showContactForm && (
                <div className="bg-card border border-border/50 rounded-2xl shadow-2xl p-4 w-72 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-300 overflow-hidden">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/50">
                        <h3 className="font-display font-bold text-foreground">Support Hub</h3>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    </div>

                    <div className="space-y-3">
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 hover:bg-green-500/20 text-green-700 transition-all group"
                        >
                            <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white shadow-lg">
                                <MessageCircle size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold leading-tight">WhatsApp Chat</p>
                                <p className="text-[10px] opacity-70">Instant response</p>
                            </div>
                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>

                        <button
                            onClick={() => setShowContactForm(true)}
                            className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/10 hover:bg-secondary/20 text-secondary transition-all group text-left"
                        >
                            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-white shadow-lg">
                                <MessageSquare size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold leading-tight">Live Support</p>
                                <p className="text-[10px] opacity-70">Send us a message</p>
                            </div>
                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>

                        <a
                            href="tel:0401700033"
                            className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 transition-all group"
                        >
                            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white shadow-lg">
                                <Phone size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold leading-tight">Phone Support</p>
                                <p className="text-[10px] opacity-70">Call us directly</p>
                            </div>
                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    </div>
                </div>
            )}

            {/* Contact Form Modal */}
            {isOpen && showContactForm && (
                <div className="bg-card border border-border/50 rounded-2xl shadow-2xl p-6 w-80 mb-2 animate-in zoom-in-95 duration-200">
                    {submitted ? (
                        <div className="py-8 text-center animate-in fade-in">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 size={32} />
                            </div>
                            <h3 className="font-display font-bold text-lg mb-1">Message Sent!</h3>
                            <p className="text-sm text-muted-foreground">We'll get back to you ASAP.</p>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-display font-bold text-foreground">How can we help?</h3>
                                <button onClick={() => setShowContactForm(false)} className="text-muted-foreground hover:text-foreground">
                                    <X size={18} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        required
                                        className="w-full h-10 bg-muted/50 border border-transparent focus:border-secondary/30 rounded-lg px-3 text-sm outline-none transition-all"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        required
                                        className="w-full h-10 bg-muted/50 border border-transparent focus:border-secondary/30 rounded-lg px-3 text-sm outline-none transition-all"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <textarea
                                        placeholder="Briefly describe your issue..."
                                        required
                                        rows={3}
                                        className="w-full bg-muted/50 border border-transparent focus:border-secondary/30 rounded-lg p-3 text-sm outline-none transition-all resize-none"
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>
                                <Button
                                    className="w-full bg-secondary text-secondary-foreground font-bold rounded-lg shadow-lg hover:shadow-secondary/20"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Sending..." : "Request Support"}
                                </Button>
                            </form>
                        </>
                    )}
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${isOpen ? 'bg-foreground text-background' : 'bg-secondary text-white'}`}
            >
                {isOpen ? <X size={24} /> : (
                    <div className="relative">
                        <HelpCircle size={28} />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-secondary rounded-full animate-pulse"></span>
                    </div>
                )}
            </button>
        </div>
    );
};

export default SupportHub;
