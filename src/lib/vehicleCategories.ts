export interface VehicleCategory {
    id: string;
    name: string;
    description: string;
    icon: string;
    features: string[];
    priceRange: string;
    vehicleType: 'Economy' | 'SUV' | 'Luxury' | 'Electric';
}

export const vehicleCategories: VehicleCategory[] = [
    {
        id: 'economy',
        name: 'Economy & Compact',
        description: 'Fuel-efficient and affordable vehicles perfect for city driving and daily commutes',
        icon: '🚗',
        features: ['Fuel Efficient', 'Easy Parking', 'Affordable', 'City Friendly'],
        priceRange: 'From $45/day',
        vehicleType: 'Economy'
    },
    {
        id: 'suv',
        name: 'SUV & 4WD',
        description: 'Spacious and capable vehicles ideal for Tasmania\'s rugged terrain and family adventures',
        icon: '🚙',
        features: ['4WD Capable', 'Spacious', 'Off-Road Ready', 'Family Friendly'],
        priceRange: 'From $89/day',
        vehicleType: 'SUV'
    },
    {
        id: 'luxury',
        name: 'Luxury & Premium',
        description: 'Premium vehicles offering superior comfort, style, and advanced features',
        icon: '✨',
        features: ['Premium Comfort', 'Advanced Tech', 'Prestige', 'Luxury Interior'],
        priceRange: 'From $149/day',
        vehicleType: 'Luxury'
    },
    {
        id: 'electric',
        name: 'Electric & Hybrid',
        description: 'Eco-friendly vehicles with zero or low emissions and cutting-edge technology',
        icon: '⚡',
        features: ['Zero Emissions', 'Eco-Friendly', 'Quiet Ride', 'Modern Tech'],
        priceRange: 'From $79/day',
        vehicleType: 'Electric'
    }
];

export const getCategoryById = (id: string): VehicleCategory | undefined => {
    return vehicleCategories.find(cat => cat.id === id);
};

export const getCategoryByType = (type: string): VehicleCategory | undefined => {
    return vehicleCategories.find(cat => cat.vehicleType === type);
};
