import axios from "axios";
import Notify from 'simple-notify'
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
            return new Notify({
                status: 'success',
                title: '',
                text: 'add successfully',
                effect: 'slide',
                type: 3,
                'autoclose':true,
                autotimeout: 1000,
            });
        }
        
       
        if (status >= 200 && status < 300) {
            return true;
        }
       
    
        if (status >= 500 && status  <600) {
            return new Notify({
                status: 'error',
                title: 'error',
                text: 'server under maintennace',
                effect: 'slide',
                type: 3,
                'autoclose':true,
                autotimeout: 1000,
            });
        }
        if(status===404){
          return     new Notify({
                status: 'error',
                title: 'Not found',
                text: 'certifiacte not found ',
                effect: 'slide',
                'autoclose':true,
                autotimeout: 1000,
                type: 3
            });  
            
            
           
        }

        if(status===401){
            new Notify({
              status: '401',
              title: 'Not authorize',
              text: 'please login to authorize ',
              effect: 'slide',
              'autoclose':true,
              autotimeout: 1000,
              type: 3
          }); 
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