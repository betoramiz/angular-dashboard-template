import { Component } from '@angular/core';

@Component({
  selector: 'page-body',
  imports: [],
  template: `
    <div class="mt-5">
      <ng-content></ng-content>
    </div>
  `,
  styles: ``,
})
export class PageBody {

}
