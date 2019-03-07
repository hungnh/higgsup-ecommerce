import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'slice',
  pure: false
})

export class SliceStringPipe implements PipeTransform {
  transform(items: string, quantity: number): string {

    if (items) {
      if (items.length >= quantity) {
        return items.substr(0, quantity) + ' ...';
      }
      else {
        return items
      }
    }
  }
}
