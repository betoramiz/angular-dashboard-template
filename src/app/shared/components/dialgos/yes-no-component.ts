import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

export interface SimpleYesNoData {
  title: string;
  body: string;
}

@Component({
  selector: 'app-simple-yes-no-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      {{ data.body }}
    </mat-dialog-content>
    <mat-dialog-actions>
      <button matButton="text" (click)="onNoClick()">No</button>
      <button matButton="filled" class="success" [mat-dialog-close]="true" cdkFocusInitial >Si</button>
    </mat-dialog-actions>

  `,
  styles: ``,
})
export class YesNoComponent {

  readonly dialogRef = inject(MatDialogRef<YesNoComponent>);
  readonly data = inject<SimpleYesNoData>(MAT_DIALOG_DATA);

  protected onNoClick() {
    this.dialogRef.close();
  }
}
