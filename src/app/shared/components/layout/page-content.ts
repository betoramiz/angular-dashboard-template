import { Component } from '@angular/core';

@Component({
  selector: 'page-content',
  imports: [],
  template: `
    <div class="m-4">
      <ng-content></ng-content>
    </div>
  `,
  styles: ``,
})
export class PageContent {

}
