import { Component, signal } from '@angular/core';
import { PageBody, PageContent, PageHeader } from '@shared/components/layout';
import { SimpleForm } from './components/simple-form/simple-form';
import { BackendDto, FormValueType } from './models/form-models';
import { toBackendDto } from './models/mappers';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-forms',
  imports: [
    PageContent,
    PageHeader,
    PageBody,
    SimpleForm,
    JsonPipe
  ],
  templateUrl: './forms.html',
  styleUrl: './forms.css',
})
export default class Forms {

  backendDto = signal<BackendDto|null>(null);

  protected onSubmitSimpleForm(data: FormValueType): void {
    this.backendDto.set(toBackendDto(data));
  }
}
