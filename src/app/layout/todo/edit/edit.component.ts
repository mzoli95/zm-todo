import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'zm-todo-edit',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {}
