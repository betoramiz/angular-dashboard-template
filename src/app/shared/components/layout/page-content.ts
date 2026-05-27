import { Component } from '@angular/core';

@Component({
  selector: 'page-content',
  imports: [],
  template: `
    <div class="page-container">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    .page-container {
      margin: 12px 32px;
    }
  `,
})
export class PageContent {

}
