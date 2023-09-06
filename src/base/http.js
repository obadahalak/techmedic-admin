import axios from "axios";
import Notify from 'simple-notify'
import { pushNotify } from "../components/base/useNotify";
// import { notify } from "@kyvg/vue3-notification";

import { useGlobal } from '@/stores/global';
import router from "../router";

const createInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`,
 
    headers: {
        'Accept': 'application/json',
        'Content-Type':'multipart/form-data'
    },
 
    validateStatus: function (status) {
        
        if (status === 201) {
            return pushNotify('success','added successfully');
        }
        
       
        if (status >= 200 && status < 300) {
            return true;
        }
       
    
        if (status >= 500 && status  <600) {
            return pushNotify('error','500','error from server')
        }
        if(status===404){
            return  pushNotify('error','404','not found')
        }

        if(status===401){
              pushNotify('warning','401','Unathorize, login please')
             return router.push('/login'); 
        }
       

    },
});


createInstance.interceptors.request.use(config => {
   
    useGlobal().setloading(true);
    if(router.currentRoute.value.name !=='login' && !localStorage.getItem('token')){

        router.push('/login');
    }
    if(router.currentRoute.value.name=='login' && localStorage.getItem('token')){
         router.back();
    }
    config.headers.Authorization='Bearer ' + localStorage.getItem('token');
    return config;

});

createInstance.interceptors.response.use(function (response) {

    useGlobal().setloading(false);

    return response;


}, function (error) {
///here you can catch errors 
    useGlobal().setloading(false);
    return Promise.reject(error);
});

export default createInstance;