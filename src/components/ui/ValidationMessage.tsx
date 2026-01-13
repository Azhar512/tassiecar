import React from 'react';
import { cn } from '@/lib/utils';

interface ValidationMessageProps {
    error?: string | null;
    touched?: boolean;
    className?: string;
}

export const ValidationMessage: React.FC<ValidationMessageProps> = ({
    error,
    touched,
    className
}) => {
    if (!touched || !error) return null;

    return (
        <p className={cn('text-sm text-destructive mt-1 animate-fade-in', className)}>
            {error}
        </p>
    );
};

interface FieldWrapperProps {
    children: React.ReactNode;
    label: string;
    error?: string | null;
    touched?: boolean;
    required?: boolean;
    isValid?: boolean;
    className?: string;
}

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
    children,
    label,
    error,
    touched,
    required,
    isValid,
    className
}) => {
    return (
        <div className={className}>
            <label className="block text-sm font-medium text-foreground mb-2">
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
                {touched && isValid && (
                    <span className="ml-2 text-secondary">✓</span>
                )}
            </label>
            {children}
            <ValidationMessage error={error} touched={touched} />
        </div>
    );
};
