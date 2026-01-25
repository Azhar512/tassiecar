import React, { useState, useMemo } from 'react';
import { MapPin, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { locations, searchLocations, getCategoryIcon, getCategoryLabel, type Location } from '@/lib/locations';

interface LocationSelectProps {
    value: string;
    onChange: (locationId: string) => void;
    placeholder?: string;
    className?: string;
    required?: boolean;
    disabled?: boolean;
}

export const LocationSelect: React.FC<LocationSelectProps> = ({
    value,
    onChange,
    placeholder = 'Select location',
    className,
    required,
    disabled
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const selectedLocation = useMemo(
        () => locations.find(loc => loc.id === value),
        [value]
    );

    React.useEffect(() => {
        if (!value && locations.length === 1) {
            onChange(locations[0].id);
        }
    }, [value, onChange]);

    const filteredLocations = useMemo(
        () => searchLocations(searchQuery),
        [searchQuery]
    );

    const groupedLocations = useMemo(() => {
        const groups: Record<string, Location[]> = {
            airport: [],
            city: [],
            railway: []
        };

        filteredLocations.forEach(loc => {
            groups[loc.type].push(loc);
        });

        return groups;
    }, [filteredLocations]);

    const handleSelect = (locationId: string) => {
        onChange(locationId);
        setIsOpen(false);
        setSearchQuery('');
    };

    return (
        <div className="relative">
            {/* Selected Value Display */}
            <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none z-10" />
                <button
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    disabled={disabled}
                    className={cn(
                        'w-full pl-10 pr-10 py-3 rounded-xl border-2 border-border bg-background',
                        'text-left transition-all hover:border-secondary/50 focus:outline-none focus:ring-2 focus:ring-secondary',
                        disabled && 'opacity-50 cursor-not-allowed',
                        className
                    )}
                >
                    <span className={selectedLocation ? 'text-foreground' : 'text-muted-foreground'}>
                        {selectedLocation ? selectedLocation.name : placeholder}
                    </span>
                </button>
                <ChevronDown
                    className={cn(
                        'absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-transform pointer-events-none',
                        isOpen && 'rotate-180'
                    )}
                />
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown Content */}
                    <div className="absolute top-full left-0 right-0 mt-2 bg-card border-2 border-border rounded-xl shadow-xl z-50 max-h-96 overflow-hidden flex flex-col">
                        {/* Search Input */}
                        <div className="p-3 border-b border-border">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search locations..."
                                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        </div>

                        {/* Locations List */}
                        <div className="overflow-y-auto">
                            {Object.entries(groupedLocations).map(([type, locs]) => {
                                if (locs.length === 0) return null;

                                return (
                                    <div key={type} className="py-2">
                                        <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                                            <span>{getCategoryIcon(type as Location['type'])}</span>
                                            <span>{getCategoryLabel(type as Location['type'])}</span>
                                        </div>
                                        {locs.map(location => (
                                            <button
                                                key={location.id}
                                                type="button"
                                                onClick={() => handleSelect(location.id)}
                                                className={cn(
                                                    'w-full px-4 py-3 text-left hover:bg-secondary/10 transition-colors',
                                                    value === location.id && 'bg-secondary/20'
                                                )}
                                            >
                                                <div className="font-medium text-foreground flex items-center justify-between">
                                                    <span>{location.name}</span>
                                                    {location.twentyFourSeven && (
                                                        <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded">
                                                            24/7 Return
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-sm text-muted-foreground mt-1">
                                                    {location.address}
                                                </div>
                                                <div className="text-xs text-muted-foreground mt-1">
                                                    {location.hours}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                );
                            })}

                            {filteredLocations.length === 0 && (
                                <div className="px-4 py-8 text-center text-muted-foreground">
                                    No locations found
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
