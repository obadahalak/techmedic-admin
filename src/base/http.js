import axios from "axios";
import Notify from 'simple-notify'
import { useGlobal } from '@/stores/global';


const createInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`,
 
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
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
              new Notify({
                status: 'error',
                title: 'Not found',
                text: 'certifiacte not found ',
                effect: 'slide',
                'autoclose':true,
                autotimeout: 1000,
                type: 3
            });  
           
            return true;
           
        }

    },
});


createInstance.interceptors.request.use(config => {
   
    useGlobal().setloading(true);

    return config;

});

createInstance.interceptors.response.use(function (response) {

    useGlobal().setloading(false);

    return response;


}, function (error) {
    console.log('eeeee'+error);
    useGlobal().setloading(false);
    return Promise.reject(error);
});

export default createInstance;