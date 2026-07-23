import { Component, computed, inject } from '@angular/core';
import { Icon } from '../../icons/icon/icon';
import { ToastLauncher } from './controller/toast-launcher';
import { CommonModule } from '@angular/common';
import { ASSET_PATHS } from '../../../../core/constants/assets-paths';

@Component({
  selector: 'app-toast',
  imports: [Icon, CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast {
  private toastController = inject(ToastLauncher);

  activeToast = this.toastController.activeToast;
  feedbackIconsPath = ASSET_PATHS.icons.feedback;
  toastClassStyle = computed(() => {
    const toast = this.activeToast();
    return toast ? `toast__${toast.type}` : null;
  });

}
