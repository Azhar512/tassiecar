// Location data for Tasmania car rental
export interface Location {
    id: string;
    name: string;
    type: 'airport' | 'city' | 'railway';
    address: string;
    hours: string;
    twentyFourSeven?: boolean;
    coordinates?: {
        lat: number;
        lng: number;
    };
}

export const locations: Location[] = [
    {
        id: 'glenorchy',
        name: 'TASSIE AUTOCARE PTY LTD',
        type: 'city',
        address: '35-37 Jackson St, Glenorchy TAS 7010',
        hours: '8:00 AM - 6:00 PM',
        coordinates: { lat: -42.8333, lng: 147.2833 } // Glenorchy coordinates
    }
];

export const getLocationsByType = (type: Location['type']) => {
    return locations.filter(loc => loc.type === type);
};

export const getLocationById = (id: string) => {
    return locations.find(loc => loc.id === id);
};

export const searchLocations = (query: string): Location[] => {
    if (!query) return locations;

    const lowercaseQuery = query.toLowerCase();
    return locations.filter(loc =>
        loc.name.toLowerCase().includes(lowercaseQuery) ||
        loc.address.toLowerCase().includes(lowercaseQuery)
    );
};

export const getCategoryIcon = (type: Location['type']): string => {
    switch (type) {
        case 'airport':
            return '🛫';
        case 'city':
            return '🏢';
        case 'railway':
            return '🚉';
        default:
            return '📍';
    }
};

export const getCategoryLabel = (type: Location['type']): string => {
    switch (type) {
        case 'airport':
            return 'Airports';
        case 'city':
            return 'City Offices';
        case 'railway':
            return 'Transit Stations';
        default:
            return 'Locations';
    }
};
