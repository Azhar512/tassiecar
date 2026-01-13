import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tag, Calendar, ChevronRight } from 'lucide-react';
import { getActivePromotions } from '@/lib/promotions';
import { format } from 'date-fns';

const PromotionsSection = () => {
    const promotions = getActivePromotions();

    return (
        <section className="bg-muted/30 section-padding">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in">
                        Special Offers & Promotions
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in animation-delay-100">
                        Save big on your next Tasmania adventure with our exclusive deals
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {promotions.map((promo, index) => (
                        <div
                            key={promo.id}
                            className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all hover:-translate-y-1 animate-fade-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-bold mb-4">
                                <Tag className="w-4 h-4" />
                                {promo.badge}
                            </div>

                            {/* Title */}
                            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                                {promo.title}
                            </h3>

                            {/* Description */}
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                                {promo.description}
                            </p>

                            {/* Promo Code */}
                            {promo.code && (
                                <div className="bg-muted/50 rounded-lg p-3 mb-4">
                                    <p className="text-xs text-muted-foreground mb-1">Promo Code</p>
                                    <p className="font-mono font-bold text-foreground">{promo.code}</p>
                                </div>
                            )}

                            {/* Valid Until */}
                            {promo.validUntil && (
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                                    <Calendar className="w-3 h-3" />
                                    <span>Valid until {format(promo.validUntil, 'MMM dd, yyyy')}</span>
                                </div>
                            )}

                            {/* CTA Button */}
                            <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="w-full group"
                            >
                                <Link to={promo.link || '/vehicles'}>
                                    Book Now
                                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </div>
                    ))}
                </div>

                {/* View All Link */}
                <div className="text-center mt-10">
                    <Button asChild variant="hero" size="lg">
                        <Link to="/vehicles">
                            View All Vehicles
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default PromotionsSection;
