<script setup>
import { computed } from 'vue';
import config from '../../../config';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const router = useRouter();

const getUserName = computed(() => {
    const firstName = localStorage.getItem(config.firstName_name);
    if (!firstName) return 'ผู้ใช้งาน';
    return firstName.charAt(0).toLocaleUpperCase() + firstName.slice(1);
});

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
    <div>
        <aside class="main-sidebar sidebar-dark-primary elevation-4">
            <!-- Brand Logo -->
            <!-- Sidebar -->
            <div class="sidebar">
                <!-- Sidebar user panel (optional) -->
                <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div class="image">
                        <!-- <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image"> -->
                    </div>
                    <div class="info">
                        <a href="#" class="d-block">{{ getUserName }}</a>
                    </div>
                </div>
                <nav class="mt-2">
                    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                        data-accordion="false">
                        <li class="nav-item">
                            <router-link to="/user-index/data-student" class="nav-link">
                                <i class="fa-solid fa-user me-2"></i>
                                <p>ข้อมูลนักศึกษา</p>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/user-index/form" class="nav-link">
                                <i class="fa-solid fa-comment me-2"></i>
                                <p>ลงทะเบียนขอออกฝึก</p>
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </div>
            <button @click="handleSignOut" class="btn btn-danger" style="width: 100%;">ออกจากระบบ</button>
        </aside>
    </div>
</template>


<style></style>