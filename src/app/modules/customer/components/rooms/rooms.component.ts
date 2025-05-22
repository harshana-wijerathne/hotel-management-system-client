import { Component } from '@angular/core';
import {AdminService} from '../../../admin/service/admin.service';
import {ToastService} from '../../../../auth/components/services/toast/toast.service';
import {ActivatedRoute} from '@angular/router';
import {CustomerService} from '../../service/customer.service';

@Component({
  selector: 'app-rooms',
  standalone: false,
  template: `
    <button class="btn btn-primary mb-5" routerLink="/admin/room">Post Room</button>
    <div class="room-container d-flex gap-5 flex-wrap overflow-y-auto border justify-content-center" style="max-height: 700px; min-height: 700px; box-shadow:1px 1px 5px 4px black">
      @for (room of rooms; track room.name) {
        <div class="card" style="width: 18rem; height: 15rem">
          <div class="card-body">
            <h5 class="card-title">{{room.name}}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{room.type}}</h6>
            <div class="card-img border py-5"><!--Some quick example text to build on the card title and make up the bulk of the card's content.--></div>
            <div class="mt-2 d-flex justify-content-between">
              <h5 href="#" class="card-link d-inline">{{room.price}} USD</h5>
              <i title="Edit" class="bi bi-check-square text-primary ms-5"></i>
            </div>

          </div>
        </div>
      }
    </div>
    <nav class="pt-5" aria-label="...">
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
  `,
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {

  currentPage = 1;
  rooms: any[] = [];
  total = 0;
  visiblePages: number[] = [];
  id:number;

  constructor(
    private customerService: CustomerService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.getRooms();
  }


  getRooms() {
    this.customerService.getRooms(this.currentPage - 1).subscribe(res => {
      this.rooms = res.rooms;
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
