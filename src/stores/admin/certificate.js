import { defineStore } from "pinia";
import http from '@/base/http.js';
export const useCertificate = defineStore('certificate', {
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


            http.post('admin/certificates/', data).then((response) => {
          
                this.data.unshift(response.data.data);
            }).catch((error)=>{
                this.error=error.response.data.errors;
            });
        },

        getAll() {
            http.get(`/certificates?page=${this.meta.current_page}`)
                .then((response) => {
                    this.meta = response.data.meta;
                    this.data = response.data.data;
                }).catch((error) => {
                    this.error = error.response.data.errors;
                });
        },

        get(id) { this.item = this.data.find((d) => d.id == id); },

    
        delete(id) {
            http.delete(`/admin/certificates/${id}`).then((response) => {
                this.status = response.status;
                this.data.splice(this.data.indexOf(this.data.find((d) => d.id == id)), 1);
            }).catch((error) => {
                this.error = error.response.data.errors;
            });
        },
        nextPage() {
            if (this.meta.current_page != this.meta.last_page) {
                this.meta.current_page++
                this.getAll();
            }
        },
        prevPage() {
            if (this.meta.current_page != 1) {
                this.meta.current_page--
                this.getAll();
            }
        },

    },


});