  <script setup>
import Navbar from '../../components/admin/Navbar.vue'
import Sidebar from '../../components/admin/Sidebar.vue'
</script>

<template>
    <div class="sidebar d-flex flex-column flex-shrink-0 p-3 bg-light">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <span class="fs-4">Sidebar</span>
      </a>
      <hr>
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <a href="#" class="nav-link active" aria-current="page">
            Home
          </a>
        </li>
        <li>
          <a href="#" class="nav-link link-dark">
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" class="nav-link link-dark">
            Orders
          </a>
        </li>
        <li>
          <a href="#" class="nav-link link-dark">
            Products
          </a>
        </li>
        <li>
          <a href="#" class="nav-link link-dark">
            Customers
          </a>
        </li>
      </ul>
    </div>
  </template>

<style>

.sidebar {
  height: 100vh; /* Make the sidebar height 100% of the viewport height */
}</style>