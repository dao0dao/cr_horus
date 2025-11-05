import { AbstractControl } from '@angular/forms';

export const futureDateValidator = (control: AbstractControl) => {
  if (!control.value) {
    return null;
  }
  const selectedDate = new Date(control.value);
  selectedDate.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selectedDate.getTime() < today.getTime()) {
    return { pastDate: true };
  }
  return null;
};
