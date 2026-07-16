import { Component, computed, inject } from '@angular/core';
import { Icon } from '../../icons/icon/icon';
import { ToastLauncher } from './controller/toast-launcher';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [Icon, CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast {
  private toastController = inject(ToastLauncher);

  activeToast = this.toastController.activeToast;
  toastClassStyle = computed(() => {
    const toast = this.activeToast();
    return toast ? `toast__${toast.type}` : null;
  });

}
