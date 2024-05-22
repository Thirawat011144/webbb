<template>
    <div class="d-flex">
      <Sidebar />
      <div class="flex-grow-1 p-3">
        <h1>User Information</h1>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ userInfo.name }}</h5>
            <p class="card-text">
              Email: {{ userInfo.email }}
            </p>
            <p class="card-text">
              Address: {{ userInfo.address }}
            </p>
            <p class="card-text">
              Phone: {{ userInfo.phone }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Sidebar from '../user/SidebarUser.vue';
  
  const userInfo = ref({
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA',
    phone: '(123) 456-7890'
  });
  </script>
  
  <style scoped>
  /* Add additional styles if needed */
  </style>
  

  