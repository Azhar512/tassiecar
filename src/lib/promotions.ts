// Promotions data for special offers section
export interface Promotion {
    id: string;
    title: string;
    description: string;
    badge: string;
    discount?: number;
    code?: string;
    validUntil?: Date;
    imageUrl?: string;
    link?: string;
}

export const promotions: Promotion[] = [
    {
        id: 'summer-special',
        title: 'Summer Road Trip Special',
        description: 'Book your summer adventure and save big on all vehicle categories',
        badge: 'UP TO 20% OFF',
        discount: 20,
        code: 'SUMMER20',
        validUntil: new Date('2026-03-31'),
        link: '/vehicles'
    },
    {
        id: 'long-term',
        title: 'Long-term Rental Deal',
        description: 'Rent for 7+ days and receive a free vehicle upgrade',
        badge: 'FREE UPGRADE',
        validUntil: new Date('2026-12-31'),
        link: '/vehicles'
    },
    {
        id: 'early-bird',
        title: 'Early Bird Discount',
        description: 'Book 30 days in advance and save 15% on your rental',
        badge: '15% OFF',
        discount: 15,
        code: 'EARLY15',
        validUntil: new Date('2026-12-31'),
        link: '/booking'
    },
    {
        id: 'weekend-special',
        title: 'Weekend Getaway',
        description: 'Friday to Monday bookings discounted for spontaneous trips',
        badge: 'WEEKEND DEAL',
        discount: 10,
        code: 'WEEKEND10',
        validUntil: new Date('2026-12-31'),
        link: '/vehicles'
    }
];

export const getActivePromotions = (): Promotion[] => {
    const now = new Date();
    return promotions.filter(promo =>
        !promo.validUntil || promo.validUntil > now
    );
};

export const getPromotionById = (id: string): Promotion | undefined => {
    return promotions.find(promo => promo.id === id);
};
