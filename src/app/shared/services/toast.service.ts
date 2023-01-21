import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {
    this.toastController.create({ animated: false }).then((t) => {
      t.present();
      t.dismiss();
    });
  }

  public showNotImplementedToast(): void {
    this.showToast({
      message:
        'This functionality is not yet supported, but is planned for the future.',
      duration: 3000,
      color: 'secondary',
    });
  }

  public showOfflineToast(): void {
    this.showToast({
      message: 'Connection error. Please check you connectivity and try again.',
      duration: 3000,
      color: 'danger',
    });
  }

  public showGeneralToast(color: string, message: string): void {
    this.showToast({
      message,
      duration: 3000,
      color,
    });
  }

  private async showToast(config: ToastOptions): Promise<void> {
    const toast = await this.toastController.create(config);

    toast.present();
  }
}
