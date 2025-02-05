import siteConfig from "../config/site-config";

// Regular expression for email validation
export const emailRegex = /^(?!.*\.{2})(?!.*@.*@)[a-zA-Z0-9.@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;

// Regular expression for password validation
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Regular expression for phone number validation
export const phoneRegex = /^\d{10}$/;

// Regular expression for name validation
export const nameRegex = /^[a-zA-Z\s]+$/;

// Regular expression for username validation
export const usernameRegex = /^[a-zA-Z0-9]+$/;

// Regular expression for alphanumeric validation
export const alphanumericRegex = /^[a-zA-Z0-9\s]+$/;

// Regular expression for number validation
export const numberRegex = /^[0-9]+$/;

// Regular expression for decimal number validation
export const decimalRegex = /^\d+(\.\d{1,2})?$/;

// Regular expression for URL validation
export const urlRegex = /^(http|https):\/\/[^ "]+$/;

// Regular expression for IP address validation
export const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

// Regular expression for hex color validation
export const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

// Regular expression for date validation
export const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// Regular expression for time validation
export const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

// Regular expression for date and time validation
export const dateTimeRegex = /^\d{4}-\d{2}-\d{2} ([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

export const webSiteTitle = (title: string) => {
    document.title = title ? `${title} | ${siteConfig.company_name}` : "YourWebsiteName";
};
