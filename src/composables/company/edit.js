import  {useCompany} from '@/stores/admin/company.js';
import { isEmpty } from '@/composables/isEmpty.js'

export function edit (logo ) {
 
  const company=useCompany();
 
  let data = new FormData();
  

      if (!isEmpty(company.item.name)) {
        data.append('name', company.item.name);
      }
      if (!isEmpty(logo )) {
        data.append('logo', logo);
      }
  
      company.edit(data);
  
      
  
  }