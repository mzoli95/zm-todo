import { Injectable, signal } from '@angular/core';

@Injectable()
export class LoadingService {
  loading = signal<boolean | null>(null);

  loadingOn() {
    this.loading.set(true);
  }

  loadingOff() {
    this.loading.set(false);
  }
}
