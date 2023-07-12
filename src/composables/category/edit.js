import  {useCategory} from '@/stores/admin/category.js';
import { isEmpty } from '@/composables/isEmpty.js'

export function edit () {
 
  const category=useCategory();
 
  let data = new FormData();
  

      if (!isEmpty(category.item.company_name)) {
        data.append('name', category.item.company_name);
      }
     
  
      category.edit(data);
  
      
  
  }