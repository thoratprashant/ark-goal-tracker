export const regex = {
    userName: /^(\d{10}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MOBILE: /^\d{10}$/,
    OTP:/^\d{6}$/,

    // this is username - login with email or mobile validation
    PHONE_ALLOWED: /^[0-9+ ]+$/,
    EMAIL_TRIGGER: /[a-zA-Z@._-]/,

    PASSWORD_RULES:{
        MIN_LENGTH_PASSWORD: 8,
        UPPERCASE_PASSWORD: /(?=.*[A-Z])/,
        LOWERCASE_PASSWORD: /(?=.*[a-z])/,
        NUMBER_PASSWORD: /(?=.*\d)/,
        SPECIAL_PASSWORD: /(?=.*[^A-Za-z0-9])/,
        STRONG_PASSWORD:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
    }
    
};