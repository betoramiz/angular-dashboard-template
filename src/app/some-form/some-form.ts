import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';


// export interface SomeFormModel {
//   name: FormControl<string>;
// }
//
// export type SomeFormGroup = FormGroup<SomeFormModel>;

// Interfaz que sigue siendo parte del UI
export interface SomeFormDto {
  name: string;
}

@Component({
  selector: 'some-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton
  ],
  templateUrl: './some-form.html',
  styleUrl: './some-form.css'
})
export class SomeForm {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  protected readonly form = this.buildForm();

  onSubmitEvent = output<SomeFormDto>();

  protected onSubmit() {
   if (this.form.invalid) {
     return;
   }

   this.onSubmitEvent.emit(this.form.getRawValue());
  }

  protected onCancel(): void {
    this.form.reset();
  }

  private buildForm() {
    return this.formBuilder.group({
      name: this.formBuilder.control('', Validators.required)
    })
  }
}
