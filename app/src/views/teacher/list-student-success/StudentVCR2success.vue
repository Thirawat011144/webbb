<script setup>
import axios from "axios";
import { ref, onMounted, computed } from 'vue';
import config from "../../../../config";
import Swal from 'sweetalert2';
import { useRoute, useRouter } from 'vue-router';
import { RouterLink, RouterView } from 'vue-router';

// const route = useRoute();
// const router = useRouter();

// const user = ref({
//   firstName: '',
//   lastName: '',
//   userName: '',
//   password: '',
//   phoneNumber: '',
//   gender: '',
//   year: '',
//   branch: '',
//   status: '',
//   studentID: '',
//   company: ''
// });

const users = ref([]); // เปลี่ยน {} เป็น []

const fetchData = async () => {
    try {
        const response = await axios.get(`${config.api_path}/users`);
        users.value = response.data.filter(user => user.status === "Finished training" && user.year === "ปวช 2");
    } catch (error) {
        Swal.fire({
            title: "error",
            text: (error.message, "Cr2 Error"),
            icon: "error"
        });
    }
};

const removeData = async (id) => {
    // แสดงป๊อปอัพยืนยันการลบ
    const result = await Swal.fire({
        title: 'คุณแน่ใจหรือไม่?',
        text: 'คุณจะไม่สามารถย้อนกลับได้!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ลบเลย!',
        cancelButtonText: 'ยกเลิก'
    });

    // ตรวจสอบว่าผู้ใช้กดยืนยันการลบหรือไม่
    if (result.isConfirmed) {
        try {
            const response = await axios.delete(`${config.api_path}/users/${id}`);
            users.value = users.value.filter(user => user.id !== id);
            Swal.fire({
                title: 'สำเร็จ',
                text: 'ลบข้อมูลผู้ใช้สำเร็จ',
                icon: 'success',
            }).then((result) => {
                if (result.value) {
                    fetchData(); // รีเฟรชข้อมูลหลังจากการลบ
                }
            });
        } catch (error) {
            Swal.fire({
                title: 'error',
                text: (error.message, 'Cr2 Error DeleteData'),
                icon: 'error'
            });
            console.log(error);
        }
    }
};


const sortedUsers = computed(() => {
    return users.value.slice().sort((a, b) => a.id - b.id); // เรียงลำดับตาม ID
});

onMounted(() => {
    fetchData();
});
</script>

<template>
    <section class="content mt-4">
        <div class="card">
            <div class="card-header">
                <div class="card-title mb-2">ข้อมูลนักศึกษาชั้นประกาศนียบัตรวิชาชีพ ชั้นปีที่ 2 (ฝึกจบแล้ว)
                    <div>
                        <router-link :to="`/teacher-index/student-vcr2req`"> <button
                                class="btn btn-primary m-1">ขออนุมัติ</button></router-link>
                        <router-link :to="`/teacher-index/student-vcr2active`"> <button
                                class="btn btn-warning m-1">กำลังฝึก</button></router-link>
                        <router-link :to="`/teacher-index/student-vcr2success`"> <button
                                class="btn btn-success m-1">ฝึกจบแล้ว</button>
                        </router-link>
                    </div>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th class="text-center">ลำดับ</th>
                            <th>รหัสนักศึกษา</th>
                            <th>ชื่อ-นามสกุล</th>
                            <th>สาขา</th>
                            <th>ชั้นปี</th>
                            <th class="text-center">ชื่อสถานประกอบการ</th>
                            <th>Tools</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in sortedUsers" :key="user.id">
                            <td class="text-center">{{ index + 1 }}</td>
                            <td>{{ user.studentID }}</td>
                            <td>{{ user.firstName }} {{ user.lastName }}</td>
                            <td>{{ user.branch }}</td>
                            <td>{{ user.year }}</td>
                            <td class="text-center">{{ user.company }}</td>
                            <td>
                                <router-link :to="`/edit-ec2/${user.id}`">
                                    <button class="btn btn-primary m-1">Edit</button>
                                </router-link>
                                <button @click="removeData(user.id)" class="btn btn-danger m-1">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- <router-view></router-view> -->
        </div>
    </section>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800&display=swap');

body {
    font-family: 'Sarabun', sans-serif;
}
</style>
