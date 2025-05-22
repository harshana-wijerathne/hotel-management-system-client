import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { ToastService } from '../../../../auth/components/services/toast/toast.service';
import {AdminService} from '../../service/admin.service';

@Component({
  selector: 'app-post-room',
  standalone: false,
  template: `
    <div class = "room-details-form-container bg-info p-4 rounded-4">
      <h5 class="text-center mb-4 text-dark  ">Enter Room Details</h5>
      <form [formGroup]="roomDetailsForm" (ngSubmit)="submit()">

        <div class="mb-3 position-relative text-field">
          <i class="bi bi-type text-dark form-icon ">  </i>
          <input
            type="text"
            class="form-control outline-hidden "
            placeholder="Room Name"
            formControlName="name"
            [class.is-invalid]="isInvalid('name')"
          />
        </div>

        <div class="mb-3 position-relative text-field">
          <i class="bi bi-card-text text-dark form-icon ">  </i>
          <input
            type="text"
            class="form-control outline-hidden "
            placeholder="Room Type"
            formControlName="type"
            [class.is-invalid]="isInvalid('type')"
          />
        </div>

        <div class="mb-3 position-relative text-field">
          <i class="bi bi-currency-dollar text-dark form-icon ">  </i>
          <input
            type="Number"
            class="form-control outline-hidden"
            placeholder="Price"
            formControlName="price"
            [class.is-invalid]="isInvalid('price')"
          />

        </div>

        <button
          type="submit"
          class="btn btn-dark w-100"
          [disabled]="roomDetailsForm.invalid"
        >
          Save
        </button>




      </form>

    </div>
  `,
  styleUrl: './post-room.component.css'
})
export class PostRoomComponent {

  roomDetailsForm: FormGroup;

  constructor(private fb:FormBuilder,
              private  toastService:ToastService,
              private router:Router,
              private adminService:AdminService,) {

    this.roomDetailsForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
    })
  }

  isInvalid(controlName: string): boolean {
    const ctrl = this.roomDetailsForm.get(controlName)!;
    return ctrl.invalid && ctrl.touched;
  }

  submit() {
    this.adminService.postRoomDetails(this.roomDetailsForm.value).subscribe(response => {
      this.toastService.show("Room Posted Successfully!",'success');
      this.router.navigateByUrl('/admin/dashboard');

    },error => {
      this.toastService.show("Failed To Create a Room","error");
      }
    )
  }
}
