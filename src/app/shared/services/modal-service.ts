import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '@shared-component/error-modal-component';
import { SimpleYesNoDialog } from '@shared-component/simple-yes-no-dialog';
import { map, Observable } from 'rxjs';
import { SimpleConfirmation } from '@shared-component/simple-confirmation';

@Injectable({
  providedIn: 'root',
})
export class ModalService {

  private readonly dialog = inject(MatDialog);

  simpleConfirmationDialog(title: string, detail: string): void {
    this.dialog.open(SimpleConfirmation, {
      data: {
        title: title,
        body: detail
      },
      hasBackdrop: true,
      disableClose: true
    });
  }

  showErrorModal(detail: string): void {
    this.dialog.open(ErrorModalComponent, {
      data: {
        title: 'Error al procesar la solicutud',
        body: detail
      },
      hasBackdrop: true,
      disableClose: true
    });
  }

  showSimpleYesNoModal(title: string, detail: string): Observable<boolean> {
    const dialogRef = this.dialog.open(SimpleYesNoDialog, {
      data: { title, body: detail },
      hasBackdrop: true, disableClose: true
    });

    return dialogRef.afterClosed().pipe(map(result => result === true));
  }
}
