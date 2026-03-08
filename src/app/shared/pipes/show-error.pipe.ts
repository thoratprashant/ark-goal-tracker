import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'showError', standalone: true })
export class ShowErrorPipe implements PipeTransform {
  transform(errors: any): string {
    if (!errors) return '';
    return errors.message || '';
  }
}
