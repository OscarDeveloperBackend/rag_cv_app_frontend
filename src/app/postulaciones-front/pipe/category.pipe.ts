import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category-pipe'
})

export class CategoryPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {

  }
}
