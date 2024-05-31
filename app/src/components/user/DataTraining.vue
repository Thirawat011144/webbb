<template>
    <div class="flex-grow-1 p-3">
        <h1>Company Data</h1>
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
import { ref, onMounted, watch } from 'vue';
import config from '../../../config';
import axios from 'axios';
// import { useDataStore } from '../../store/Search';


const userData = JSON.parse(localStorage.getItem('userData') || '{}');

const company = ref('')
// const searchData = useDataStore();
// const dataResult = ref({});

let studentID = null

if (userData.studentID) {
    studentID = userData.studentID;
    console.log(studentID);  // Output: ค่า studentID
} else {
    console.log('No userData found in localStorage');
}


// const updateDataResults = () => {
//     const storedCompanyData = localStorage.getItem('companyData');
//     if (storedCompanyData) {
//         dataResult.value = JSON.parse(storedCompanyData);
//     } else {
//         dataResult.value = searchData.dataResults;
//     }
// }

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

onMounted(() => {
    fetchCompany();
});

// onMounted(() => {
//     updateDataResults();
// });
</script>

<style scoped>
span {
    font-weight: bold;
}
</style>