import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastService} from '../../../../auth/components/services/toast/toast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../service/admin.service';

@Component({
  selector: 'app-update-room',
  standalone: false,
  template: `
    <div class="room-details-form-container bg-info p-4 rounded-4">
      <h5 class="text-center mb-4 text-dark  ">Update Room Details</h5>
      <form [formGroup]="updateDetailsForm" (ngSubmit)="submit()">

        <div class="mb-3 position-relative text-field">
          <i class="bi bi-type text-dark form-icon "> </i>
          <input
            type="text"
            class="form-control outline-hidden "
            placeholder="Room Name"
            formControlName="name"
            [class.is-invalid]="isInvalid('name')"
          />
        </div>

        <div class="mb-3 position-relative text-field">
          <i class="bi bi-card-text text-dark form-icon "> </i>
          <input
            type="text"
            class="form-control outline-hidden "
            placeholder="Room Type"
            formControlName="type"
            [class.is-invalid]="isInvalid('type')"
          />
        </div>

        <div class="mb-3 position-relative text-field">
          <i class="bi bi-currency-dollar text-dark form-icon "> </i>
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
          [disabled]="updateDetailsForm.invalid"
        >
          Update
        </button>


      </form>

    </div>
  `,
  styleUrl: './update-room.component.css'
})
export class UpdateRoomComponent implements OnInit {
  updateDetailsForm: FormGroup;
  id:number;

  constructor(private fb:FormBuilder,
              private  toastService:ToastService,
              private router:Router,
              private adminService:AdminService,
              private activatedRoute: ActivatedRoute,
              ) {

    this.updateDetailsForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getRoomById();
  }


  isInvalid(controlName: string): boolean {
    const ctrl = this.updateDetailsForm.get(controlName)!;
    return ctrl.invalid && ctrl.touched;
  }

  submit() {
    this.adminService.updateRoomDetails(this.id , this.updateDetailsForm.value).subscribe(res=>{
      this.toastService.show("Room Updated Successfully","success");
      this.router.navigateByUrl('/admin/dashboard');
      console.log(res)
    },error => {
      this.toastService.show("Something went wrong!",'error');
      console.log(error);
    })
  }

  getRoomById() {
    this.adminService.getRoomById(this.id).subscribe(res=>{
        this.updateDetailsForm.patchValue(res);
    },error =>{
      this.toastService.show(`${error.error}`,"error")
      }
    )
  }

}
