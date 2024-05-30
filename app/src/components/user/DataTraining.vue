<template>
    <div class="flex-grow-1 p-3">
        <h1>Status & Company Data</h1>
        <div class="card" v-if="company">
            <div class="card-body">
                <h5 class="card-title">
                    <span>ชื่อสถานประกอบการ:</span> {{ company.companyName }}
                </h5>
                <p class="card-text">
                    <span>ประเภทหน่วยงาน:</span> {{ company.companyType }}
                </p>
                <p class="card-text">
                    <span>เบอร์โทรศัพท์:</span> {{ company.companyPhone }}
                </p>
                <p class="card-text">
                    <span>Email:</span> {{ company.companyEmail }}
                </p>
                <p class="card-text">
                    <span>ที่ตั้ง:</span> {{ company.companyAddress }}
                </p>
            </div>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import config from '../../../config';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const router = useRouter();
const company = ref(null); // เก็บข้อมูลบริษัทของผู้ใช้
let studentID = null; // กำหนดตัวแปร studentID

const userDataString = localStorage.getItem('userData');

if (userDataString) {
    try {
        // แปลง JSON string ให้เป็น object
        const userData = JSON.parse(userDataString);

        // เข้าถึงค่า studentID และกำหนดค่าให้ตัวแปรภายนอก
        studentID = userData.studentID;

        // console.log(studentID);  
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
} else {
    console.log('No userData found in localStorage');
}

const fetchCompany = async () => {
    try {
        if (studentID) {
            const response = await axios.get(`${config.api_path}/company/${studentID}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem(config.token_name)}` }
            });
            company.value = response.data;
            console.log(company.value)
        } else {
            console.error('studentID is not defined');
        }
    } catch (error) {
        console.error('Error fetching company:', error);
    }
};

// เรียกใช้ฟังก์ชัน fetchCompany เมื่อคอมโพเนนต์ถูกสร้างขึ้น
onMounted(() => {
    fetchCompany();
});
</script>