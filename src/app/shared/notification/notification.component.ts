import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'zm-notification',
  standalone: true,
  imports: [ToastModule],
  templateUrl: './notification.component.html',
})
export class NotificationComponent {}
