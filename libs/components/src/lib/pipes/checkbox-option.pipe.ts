import { Pipe, PipeTransform } from '@angular/core';
import { CheckboxOption } from '@libs/domain';

@Pipe({
  name: 'checkboxOption',
  standalone: true,
})
export class CheckboxOptionPipe implements PipeTransform {
  transform(value: boolean | any[], checkboxOption: CheckboxOption): boolean {
    return Array.isArray(value) ? value.includes(checkboxOption.value) : value === checkboxOption.value;
  }
}
