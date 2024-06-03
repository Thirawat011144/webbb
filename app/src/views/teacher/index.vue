<template>
    <div>
        <Navbar />
        <div class="content-wrapper">

            <Sidebar />
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import Navbar from '@/components/admin/Navbar.vue';
import Sidebar from '@/components/teacher/Sidebar.vue';
</script>

<style></style>