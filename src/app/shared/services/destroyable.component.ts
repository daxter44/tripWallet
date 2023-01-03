import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ViewDidLeave } from '@ionic/angular';

@Component({
  selector: 'app-destroyable',
  template: '',
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class Destroyable implements OnDestroy, ViewDidLeave {
  public destroyed$: Subject<void> = new Subject<void>();

  public ngOnDestroy(): void {
    this.destroy();
  }

  public ionViewDidLeave(): void {
    this.destroy();
  }

  public destroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
