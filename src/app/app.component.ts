import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { NgIf } from '@angular/common';
import { UserStorageService } from './auth/components/services/storage/user-storage.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="d-flex main">
      <!-- Toast container -->
      <div
        id="toast-container"
        class="toast-container position-fixed top-0 start-50 translate-middle-x p-3 z-3"
      ></div>

      <!-- ---------------------------------------------------------------------------------------------- -->

      <div
        class="sidebar"
        [class.collapsed]="isCollapsed"
        *ngIf="!isAdminLoggedIn && !isCustomerLoggedIn"
      >
        <div class="logo"></div>
        <ul class="nav flex-column">
          <li class="nav-item">
            <a
              class="nav-link"
              routerLink="/register"
              routerLinkActive="active-link"
            >
              <i class="bi-person">
                <span class="ps-3" *ngIf="!isCollapsed">Register</span></i
              >
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              routerLink="/login"
              routerLinkActive="active-link"
            >
              <i class="bi-power">
                <span class="ps-3" *ngIf="!isCollapsed">Login</span></i
              >
            </a>
          </li>
        </ul>
        <button class="btn btn-toggle text-white" (click)="toggleCollapse()">
          {{ isCollapsed ? '>' : '<' }}
        </button>
      </div>

      <!-- -------------------------------------------------------------------------------------------- -->

      <div
        class="sidebar"
        [class.collapsed]="isCollapsed"
        *ngIf="isAdminLoggedIn"
      >
        <div class="logo"></div>
        <ul class="nav flex-column">
          <li class="nav-item">
            <a
              class="nav-link"
              routerLink="/admin/rooms"
              routerLinkActive="active-link"
            >
              <i class="bi-person">
                <span class="ps-3" *ngIf="!isCollapsed">Rooms</span></i
              >
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              routerLink="/admin/reservations"
              routerLinkActive="active-link"
            >
              <i class="bi-power">
                <span class="ps-3" *ngIf="!isCollapsed">Reservations</span></i
              >
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" (click)="logout()">
              <i class="bi-lock">
                <span class="ps-3" *ngIf="!isCollapsed">Logout</span></i
              >
            </a>
          </li>
        </ul>
        <button class="btn btn-toggle text-white" (click)="toggleCollapse()">
          {{ isCollapsed ? '>' : '<' }}
        </button>
      </div>

      <!-- ---------------------------------------------------------------------------------------------------------- -->
      <div
        class="sidebar"
        [class.collapsed]="isCollapsed"
        *ngIf="isCustomerLoggedIn"
      >
        <div class="logo"></div>
        <ul class="nav flex-column">
          <li class="nav-item">
            <a
              class="nav-link"
              routerLink="/customer/rooms"
              routerLinkActive="active-link"
            >
              <i class="bi-person">
                <span class="ps-3" *ngIf="!isCollapsed">Rooms</span></i
              >
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              routerLink="/customer/bookings"
              routerLinkActive="active-link"
            >
              <i class="bi-power">
                <span class="ps-3" *ngIf="!isCollapsed">Bookings</span></i
              >
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" (click)="logout()">
              <i class="bi-lock">
                <span class="ps-3" *ngIf="!isCollapsed">Logout</span></i
              >
            </a>
          </li>
        </ul>
        <button class="btn btn-toggle text-white" (click)="toggleCollapse()">
          {{ isCollapsed ? '>' : '<' }}
        </button>
      </div>

      <!-- ---------------------------------------------------------------------------------------------------------- -->
      <div
        class="content vh-100 text-white d-flex justify-content-center align-items-center w-100"
      >
        <router-outlet />
      </div>
    </div>
  `,
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  isCollapsed = false;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  isCustomerLoggedIn: boolean = UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
        this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
        this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
      }
    });
  }

  logout() {
    UserStorageService.signOut();
    this.router.navigateByUrl('/login');
  }
}
