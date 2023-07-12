
import { defineStore } from "pinia";
import http from '@/base/http.js';

export const useBanner = defineStore('banner', {

    state: () => ({
        error: '',
        data: [],
        item: {},
        meta: {
            current_page: 1,
            last_page: 1,
        },
        status: null,
    }),

    actions: {


        store(data) {


            http.post('admin/slider-images/', data).then((response) => {

                response.data.data.map((b)=>{
                    this.data.unshift({'id':b.id,'image':b.path});
                });
             
            }).catch((error) => {
                this.error = error.response.data.errors;
            });
        },

        getAll() {
            http.get(`/slider-images?page=${this.meta.current_page}`)
                .then((response) => {
                
                    this.data = response.data.data;
                });
        },

        get(id) { this.item = this.data.find((d) => d.id == id); },

        delete(id) {
            http.delete(`/admin/slider-images/${id}`).then((response) => {
                this.status = response.status;
                this.data.splice(this.data.indexOf(this.data.find((d) => d.id == id)), 1);
            }).catch((error) => {
                this.error = error.response.data.errors;
            });
        },

    

    },


});