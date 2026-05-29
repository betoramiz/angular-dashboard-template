import { Component, inject, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormValueType } from '../../models/form-models';

@Component({
  selector: 'simple-form',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
    MatError
  ],
  templateUrl: './simple-form.html',
  styleUrl: './simple-form.css',
})
export class SimpleForm {
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

  private buildForm() {
    return this.form.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
