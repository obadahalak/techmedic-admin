import { defineStore } from "pinia";
import http from '@/base/http.js';
export const useCompany = defineStore('company', {
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


            http.post('admin/companies/', data).then((response) => {
               
                this.data.unshift(response.data.data);
            }).catch((error)=>{
                this.error=error.response.data.errors;
            });
        },

        getAll() {
            http.get(`/companies?page=${this.meta.current_page}`)
                .then((response) => {
                    this.meta = response.data.meta;
                    this.data = response.data.data;
                }).catch((error) => {
                    this.error = error.response.data.errors;
                });
        },

        get(id) { this.item = this.data.find((d) => d.id == id); },

        edit(data) {

            http.post(`/admin/companies/edit/${this.item.id}`, data)
                .then((response) => {


                    this.status = response.status;

                    let item = this.data.find((d) => d.id == this.item.id);
                    item.name = response.data.data.name;
                    item.logo = response.data.data.logo;


                }).catch((error) => {
                    this.error = error.response.data.errors;
                });
        },
        delete(id) {
            http.delete(`/admin/companies/${id}`).then((response) => {
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