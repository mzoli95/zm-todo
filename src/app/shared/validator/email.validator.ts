import { AbstractControl } from '@angular/forms';

export function zmEmailValidator(control: AbstractControl) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(control.value)) {
    return { invalidEmail: true };
  }
  return null;
}
