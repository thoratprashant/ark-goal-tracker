import { Injectable } from '@angular/core';
import { regex } from '../../utils/regex-patterns';

@Injectable({ providedIn: 'root' })
export class IdentifierEngineService {

  private readonly PHONE_ALLOWED = regex.PHONE_ALLOWED;
  private readonly EMAIL_TRIGGER = regex.EMAIL_TRIGGER;

  getMode(value: string): 'email' | 'phone' {
    if (!value) return 'email';
    return this.EMAIL_TRIGGER.test(value) ? 'email' : 'phone';
  }
  
  /** Clean user input */
  normalize(value: string, mode: 'email' | 'phone'): string {
    if (!value) return value;

    if (mode === 'email') {
      return value.trim();
    }

    // phone: only digits
    return value.replace(/\D/g, '');
  }
}
