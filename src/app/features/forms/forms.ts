import { Component, effect, inject, signal } from '@angular/core';
import { PageBody, PageContent, PageHeader } from '@shared/components/layout';
import { SimpleForm } from './components/simple-form/simple-form';
import { BackendDto, FormValueType } from './models/form-models';
import { toBackendDto } from './models/mappers';
import { JsonPipe } from '@angular/common';
import { FormFacade } from './form-facade';
import { ModalService } from '@shared/services/modal-service';

@Component({
  selector: 'app-forms',
  imports: [
    PageContent,
    PageHeader,
    PageBody,
    SimpleForm,
    JsonPipe
  ],
  providers: [FormFacade],
  templateUrl: './forms.html',
  styleUrl: './forms.css',
})
export default class Forms {

  private readonly formFacade: FormFacade = inject(FormFacade);
  private readonly modalService = inject(ModalService);

  backendDto = signal<BackendDto|null>(null);
  backendVerboseDto = signal<BackendDto|null>(null);

  actionStatus = this.formFacade.actionStatus.asReadonly();
  errorMessage = this.formFacade.errorMessage.asReadonly();

  constructor() {
    effect(() => {
      const status = this.actionStatus();

      if (status === 'error') {
        this.modalService.showErrorModal(this.errorMessage());
        this.formFacade.clearStatus();
      } else if (status === 'success') {
        this.formFacade.clearStatus();
      }
    });
  }

  protected onSubmitSimpleForm(data: FormValueType): void {
    this.backendDto.set(toBackendDto(data));

    this.formFacade.createAndRefresh('test');
  }

  protected onSubmitVerboseForm(data: FormValueType): void {
    this.backendVerboseDto.set(toBackendDto(data));
  }
}
