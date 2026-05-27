import { FormControl, FormGroup } from '@angular/forms';

export interface FormValueType {
  name: string;
  email: string;
}


export interface FormValueControls {
  name: FormControl<string>;
  email: FormControl<string>;
}

export type FormValueGroup = FormGroup<FormValueControls>;

export interface BackendDto {
  id?: number;
  name: string;
  email: string;
}
