import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'txtShorter',
})
export class TxtShorterPipe implements PipeTransform {
  transform(value: any, limit: number) {
    return value.length > limit ? value.substr(0, limit) + '...' : value;
  }
}
