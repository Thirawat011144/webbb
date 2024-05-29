<template>
    <div class="flex-grow-1 p-3">
        <h1>Status & Company Data</h1>
        <div class="card" v-if="dataResult">
            <div class="card-body">
                <h5 class="card-title">
                    <span>ชื่อสถานประกอบการ:</span> {{ dataResult.companyName }}
                </h5>
                <p class="card-text">
                    <span>ประเภทหน่วยงาน:</span> {{ dataResult.companyType }}
                </p>
                <p class="card-text">
                    <span>เบอร์โทรศัพท์:</span> {{ dataResult.companyPhone }}
                </p>
                <p class="card-text">
                    <span>Email:</span> {{ dataResult.companyEmail }}
                </p>
                <p class="card-text">
                    <span>ที่ตั้ง:</span> {{ dataResult.companyAddress }}
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
import { useDataStore } from '../../store/Search';

const searchData = useDataStore();
const dataResult = ref({});

const updateDataResults = () => {
    const storedCompanyData = localStorage.getItem('companyData');
    if (storedCompanyData) {
        dataResult.value = JSON.parse(storedCompanyData);
    } else {
        dataResult.value = searchData.dataResults;
    }
}

onMounted(() => {
    updateDataResults();
});
</script>

<style scoped>
span {
    font-weight: bold;
}
</style>