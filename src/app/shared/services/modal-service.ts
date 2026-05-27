import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { ConfirmationComponent } from '@shared/components/dialgos/confirmation-component';
import { YesNoComponent } from '@shared/components/dialgos/yes-no-component';
import { ErrorComponent } from '@shared/components/dialgos/error-component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {

  private readonly dialog = inject(MatDialog);

  simpleConfirmationDialog(title: string, detail: string): void {
    this.dialog.open(ConfirmationComponent, {
      data: {
        title: title,
        body: detail
      },
      hasBackdrop: true,
      disableClose: true
    });
  }

  showErrorModal(detail: string): void {
    this.dialog.open(ErrorComponent, {
      data: {
        title: 'Error al procesar la solicutud',
        body: detail
      },
      hasBackdrop: true,
      disableClose: true
    });
  }

  showSimpleYesNoModal(title: string, detail: string): Observable<boolean> {
    const dialogRef = this.dialog.open(YesNoComponent, {
      data: { title, body: detail },
      hasBackdrop: true, disableClose: true
    });

    return dialogRef.afterClosed().pipe(map(result => result === true));
  }
}
