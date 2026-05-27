import { Component } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'table-menu',
  imports: [
    MatMenuTrigger,
    MatIconButton,
    MatIcon,
    MatMenu,
  ],
  template: `
    <button matIconButton [matMenuTriggerFor]="menu">
      <mat-icon>more_vert</mat-icon>
    </button>
    <mat-menu #menu="matMenu">
      <ng-content></ng-content>
    </mat-menu>
  `,
  styles: ``,
})
export class TableMenuComponent {

}
