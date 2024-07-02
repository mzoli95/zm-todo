import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'zm-todo-create',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {}
