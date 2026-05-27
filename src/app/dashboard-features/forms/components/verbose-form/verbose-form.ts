import { Component, inject, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormValueGroup, FormValueType } from '../../models/form-models';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'verbose-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatButton
  ],
  templateUrl: './verbose-form.html',
  styleUrl: './verbose-form.css',
})
export class VerboseForm {

  private readonly form: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  protected readonly formGroup = this.buildForm();
  onSubmit = output<FormValueType>();

  protected onSave() {
    if (this.formGroup.invalid) {
      return;
    }

    this.onSubmit.emit(this.formGroup.getRawValue());
  }

  protected onCancel() {
    this.formGroup.reset();
  }

  private buildForm(): FormValueGroup {
    return this.form.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
