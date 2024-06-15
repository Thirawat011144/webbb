<template>
    <div>
        <div class="bg">
            <Navbar />
            <div id="app">
                <div class="container">
                    <router-link to="/list-practice">
                        <h4 class="text-center">{{ job.company }}</h4>
                    </router-link>
                    <div class="section">
                        <p style="text-align: center;">
                            ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                        </p>
                        <p><label>ชื่อโรงเรียน/วิทยาลัย:</label> {{ job.company }}</p>
                        <p><label>ที่อยู่:</label> {{ job.location }}</p>
                        <p><label>รหัสไปรษณีย์:</label> {{ job.zipCode }}</p>
                        <p><label>เบอร์โทร:</label> {{ job.tel }}</p>
                        <p><label>อีเมล์:</label> {{ job.mail }}</p>
                    </div>
                    <div class="">
                        <h2>ตำแหน่งงาน</h2>
                        <table class="table">
                            <tr>
                                <th>อัตราที่รับ</th>
                                <td>{{ job.vacancies }}</td>
                            </tr>
                            <tr>
                                <th>เงินเดือน</th>
                                <td>{{ job.salary }}</td>
                            </tr>
                            <tr>
                                <th>เพศ</th>
                                <td>{{ job.gender }}</td>
                            </tr>
                            <tr>
                                <th>การศึกษา</th>
                                <td>{{ job.educationLevel }}</td>
                            </tr>
                            <tr>
                                <th></th>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                    <div class="section">
                        <h2>สอบถามข้อมูลเพิ่มเติม</h2>
                        <p><label>ชื่อผู้ติดต่อ:</label> {{ job.contactPerson }}</p>
                        <p><label>ตำแหน่ง:</label> {{ job.contactPosition }}</p>
                        <p><label>โทรศัพท์:</label> {{ job.contactTel }}</p>
                        <p><label>อีเมล์:</label> {{ job.contactEmail }}</p>
                        <p><label>ช่องทางการติดต่ออื่นๆ:</label> {{ job.otherContact }}</p>
                    </div>
                    <div class="section">
                        <h2>ที่อยู่สำหรับติดต่อ</h2>
                        <p>{{ job.location }}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Navbar from '../../components/HomeView/Navbar.vue';
import Footer from '../../components/HomeView/Footer.vue';
import config from '../../../config';

const route = useRoute();
const job = ref({}); // เก็บข้อมูลสถานที่ฝึกงาน

// ฟังก์ชันดึงข้อมูลจาก API
const fetchJob = async () => {
    try {
        const response = await axios.get(`${config.api_path}/practice-teaching/${route.params.id}`);
        job.value = response.data;
    } catch (error) {
        console.error('Error fetching job:', error);
    }
};

// ดึงข้อมูลเมื่อคอมโพเนนต์ถูกเมาท์
onMounted(() => {
    fetchJob();
});
</script>

<style scoped>
h2 {
    margin: 20px 0 20px 0;
}

.bg {
    position: relative;
    width: 100%;
    height: 100%;
}

.bg::before {
    content: "";
    background-image: url('../../assets/img/8.1.png');
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(3px);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    /* ทำให้ element อยู่ข้างหลัง content */
}

.container {
    padding: 20px;
    background-color: #fff;
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    margin: 20px auto;
    border-radius: 5px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
}

.header h1 {
    margin: 0;
    font-size: 24px;
}

.post-job-button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.content {
    padding: 20px;
}

.job-listing {
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 8px;
    margin: 0px auto;
}

.job-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.job-type {
    color: #555;
}

.job-details p {
    margin: 5px 0;
}

.text-bold {
    font-weight: bold;
}
</style>
