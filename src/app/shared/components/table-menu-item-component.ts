import { Component, input, output } from '@angular/core';
import { MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'table-menu-item',
  imports: [
    MatMenuItem,
    MatIcon
  ],
  template: `
    <button mat-menu-item (click)="selectedOption()">
      <mat-icon>{{ menuIcon() }}</mat-icon>
      <span>{{ menuText() }}</span>
    </button>
  `,
  styles: ``,
})
export class MenuItemComponent {

  menuIcon = input<string>();
  menuText = input<string>('');
  onSelectedOption = output();

  selectedOption(): void {
    this.onSelectedOption.emit();
  }
}
