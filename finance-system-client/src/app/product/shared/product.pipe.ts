import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../shared/models/product.model';
@Pipe({
  name: 'UserFilter'
})
export class ProductPipe implements PipeTransform {
  transform(products: Product[], args: string): any {
    if (products) {
      return products.filter(item => {
        if (item.User) {
          return item.User.Email === args
        }
      })
    }

  }
}
