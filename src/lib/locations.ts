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
    // Airports
    {
        id: 'hobart-airport',
        name: 'Hobart Airport',
        type: 'airport',
        address: 'Strachan Street, Cambridge, TAS 7170',
        hours: '6:00 AM - 10:00 PM',
        twentyFourSeven: true,
        coordinates: { lat: -42.8361, lng: 147.5103 }
    },
    {
        id: 'launceston-airport',
        name: 'Launceston Airport',
        type: 'airport',
        address: '201 Evandale Road, Western Junction, TAS 7212',
        hours: '6:00 AM - 10:00 PM',
        twentyFourSeven: true,
        coordinates: { lat: -41.5453, lng: 147.2144 }
    },

    // City Offices
    {
        id: 'hobart',
        name: 'Hobart CBD',
        type: 'city',
        address: '123 Elizabeth Street, Hobart, TAS 7000',
        hours: '8:00 AM - 6:00 PM',
        coordinates: { lat: -42.8821, lng: 147.3272 }
    },
    {
        id: 'launceston',
        name: 'Launceston CBD',
        type: 'city',
        address: '45 Brisbane Street, Launceston, TAS 7250',
        hours: '8:00 AM - 6:00 PM',
        coordinates: { lat: -41.4332, lng: 147.1377 }
    },
    {
        id: 'devonport',
        name: 'Devonport City Centre',
        type: 'city',
        address: '78 Rooke Street, Devonport, TAS 7310',
        hours: '8:00 AM - 5:30 PM',
        coordinates: { lat: -41.1789, lng: 146.3503 }
    },

    // Railway/Transit
    {
        id: 'hobart-terminal',
        name: 'Hobart Bus Terminal',
        type: 'railway',
        address: '199 Collins Street, Hobart, TAS 7000',
        hours: '7:00 AM - 7:00 PM',
        coordinates: { lat: -42.8826, lng: 147.3257 }
    },
    {
        id: 'launceston-terminal',
        name: 'Launceston Transit Centre',
        type: 'railway',
        address: 'St John Street, Launceston, TAS 7250',
        hours: '7:00 AM - 7:00 PM',
        coordinates: { lat: -41.4369, lng: 147.1394 }
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
