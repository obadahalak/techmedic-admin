<script setup>
import AddCompany from '../../components/admin/companies/AddCompany.vue';
import Companies from '../../components/admin/companies/Companies.vue';

import {useCompany} from '@/stores/admin/company.js';
import { onMounted } from 'vue';
onMounted(()=>{
   
    useCompany().getAll();
});
</script>

<template>

<div class="">

    
    <AddCompany/>
    <Companies/>
    
</div>

</template>