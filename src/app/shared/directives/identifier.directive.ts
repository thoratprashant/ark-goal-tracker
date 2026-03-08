import { Directive, HostListener, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { LoginComponent } from '../../features/auth/login/login.component';
import { IdentifierEngineService } from '../services/identifier-engine.service';

@Directive({
  selector: '[userNameIdentifier]',
  standalone: true
})
export class UserNameIdentifierDirective {

  constructor(
    private engine: IdentifierEngineService,
    @Optional() private ngControl: NgControl,
    private login: LoginComponent
  ) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const raw = input.value;

    const mode = this.engine.getMode(raw);
    const clean = this.engine.normalize(raw, mode); 

    // Prevent infinite +1 loop
    if (input.value !== clean) {
        input.value = clean;
    }

    // IMPORTANT: Store ONLY clean digits in formControl
    if (this.ngControl?.control?.value !== clean) {
        this.ngControl?.control?.setValue(clean, { emitEvent: false });
    }

    this.ngControl?.control?.updateValueAndValidity({ onlySelf: true });
    
  }
}
