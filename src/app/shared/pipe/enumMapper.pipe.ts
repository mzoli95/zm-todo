import { Pipe, PipeTransform } from '@angular/core';
import { NotificationType, Priority, Stage, Tag } from '../../model/mz.enums';
import { EnumMapping } from '../../utils/enumMapping';

type EnumKeys = NotificationType | Priority | Stage | Tag;

@Pipe({
  name: 'enumMapper',
  standalone: true,
})
export class EnumMapperPipe implements PipeTransform {
  enumMap = EnumMapping;

  transform(value: EnumKeys): string {
    return this.enumMap[value] || value;
  }
}
