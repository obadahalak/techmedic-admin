import  {useProduct} from '@/stores/admin/product.js';
import { isEmpty } from '@/composables/isEmpty.js'

export function edit ( ) {
 
  const product=useProduct();
 
  let data = new FormData();
  

      if (!isEmpty(product.item.price)) {
        data.append('price', product.item.price);
      }

      product.edit(data);
  
      
  
  }