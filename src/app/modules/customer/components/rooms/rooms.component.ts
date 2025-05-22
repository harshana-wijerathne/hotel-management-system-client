import {Component, input} from '@angular/core';
import {ToastService} from '../../../../auth/components/services/toast/toast.service';
import {ActivatedRoute} from '@angular/router';
import {CustomerService} from '../../service/customer.service';
import {UserStorageService} from '../../../../auth/components/services/storage/user-storage.service';

@Component({
  selector: 'app-rooms',
  standalone: false,
  template: `
    <button class="btn btn-primary mb-5" routerLink="/admin/room">Post Room</button>
    <div class="room-container d-flex gap-5 flex-wrap overflow-y-auto border justify-content-center"
         style="max-height: 700px; min-height: 700px; box-shadow:1px 1px 5px 4px black">
      @for (room of rooms; track room.name) {
        <div class="card" style="width: 18rem; height: 15rem">
          <div class="card-body" (click)="getId(room.id , room.price)">
            <h5 class="card-title">{{ room.name }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ room.type }}</h6>
            <div class="card-img border py-5">
              <!--Some quick example text to build on the card title and make up the bulk of the card's content.--></div>
            <div class="mt-2 d-flex justify-content-between">
              <h5 href="#" class="card-link d-inline">{{ room.price }} USD</h5>
              <i title="Booking" id="modelButton" class="bi bi-check-square text-primary ms-5" data-bs-toggle="modal"
                 data-bs-target="#staticBackdrop" >
              </i>
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
            <a class="page-link" (click)="goToPage(page)">{{ page }}</a>
          </li>
        }

        <li class="page-item" [class.disabled]="currentPage === total">
          <a class="page-link" (click)="goToPage(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>

    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-labelledby="staticBackdropLabel" aria-hidden="true">>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Book Room</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body d-flex justify-content-between">
            <span>
             <div>Start Date</div>
            <input  [(ngModel)]="checkInDate"  type="date" placeholder="Start Date">
            </span><span>
             <div>End Date</div>
            <input  [(ngModel)]="checkOutDate"  type="date" placeholder="Start Date">
            </span>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button (click)="handleMiddle(id)" type="button" data-bs-dismiss="modal" class="btn btn-primary">Book</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {

  currentPage = 1;
  rooms: any[] = [];
  total = 0;
  visiblePages: number[] = [];
  id: number;

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

  isVisibleModal = false;
  date: Date[] = [];
  checkInDate: string;
  checkOutDate: string;
  price:number;


  handleMiddle(id ): void {
    console.log("working")
    const obj = {
      userId: UserStorageService.getUserId(),
      roomId: this.id,
      price: this.price,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
    };


    if(this.checkInDate === this.checkOutDate) {
      alert("Start Date and End Date Can not be Same");
      return;
    }
    console.log('Booking object:', obj);

    this.customerService.bookRoom(obj).subscribe(res => {
      this.toastService.show("Request Submitted for approval","success")
    },error => {
      this.toastService.show("Something Went Wrong","error")
    })

  }



  getId(id,price) {
    this.id = id;
    this.price = price;

  }
}
