import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ToastService } from '../services/toast/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgOptimizedImage, ReactiveFormsModule],
  template: `
    <div
      class="container d-flex flex-column justify-content-center align-items-center bg-white py-4 rounded-4"
    >
      <div class="text-center">
        <img
          ngSrc="https://t3.ftcdn.net/jpg/03/02/36/70/360_F_302367092_vmqO9rSPmluZJFuOFFNzjGwimbChoIAZ.jpg"
          width="100"
          height="100"
          alt="logo"
          class="mb-3 rounded-b-full"
          priority
        />

        <h4 class="mb-4 text-dark">Enter Details to Register</h4>
      </div>
      <div
        class="card p-4"
        style="width: 100%; max-width: 600px; box-shadow: 1px 1px 4px 1px"
      >
        <form #frm [formGroup]="registerForm" (ngSubmit)="submitForm()">
          <div class="mb-3 position-relative text-field">
            <i class="bi bi-person-fill form-icon"> </i>
            <a>NAME:</a>
            <input
              type="text"
              class="form-control"
              placeholder="Enter name"
              formControlName="name"
              [class.is-invalid]="isInvalid('name')"
            />
          </div>
          <div class="mb-3 position-relative text-field">
            <i class="bi bi-envelope-fill form-icon"> </i>
            <a>EMAIL:</a>
            <input
              type="email"
              class="form-control"
              placeholder="Enter email"
              formControlName="email"
              [class.is-invalid]="isInvalid('email')"
            />
          </div>
          <div class="mb-3 position-relative text-field">
            <i class="bi bi-lock-fill form-icon"></i>
            <a>PASSWORD:</a>
            <input
              type="password"
              class="form-control"
              placeholder="Enter password"
              formControlName="password"
              [class.is-invalid]="isInvalid('password')"
            />
          </div>
          <button type="submit" class="btn btn-dark w-100">Register</button>
        </form>
        <div class="pt-2">
          Already have an account?
          <a
            class="text-primary "
            style="cursor: pointer;"
            (click)="navigateToLogin()"
            >Log In</a
          >
        </div>
      </div>
    </div>
  `,
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  @ViewChild('frm')
  frmElmRef!: ElementRef<HTMLFormElement>;
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      name: [null, [Validators.required]],
    });
  }

  isInvalid(controlName: string): boolean {
    const ctrl = this.registerForm.get(controlName)!;
    return ctrl.invalid && ctrl.touched;
  }

  submitForm() {
    this.authService.register(this.registerForm.value).subscribe((res) => {
      if (res.id != null) {
        this.toastService.show('Signup successfull', 'success');
        this.router.navigateByUrl('/');
      } else {
        this.toastService.show('Something went wrong', 'error');
      }
    });
  }

  navigateToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
