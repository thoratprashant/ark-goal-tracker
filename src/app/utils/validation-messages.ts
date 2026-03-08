import { regex } from "./regex-patterns";

export const validationMessages = {
  required: (fieldName: string) => `Please enter ${fieldName}.`,
  otpExpire:(time: any) => `Expires in ${time} seconds.`,
};

export const Messages = {
  AUTH: {
    USERNAME_REQUIRED: "Email or mobile number is required.",
    USERNAME_INVALID: "Enter a valid email or mobile number",
    INVALID_EMAIL:"Please enter a valid email address.",
    INVALID_MOBILE:"Please enter a valid mobile number.",
    USER_NOT_FOUND: 'User not found',
    USER_FOUND: "Account found",
    LOGIN_SUCCESS:"Login Successful.",

    OTP_REQUIRED: "OTP is required",
    OTP_INVALID: "Incorrect OTP. Please re-enter.",
    OTP_LENGTH: "OTP must be exactly 6 digits",
    OTP_EXPIRED: "OTP expired. Please click 'Resend OTP'.", 
    OTP_FAILED: "Failed to send OTP. Please try again.",
    OTP_SENT: "OTP sent successfully.",
    OTP_SUCCESS: "OTP verified successfully.",
    OTP_VERIFY_FAILED: "OTP verification failed. Please try again.",
    OTP_VERIFY_EXPIRED: "OTP verification session has expired. Please request a new OTP.",
    OTP_VERIFY_INVALID: "The provided OTP is invalid.",
    OTP_VERIFY_REQUIRED: "OTP are required for verification.",  
    OTP_VERIFY_SUCCESS: "OTP verified successfully.",

    SESSION_EXPIRED: "Session has expired. Please login again.",

    
  },
  PASSWORD_RULES:{
    PASSWORD_MIN_LENGTH: `At least ${regex.PASSWORD_RULES.MIN_LENGTH_PASSWORD} characters`,
    UPPERCASE_PASSWORD: "One uppercase letter",
    LOWERCASE_PASSWORD: "One lowercase letter",
    NUMBER_PASSWORD: "One number",
    SPECIAL_PASSWORD: "One special character",
    PASSWORD_INVALID: "Incorrect password."
  }
  
};