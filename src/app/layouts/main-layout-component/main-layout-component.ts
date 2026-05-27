import { Component } from '@angular/core';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { NgOptimizedImage } from '@angular/common';
import { SomeForm } from '../../some-form/some-form';

@Component({
  selector: 'main-layout',
  imports: [
    MatListItem,
    MatNavList,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatToolbar,
    NgOptimizedImage,
    SomeForm
  ],
  templateUrl: './main-layout-component.html',
  styleUrl: './main-layout-component.css',
})
export default class MainLayoutComponent {

}
