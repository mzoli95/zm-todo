import { Component } from '@angular/core';
import { StepperService } from '../../../../utils/stepper.service';
import { SubscriptionManager } from '../../../../utils/subscriptionManager';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';

import { MatCardModule } from '@angular/material/card';
import { AdditionalComponent } from '../stepper/additional/additional.component';
import { BasicComponent } from '../stepper/basic/basic.component';
import { CommentComponent } from '../stepper/comment/comment.component';

@Component({
  selector: 'zm-tab-form',
  standalone: true,
  imports: [
    MatTabsModule,
    MatDialogModule,
    AdditionalComponent,
    BasicComponent,
    CommentComponent,
    MatCardModule,
  ],
  templateUrl: './tab-form.component.html',
  styleUrl: './tab-form.component.scss',
})
export class TabFormComponent extends SubscriptionManager {
  // Perhaps remove next and prev btn s from tab
  constructor(private stepperService: StepperService) {
    super();
  }
}
