import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appPriorityColor]',
  standalone: true,
})
export class PriorityColorDirective implements OnChanges {
  @Input() appPriorityColor!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    this.setPriorityColor(this.appPriorityColor);
  }

  private setPriorityColor(priority: string): void {
    let colorClass = '';

    switch (priority) {
      case 'Low':
        colorClass = 'bg-low';
        break;
      case 'Medium':
        colorClass = 'bg-medium';
        break;
      case 'High':
        colorClass = 'bg-high';
        break;
      default:
        colorClass = 'bg-gray-500';
        break;
    }

    this.renderer.addClass(this.el.nativeElement, colorClass);
  }
}
