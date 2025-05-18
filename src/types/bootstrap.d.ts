// src/types/bootstrap.d.ts
declare module 'bootstrap' {
  export class Toast {
    constructor(element: Element | HTMLElement, options?: any);
    show(): void;
    hide(): void;
    dispose(): void;
  }

  // You can declare other Bootstrap classes here if needed
}
