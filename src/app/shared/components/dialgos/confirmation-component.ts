import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';


export interface SimpleConfirmationData {
  title: string;
  body: string;
}
@Component({
  selector: 'app-simple-confirmation',
  imports: [
    MatButton,
    MatDialogClose,
    MatIcon
  ],
  template: `
    <div class="relative w-full max-w-[440px] overflow-hidden">
      <div class="flex flex-col items-center px-8 pt-10 pb-6 text-center">
        <div class="relative mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-gren-800">
          <mat-icon class="material-symbols-outlined text-[32px]">check</mat-icon>
        </div>
        <h3 class="text-xl font-bold leading-tight text-gray-900">
          {{ data.title }}
        </h3>
        <p class="text-[15px] leading-relaxed text-gray-600">
          {{ data.body }}
        </p>
      </div>
      <div class="bg-gray-50 px-8 py-5 flex justify-center border-t border-gray-100">
        <button matButton="filled" class="success-dark w-full" mat-dialog-close> Entendido </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class ConfirmationComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmationComponent>);
  readonly data = inject<SimpleConfirmationData>(MAT_DIALOG_DATA);
}
