<template>
    <div class="flex-grow-1 p-3 ">
        <h2>ข้อมูลส่วนตัว</h2>
        <div class="card" v-if="dataResult">
            <div class="card-body">
                <h5 class="card-title">
                    <span>ชื่อ:</span> {{ dataResult.firstName }} <span>นามสกุล:</span> {{ dataResult.lastName }}
                </h5>

                <p class="card-text">
                    <span>ชื่อผู้ใช้:</span> {{ dataResult.userName }}
                </p>
                <p class="card-text">
                    <span>โทรศัพท์:</span> {{ dataResult.phoneNumber }}
                </p>
                <p class="card-text">
                    <span>เลขบัตรประจำตัวประชาชน:</span> {{ dataResult.studentID }}
                </p>
                <p class="card-text">
                    <span>สถานะผู้ประเมินสมรรถนะวิชาชีพครู:</span> {{ dataResult.evaluatorStatus }}
                </p>
                <p class="card-text">
                    <span>สาขาวิชาที่นักศึกษากำลังศึกษา:</span> {{ dataResult.currentStudyField }}
                </p>
                <!-- <p class="card-text">
                    <span>ชื่อสถานศึกษาที่นักศึกษาเข้ารับการปฏิบัติการสอน:</span> {{ dataResult.schoolName }}
                </p> -->
                <!-- <p class="card-text">
                    <span>แผนกวิชาที่นักศึกษาเข้ารับการปฏิบัติการสอน:</span> {{ dataResult.department }}
                </p> -->
                <!-- <p class="card-text">
                    <span>ขนาดสถานศึกษา:</span> {{ dataResult.schoolSize }}
                </p> -->
                <!-- <p class="card-text">
                    <span>ความสัมพันธ์ของรายวิชาปฏิบัติการสอน:</span> {{ dataResult.courseRelation }}
                </p> -->

            </div>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
        <router-view></router-view>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import config from '../../../config';

const dataResult = ref(null);

const fetchData = async () => {
    const token = localStorage.getItem(config.token_name);
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (token && userData && userData.id) {
        try {
            const response = await axios.get(`${config.api_path}/evaluation/${userData.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data) {
                dataResult.value = response.data;
                localStorage.setItem(config.currentStudyField, response.data.currentStudyField);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

onMounted(() => {
    fetchData();
});
</script>

<style scoped>
span {
    font-weight: bold;
}
</style>
