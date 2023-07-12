<script setup>
import addBanner from '../../components/admin/slider/add-banner.vue';
import banners from '../../components/admin/slider/banners.vue';
import { onMounted } from 'vue';

import { useBanner } from '../../stores/admin/banner';
onMounted(() => {


    useBanner().getAll();
});
</script>

<template>
    <div class="">


        <addBanner />

        <banners />

    </div>
</template>