<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import config from '../../../config';

// สร้างตัวแปรเพื่อเก็บข้อมูล
const companies = ref([]);

// ฟังก์ชั่นสำหรับดึงข้อมูลจาก API
const fetchData = async () => {
    try {
        const response = await axios.get(`${config.api_path}/companies`);
        // อัพเดตตัวแปร companies ด้วยข้อมูลที่ได้รับจาก API
        companies.value = response.data;
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error'
        });
    }
};

// เรียกใช้ฟังก์ชั่น fetchData เมื่อ component ถูกสร้างขึ้น
onMounted(() => {
    fetchData();
});
</script>

<template>
    <div class="content mt-4">
        <div class="card">
            <div class="card-header">
                <div class="card-title">ข้อมูลสถานประกอบการ</div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>ชื่อ-นามสกุล</th>
                            <th>ชื่อสถานประกอบการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(company, index) in companies" :key="company.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ company.userDetails.firstName }} {{ company.userDetails.lastName }}</td>
                            <td>{{ company.companyName }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style>
/* เพิ่มสไตล์ถ้าจำเป็น */
</style>
