<template>
  <div class="d-flex" style="height: 100vh;">
    <Sidebar />
    <div class="d-flex flex-column flex-grow-1">
      <div class="flex-grow-1">
        <!-- เนื้อหาส่วนอื่นๆ ที่ต้องการอยู่ด้านบน -->
      </div>
      <div class="mt-auto content-wrapper">
        <!-- <UserInformation />
        <DataTraining /> -->
        <router-view></router-view>
      </div>

    </div>
  </div>
</template>

<script setup>
import Sidebar from '../../components/user/SidebarUser.vue';
import UserInformation from '../../components/user/Information.vue';
import DataTraining from '../../components/user/DataTraining.vue';
</script>

<style scoped>
.mt-auto {
  margin-top: auto;
}
</style>
