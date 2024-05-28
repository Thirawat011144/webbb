<script setup>
import { computed } from 'vue'
import config from '../../../config'
import Navbar from '../../components/admin/Navbar.vue'
import Sidebar from '../../components/admin/Sidebar.vue'
import Swal from 'sweetalert2';
import { useRouter } from "vue-router";

const router = useRouter();

const getUserName = computed(() => {
    const firstName = localStorage.getItem(config.firstName_name);
    if (!firstName) return 'ผู้ใช้งาน';

    return firstName.charAt(0).toLocaleUpperCase() + firstName.slice(1)
})


const handleSignOut = () => {
    Swal.fire({
        title: "Sign Out",
        text: "ยืนยันการออกจากระบบ",
        icon: "question",
        showCancelButton: true,
        showConfirmButton: true,
    }).then((res) => {
        if (res.isConfirmed) {
            localStorage.removeItem(config.role_name);
            localStorage.removeItem(config.token_name);
            localStorage.removeItem(config.firstName_name);
            localStorage.removeItem('userData');
            router.push("/");
        }
    });
};
</script>

<template>
    <div class="sidebar d-flex flex-column flex-shrink-0 p-3 bg-light">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
            <span class="fs-4">{{ getUserName }}</span>
        </a>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
                <a href="#" class="nav-link" aria-current="page">
                    ประวัติ
                </a>
            </li>
        </ul>
        <hr>
        <div class="mt-auto">
            <button @click="handleSignOut" class="btn btn-danger w-100">ออกจากระบบ</button>
        </div>
    </div>
</template>

<style>
.sidebar {
    height: 100vh;
    /* Make the sidebar height 100% of the viewport height */
}

/* .mt-auto {
    margin-top: auto;
    
} */
</style>
