import { Component } from '@angular/core';

@Component({
  selector: 'page-header',
  imports: [],
  template: `
    <div class="mb-3 flex text-3xl">
      <ng-content></ng-content>
    </div>
  `,
  styles: ``,
})
export class PageHeader {

}
