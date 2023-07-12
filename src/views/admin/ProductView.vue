<script setup>
import AddProduct from '../../components/admin/products/AddProduct.vue';
import Products from '../../components/admin/products/products.vue';
import {useCompany} from '@/stores/admin/company.js';
import { onMounted } from 'vue';
import { useCategory } from '../../stores/admin/category';
import { useProduct } from '../../stores/admin/product';
onMounted(()=>{
   
    useCompany().getAll();
    useCategory().getAll();
    useProduct().getAll();
});
</script>

<template>

<div class="">

    
    <AddProduct/>
    
    <Products/>
    
</div>

</template>