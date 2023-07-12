import { defineStore } from "pinia";
import http from '@/base/http.js';

export const useGlobal = defineStore('global',  {
    state: () => ({ 
        loading:false,
        auth:false,
    }),
   
    actions: {
  
        setloading(value){
            this.loading = value;
        },
      
        
    },
})