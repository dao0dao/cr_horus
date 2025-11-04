import { AbstractControl } from "@angular/forms";

export const futureDateValidator = (control: AbstractControl) => {
  const selectedDate = new Date(control.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (control.value && selectedDate < today) {
    return { pastDate: true };
  }
  return null;
};
