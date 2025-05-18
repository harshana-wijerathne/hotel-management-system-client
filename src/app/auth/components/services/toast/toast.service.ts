import { Injectable } from '@angular/core';
import { Toast } from 'bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  show(
    message: string,
    type: 'success' | 'error' | 'info' = 'success',
    timeout: number = 3000 // default to 5 seconds
  ) {
    const toastContainer = document.getElementById('toast-container');
    const toastElement = document.createElement('div');
    toastElement.className = `toast align-items-center text-white bg-${type==="error"?"danger":""} border-0`;
    toastElement.setAttribute('role', 'alert');
    toastElement.setAttribute('aria-live', 'assertive');
    toastElement.setAttribute('aria-atomic', 'true');

    toastElement.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;

    toastContainer?.appendChild(toastElement);

    const bsToast = new Toast(toastElement, { autohide: false });
    bsToast.show();

    // Hide after timeout
    setTimeout(() => {
      bsToast.hide();
    }, timeout);

    // Remove toast from DOM after hidden
    toastElement.addEventListener('hidden.bs.toast', () => {
      toastElement.remove();
    });
  }
}
