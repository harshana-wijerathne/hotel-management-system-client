import {Component} from '@angular/core';
import {CustomerService} from '../../service/customer.service';
import {ToastService} from '../../../../auth/components/services/toast/toast.service';

@Component({
  selector: 'app-view-bookings',
  standalone: false,
  template: `
    <div class="">
      <h1>Reservations</h1>
      <table class="table table-hover">
        <thead>
        <tr>
          <th>Room Name</th>
          <th>Room Type</th>
          <th>Check In Date</th>
          <th>Check Out Date</th>
          <th>Price</th>
          <th>Username</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
          @for(booking of bookings; track booking.id){
            <tr>
              <td>{{booking.roomName}}</td>
              <td>{{booking.roomType}}</td>
              <td>{{booking.checkInDate}}</td>
              <td>{{booking.checkOutDate}}</td>
              <td>{{booking.price}}</td>
              <td>{{booking.userName}}</td>
              <td>
                <div class="d-flex align-items-center bg-info py-1 px-2 rounded-1" *ngIf="booking.status === 'PENDING'">
                  <div class="loader"></div>
                  <div class="ps-2">Pending</div>
                </div>
                <div class="d-flex bg-success py-1 px-2 rounded-1" *ngIf="booking.status === 'APPROVED'">
                  <i class="bi bi-check-circle-fill text-white pe-2"></i>
                  <div>Approved</div>
                </div>
                <div class="d-flex bg-danger  py-1 px-2 rounded-1" *ngIf="booking.status === 'REJECTED'">
                  <i class="bi bi-x-circle-fill text-white pe-2"></i>
                  <div>Rejected</div>
                </div>
              </td>
            </tr>
          }
        </tbody>
      </table>
      <nav class="pt-5 bottom-50 end-0" aria-label="...">
        <ul class="pagination">
          <li class="page-item" [class.disabled]="currentPage === 1">
            <a class="page-link" (click)="goToPage(currentPage - 1)">Previous</a>
          </li>

          @for (page of visiblePages; track page) {
            <li class="page-item" [class.active]="page === currentPage">
              <a class="page-link" (click)="goToPage(page)">{{page}}</a>
            </li>
          }

          <li class="page-item" [class.disabled]="currentPage === totalPages">
            <a class="page-link" (click)="goToPage(currentPage + 1)">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  `,
  styleUrl: './view-bookings.component.css'
})
export class ViewBookingsComponent {
  currentPage: number = 1;
  totalPages: number = 1;
  bookings: any[] = [];
  visiblePages: number[] = [];

  constructor(
    private customerService: CustomerService,
    private toastService: ToastService
  ) {
    this.getBookings();
  }

  getBookings() {
    this.customerService.getMyBookings(this.currentPage - 1).subscribe({
      next: (res) => {
        this.bookings = res.reservationDtoList || [];
        this.totalPages = res.totalPages || 1;
        this.updateVisiblePages();
      },
      error: (error) => {
        this.toastService.show(`${error.error}`, "error");
      }
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.getBookings();
    }
  }

  updateVisiblePages() {
    this.visiblePages = [];
    const maxVisiblePages = 5; // You can adjust this number

    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    // Adjust if we're at the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      this.visiblePages.push(i);
    }
  }
}
