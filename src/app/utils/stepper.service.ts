import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StepperService {
  private currentStepSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  currentStep$: Observable<number> = this.currentStepSubject.asObservable();

  setCurrentStep(step: number): void {
    this.currentStepSubject.next(step);
  }

  nextStep(): Observable<number> {
    const currentStep = this.currentStepSubject.getValue();
    this.currentStepSubject.next(currentStep + 1);

    return this.currentStepSubject.asObservable();
  }

  previousStep(): Observable<number> {
    const currentStep = this.currentStepSubject.getValue();
    if (currentStep > 0) {
      this.currentStepSubject.next(currentStep - 1);
    }
    return this.currentStepSubject.asObservable();
  }
}
