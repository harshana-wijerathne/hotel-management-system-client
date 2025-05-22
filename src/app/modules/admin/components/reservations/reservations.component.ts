import { Component } from '@angular/core';
import {AdminService} from '../../service/admin.service';
import {ToastService} from '../../../../auth/components/services/toast/toast.service';

@Component({
  selector: 'app-reservations',
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
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        @for(reservation of reservations; track reservations.id){
            <tr>
              <td>{{reservation.roomName}}</td>
              <td>{{reservation.type}}</td>
              <td>{{reservation.checkInDate}}</td>
              <td>{{reservation.checkOutDate}}</td>
              <td>{{reservation.price}}</td>
              <td>{{reservation.userName}}</td>
              <td>{{reservation.status}}</td>
              <td>Action</td>
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

          <li class="page-item" [class.disabled]="currentPage === total">
            <a class="page-link" (click)="goToPage(currentPage + 1)">Next</a>
          </li>
        </ul>
      </nav>
      <
    </div>
  `,
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {

  currentPage:any = 1;
  total:any;
  reservations:any;
  private activatedRoute: any;

  constructor(private adminService:AdminService,
              private toastService:ToastService) {
    this.getReservations();

  }

  getReservations(){
    this.adminService.getReservations(this.currentPage-1).subscribe(res=>{
      console.log(res);
      this.reservations = res.reservationDtoList;
      this.total = res.totalPages*5;

    })
  }

  pageIndexChange(value:any){
    this.currentPage = value;
    this.getReservations();
  }
  visiblePages: number[] = [];
  id:number;


  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  getRooms() {
    this.adminService.getRooms(this.currentPage - 1).subscribe(res => {
      this.total = res.totalPages * 1;
      this.updateVisiblePages();
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.total && page !== this.currentPage) {
      this.currentPage = page;
      this.getRooms();
      this.updateVisiblePages();
    }
  }

  updateVisiblePages() {
    this.visiblePages = [];

    // Always show 3 pages if possible
    let startPage = Math.max(1, this.currentPage - 1);
    let endPage = Math.min(this.total, startPage + 2);

    // Adjust if we're at the end
    if (endPage - startPage < 2) {
      startPage = Math.max(1, endPage - 2);
    }

    for (let i = startPage; i <= endPage; i++) {
      this.visiblePages.push(i);
    }
  }


}
