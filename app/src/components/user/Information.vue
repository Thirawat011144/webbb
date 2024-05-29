<template>
    <!-- <div class="d-flex"> -->
    <!-- <Sidebar /> -->
    <div class="flex-grow-1 p-3">
        <h1>User Information</h1>
        <div class="card" v-if="dataResult">
            <div class="card-body">
                <h5 class="card-title">
                    <span>ชื่อ:</span> {{ dataResult.firstName }} <span>นามสกุล:</span> {{ dataResult.lastName }}
                </h5>
                <p class="card-text">
                    <span>Company:</span> {{ dataResult.company }}
                </p>
                <p class="card-text">
                    <span>Phone:</span> {{ dataResult.phoneNumber }}
                </p>
                <p class="card-text">
                    <span>Role:</span> {{ dataResult.role }}
                </p>
                <p class="card-text">
                    <span>Status:</span> {{ dataResult.status }}
                </p>
                <p class="card-text">
                    <span>Student ID:</span> {{ dataResult.studentID }}
                </p>
                <p class="card-text">
                    <span>Branch:</span> {{ dataResult.branch }}
                </p>
                <p class="card-text">
                    <span>Year:</span> {{ dataResult.year }}
                </p>
            </div>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
    <!-- </div> -->
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useDataStore } from '../../store/Search';
//   import Sidebar from './SidebarUser.vue';

const searchData = useDataStore();
const dataResult = ref({}); // แก้ไขให้เป็น Object แทนที่จะเป็น Array

const updateDataResults = () => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
        dataResult.value = JSON.parse(storedData); // ดึงข้อมูลจาก localStorage
    } else {
        dataResult.value = searchData.dataResults; // อัพเดทค่า dataResult จาก store
    }
    console.log("xxxx", dataResult.value)
}

onMounted(() => {
    updateDataResults();
});

watch(
    () => searchData.dataResults,
    (newResults) => {
        updateDataResults();
    }
);
</script>

<style scoped>
span {
    font-weight: bold;
}
</style>