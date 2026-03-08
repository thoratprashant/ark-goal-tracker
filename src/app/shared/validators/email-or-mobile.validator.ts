import { regex } from '../../utils/regex-patterns';
import { Messages } from '../../utils/validation-messages';

/**
 * Validator for fields that accept Email OR Mobile Number
 * Used by Login, Signup, Invite, etc
 */
export function emailOrMobileValidator() {
  return (control: any) => {

    const value = control.value;

    // Required validation
    if (!value) {
      return { message: Messages.AUTH.USERNAME_REQUIRED };
    }

    // If input contains letters or @ . _ - → Email mode
    const isEmailMode = regex.EMAIL_TRIGGER.test(value);

    // EMAIL MODE
    if (isEmailMode) {
      return regex.EMAIL.test(value)
        ? null
        : { message: Messages.AUTH.INVALID_EMAIL };
    }

    
      return regex.MOBILE.test(value)
        ? null
        : { message: Messages.AUTH.INVALID_MOBILE };
   
  };
}
