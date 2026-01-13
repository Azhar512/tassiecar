import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DateTimePickerProps {
    selected: Date | null;
    onChange: (date: Date | null) => void;
    placeholder?: string;
    minDate?: Date;
    maxDate?: Date;
    showTimeSelect?: boolean;
    timeIntervals?: number;
    dateFormat?: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
    selected,
    onChange,
    placeholder = 'Select date',
    minDate,
    maxDate,
    showTimeSelect = false,
    timeIntervals = 30,
    dateFormat = showTimeSelect ? 'dd/MM/yyyy h:mm aa' : 'dd/MM/yyyy',
    className,
    disabled,
    required
}) => {
    return (
        <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none z-10" />
            <DatePicker
                selected={selected}
                onChange={onChange}
                minDate={minDate}
                maxDate={maxDate}
                showTimeSelect={showTimeSelect}
                timeIntervals={timeIntervals}
                dateFormat={dateFormat}
                placeholderText={placeholder}
                disabled={disabled}
                required={required}
                className={cn(
                    'w-full pl-10 pr-4 py-3 rounded-xl border-2 border-border bg-background text-foreground',
                    'transition-all hover:border-secondary/50 focus:outline-none focus:ring-2 focus:ring-secondary',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    className
                )}
                calendarClassName="bg-card border-2 border-border rounded-xl shadow-xl"
                wrapperClassName="w-full"
                popperClassName="z-50"
                popperPlacement="bottom-start"
                showPopperArrow={false}
            />
        </div>
    );
};

// Separate component for time-only picker
interface TimePickerProps {
    selected: Date | null;
    onChange: (date: Date | null) => void;
    placeholder?: string;
    minTime?: Date;
    maxTime?: Date;
    timeIntervals?: number;
    className?: string;
    disabled?: boolean;
    required?: boolean;
}

export const TimePicker: React.FC<TimePickerProps> = ({
    selected,
    onChange,
    placeholder = 'Select time',
    minTime,
    maxTime,
    timeIntervals = 30,
    className,
    disabled,
    required
}) => {
    return (
        <div className="relative">
            <DatePicker
                selected={selected}
                onChange={onChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={timeIntervals}
                minTime={minTime}
                maxTime={maxTime}
                dateFormat="h:mm aa"
                placeholderText={placeholder}
                disabled={disabled}
                required={required}
                className={cn(
                    'w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground',
                    'transition-all hover:border-secondary/50 focus:outline-none focus:ring-2 focus:ring-secondary',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    className
                )}
                calendarClassName="bg-card border-2 border-border rounded-xl shadow-xl"
                wrapperClassName="w-full"
                popperClassName="z-50"
                popperPlacement="bottom-start"
                showPopperArrow={false}
            />
        </div>
    );
};
