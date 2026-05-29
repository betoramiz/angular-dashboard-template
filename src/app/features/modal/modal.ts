import { Component, inject } from '@angular/core';
import { PageBody, PageContent, PageHeader } from '@shared/components/layout';
import { ModalService } from '@shared/services/modal-service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-modal',
  imports: [
    PageContent,
    PageHeader,
    PageBody,
    MatButton
  ],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export default class Modal {

  private readonly modalService: ModalService = inject(ModalService);

  protected openModal(): void {
    this.modalService.simpleConfirmationDialog('Confirmacion de algo', 'Texto de la confirmacion');
  }

  protected openYesNoModal(): void {
    this.modalService.showSimpleYesNoModal('Confirmacion de algo', 'Texto de la confirmacion');
  }

  protected openErrorModal(): void {
    this.modalService.showErrorModal('Detalle del error');
  }
}
