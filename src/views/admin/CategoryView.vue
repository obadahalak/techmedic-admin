<script setup>
import AddCategory from '../../components/admin/categories/AddCategory.vue';
import Categories from '../../components/admin/categories/Categories.vue';

import {useCompany} from '@/stores/admin/company.js';

import {useCategory} from '@/stores/admin/category.js';
import { onMounted } from 'vue';
onMounted(()=>{
   
    useCompany().getAll();
    useCategory().getAll();
});
</script>

<template>

<div class="">

    
    <AddCategory/>
 
    <Categories/>
    
</div>

</template>