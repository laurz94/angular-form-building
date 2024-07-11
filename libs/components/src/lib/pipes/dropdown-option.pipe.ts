import { Pipe, PipeTransform } from '@angular/core';
import { SelectOption } from '@libs/domain';

@Pipe({
  name: 'dropdownOption',
  standalone: true,
})
export class DropdownOptionPipe implements PipeTransform {
  transform(value: string, options: SelectOption[]): string {
    const formattedValue: string = options
      .filter((o) => (Array.isArray(value) ? value.includes(o.value) : o.value === value))
      // eslint-disable-next-line dot-notation
      .map((o) => o.name ?? (o as any).label)
      .join(', ');

    return formattedValue;
  }
}
