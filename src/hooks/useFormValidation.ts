import { useState, useCallback } from 'react';

export interface ValidationRule {
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    min?: number | Date;
    max?: number | Date;
    custom?: (value: any) => string | null;
}

export interface FieldValidation {
    value: any;
    error: string | null;
    touched: boolean;
    isValid: boolean;
}

export interface FormValidation {
    [key: string]: FieldValidation;
}

export const useFormValidation = (initialValues: Record<string, any>) => {
    const [fields, setFields] = useState<FormValidation>(() => {
        const initial: FormValidation = {};
        Object.keys(initialValues).forEach(key => {
            initial[key] = {
                value: initialValues[key],
                error: null,
                touched: false,
                isValid: false
            };
        });
        return initial;
    });

    const validateField = useCallback((
        name: string,
        value: any,
        rules?: ValidationRule
    ): string | null => {
        if (!rules) return null;

        // Required validation
        if (rules.required && (!value || value === '')) {
            return 'This field is required';
        }

        // Skip other validations if value is empty and not required
        if (!value && !rules.required) return null;

        // Pattern validation
        if (rules.pattern && !rules.pattern.test(String(value))) {
            return 'Invalid format';
        }

        // Min length validation
        if (rules.minLength && String(value).length < rules.minLength) {
            return `Minimum length is ${rules.minLength} characters`;
        }

        // Max length validation
        if (rules.maxLength && String(value).length > rules.maxLength) {
            return `Maximum length is ${rules.maxLength} characters`;
        }

        // Min value validation (for numbers and dates)
        if (rules.min !== undefined) {
            if (value instanceof Date && rules.min instanceof Date) {
                if (value < rules.min) {
                    return 'Date is too early';
                }
            } else if (typeof value === 'number' && typeof rules.min === 'number') {
                if (value < rules.min) {
                    return `Minimum value is ${rules.min}`;
                }
            }
        }

        // Max value validation
        if (rules.max !== undefined) {
            if (value instanceof Date && rules.max instanceof Date) {
                if (value > rules.max) {
                    return 'Date is too late';
                }
            } else if (typeof value === 'number' && typeof rules.max === 'number') {
                if (value > rules.max) {
                    return `Maximum value is ${rules.max}`;
                }
            }
        }

        // Custom validation
        if (rules.custom) {
            return rules.custom(value);
        }

        return null;
    }, []);

    const updateField = useCallback((name: string, value: any, rules?: ValidationRule) => {
        const error = validateField(name, value, rules);
        setFields(prev => ({
            ...prev,
            [name]: {
                value,
                error,
                touched: true,
                isValid: error === null
            }
        }));
    }, [validateField]);

    const touchField = useCallback((name: string) => {
        setFields(prev => ({
            ...prev,
            [name]: {
                ...prev[name],
                touched: true
            }
        }));
    }, []);

    const resetForm = useCallback((newValues?: Record<string, any>) => {
        const values = newValues || initialValues;
        const reset: FormValidation = {};
        Object.keys(values).forEach(key => {
            reset[key] = {
                value: values[key],
                error: null,
                touched: false,
                isValid: false
            };
        });
        setFields(reset);
    }, [initialValues]);

    const isFormValid = useCallback((): boolean => {
        return Object.values(fields).every(field => field.isValid || !field.touched);
    }, [fields]);

    const getValues = useCallback((): Record<string, any> => {
        const values: Record<string, any> = {};
        Object.keys(fields).forEach(key => {
            values[key] = fields[key].value;
        });
        return values;
    }, [fields]);

    return {
        fields,
        updateField,
        touchField,
        resetForm,
        isFormValid,
        getValues,
        validateField
    };
};

// Common validation rules
export const validationRules = {
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: {
        required: true,
        pattern: /^[\d\s\-\+\(\)]+$/,
        minLength: 10,
    },
    required: {
        required: true,
    },
    futureDate: (minDate?: Date) => ({
        required: true,
        custom: (value: Date) => {
            const compareDate = minDate || new Date();
            if (value < compareDate) {
                return 'Date cannot be in the past';
            }
            return null;
        }
    }),
    afterDate: (afterDate: Date) => ({
        required: true,
        custom: (value: Date) => {
            if (value <= afterDate) {
                return 'Must be after the pickup date';
            }
            return null;
        }
    })
};
