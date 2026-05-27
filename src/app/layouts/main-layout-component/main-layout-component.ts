import { Component } from '@angular/core';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

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
    RouterLink,
    RouterOutlet,
    RouterLinkActive
  ],
  templateUrl: './main-layout-component.html',
  styleUrl: './main-layout-component.css',
})
export default class MainLayoutComponent {

}
