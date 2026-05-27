import { Component, signal } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';
import { NgOptimizedImage } from '@angular/common';
import { SomeForm, SomeFormDto } from './some-form/some-form';

@Component({
  selector: 'app-root',
  imports: [MatSidenavContainer, MatSidenav, MatSidenavContent, MatNavList, MatListItem, MatToolbar, NgOptimizedImage, SomeForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('dashboard');
  protected readonly open = open;

  onSubmitForm(data: SomeFormDto) {
    console.log(data);
  }
}
