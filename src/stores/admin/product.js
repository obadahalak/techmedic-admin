import { defineStore } from "pinia";
import http from '@/base/http.js';
export const useProduct = defineStore('product', {
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


            http.post('admin/products/', data).then((response) => {
               
                const data=response.data.data;
                this.data.unshift({
                'id':data.id,
                'name':data.name,
                'description':data.description,
                'price':data.price,
                'image':data.images[0].src,
                'company':data.company.name,
                'category':data.category.name
            });
            }).catch((error)=>{
                this.error=error.response.data.errors;
            });
        },

        getAll() {
            http.get(`/products?page=${this.meta.current_page}`)
                .then((response) => {
                    this.meta = response.data.meta;
                    this.data = response.data.data;
                }).catch((error) => {
                    this.error = error.response.data.errors;
                });
        },

        get(id) { this.item = this.data.find((d) => d.id == id); },

        edit(data) {

            http.post(`/admin/products/edit/${this.item.id}`, data)
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
            http.delete(`/admin/products/${id}`).then((response) => {
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