import {
  Component,
  Input,
  SimpleChanges,
  ViewChild,
  computed,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AdditionalComponent } from './additional/additional.component';
import { BasicComponent } from './basic/basic.component';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { CommentComponent } from './comment/comment.component';
import { MatCardModule } from '@angular/material/card';
import { SubscriptionManager } from '../../../../utils/subscriptionManager';
import { StepperService } from '../../../../utils/stepper.service';

@Component({
  selector: 'zm-stepper-form',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    AdditionalComponent,
    BasicComponent,
    MatStepperModule,
    CommentComponent,
    MatCardModule,
  ],
  templateUrl: './stepper-form.component.html',
  styleUrl: './stepper-form.component.scss',
})
export class StepperFormComponent extends SubscriptionManager {
  @ViewChild('stepper') stepper!: MatStepper;

  constructor(private stepperService: StepperService) {
    super();
  }

  ngOnInit(): void {
    this.addSubscriptions(
      this.stepperService.currentStep$.subscribe((step) => {
        if (this.stepper) {
          this.stepper.selectedIndex = step;
        }
      })
    );
  }
}
