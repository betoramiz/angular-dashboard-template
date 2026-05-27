import { Component } from '@angular/core';
import { PageBody, PageContent, PageHeader } from '@shared/components/layout';

@Component({
  selector: 'app-forms',
  imports: [
    PageContent,
    PageHeader,
    PageBody
  ],
  templateUrl: './forms.html',
  styleUrl: './forms.css',
})
export default class Forms {

}
