import { Component } from '@angular/core';
import { PageBody, PageContent, PageHeader } from '@shared/components/layout';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-buttons',
  imports: [
    PageContent,
    PageHeader,
    PageBody,
    MatButton
  ],
  templateUrl: './buttons.html',
  styleUrl: './buttons.css',
})
export default class Buttons {

}
