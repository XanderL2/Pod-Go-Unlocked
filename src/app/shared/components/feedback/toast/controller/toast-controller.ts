import { computed, Injectable, signal } from '@angular/core';
import { Queue } from '../../../../types/queue';

type ToastType = 'error' | 'info' | 'warning' | 'success';

export interface ToastNotification {
  title: string;
  description: string;
  type: ToastType;
}

type ToastQueue = Queue<ToastNotification>;

@Injectable({
  providedIn: 'root',
})
export class ToastLauncher {
  
  private TOAST_DURATION = 5000;
  private toasts = signal<ToastQueue>(new Queue<ToastNotification>());
  activeToast = computed(() => this.toasts().peek());

  error(title: string, description: string) {
    this.show(title, description, 'error');
  }

  private show(title: string, description: string, type: ToastType) {

    console.log("Mostrando toast");

    this.toasts.update((toasts) => {
      toasts.enqueue({ title, description, type });
      return toasts.clone();
    });

    this.dequeueToastAfterDelay();
  }

  private dequeueToastAfterDelay() {
    setTimeout(() => {
      this.toasts.update((toasts) => {
        toasts.dequeue()
        return toasts.clone();
      });

      console.log("Limpiando toast");

    }, this.TOAST_DURATION);
  }
}
