import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'range',
  pure: false
})

export class RangePipe implements PipeTransform {
  transform(items: any[], quantity: number): any {
    items.length = 0;
    for (let i = quantity; i > 0 ; i--) {
      items.push(i);
    }
    return items;
  }
}
