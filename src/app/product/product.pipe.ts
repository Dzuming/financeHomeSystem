import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'dateFilter'
})
export class ProductPipe implements PipeTransform {
  transform(products: any[], args: any[]): any {
    return products.filter(item => item.dateCreated.indexOf(args) !== -1);
  }
}
/** 
  select all elements from table as object->
  change tr position 
 */
