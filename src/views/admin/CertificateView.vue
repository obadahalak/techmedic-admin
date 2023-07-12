<script setup>
import AddCertificate from '../../components/admin/certifications/AddCertificate.vue';
import Certificates from '../../components/admin/certifications/Certificates.vue';

import { onMounted } from 'vue';
import { useCertificate } from '../../stores/admin/certificate';
onMounted(()=>{
   
    useCertificate().getAll();
   
});
</script>

<template>

<div class="">

    
    <AddCertificate/>
 
    <Certificates/>
    
</div>

</template>