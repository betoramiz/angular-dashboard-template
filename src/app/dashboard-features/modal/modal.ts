import { Component } from '@angular/core';
import { PageBody, PageContent, PageHeader } from '@shared/components/layout';

@Component({
  selector: 'app-modal',
  imports: [
    PageContent,
    PageHeader,
    PageBody
  ],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export default class Modal {

}
