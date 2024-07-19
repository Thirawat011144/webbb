<template>
    <div class="evaluation-container">
        <h1>แบบฟอร์มนิเทศนักศึกษาฝึกงาน</h1>
        <section class="company-info" v-if="student">
            <h2>ข้อมูลสถานประกอบการ</h2>
            <label>ชื่อสถานประกอบการ: <span>{{ student.companyDetails.companyName }}</span></label> <br>
            <label>สถานที่ตั้ง: <span>{{ student.companyDetails.companyAddress }}</span></label> <br>
            <label>โทรศัพท์: <span>{{ student.companyDetails.companyPhone }}</span></label>
        </section>

        <div v-if="student">
            <h4>ข้อมูลนักศึกษาที่ทำการประเมิน</h4>
            <p>ชื่อ: {{ student.firstName }} {{ student.lastName }}</p>
            <p>รหัสนักศึกษา: {{ student.studentID }}</p>

            <div>
                <h2>คำชี้แจง</h2>
                โปรดบันทึกหมายเลข 5, 4, 3, 2, 1, หรือ -1 ตามความคิดเห็นของแต่ละหัวข้อการประเมิน
                โดยใช้เกณฑ์การประเมินค่าสำหรับระดับความคิดเห็นดังนี้ <br>
                ระดับ 5 ผลการประเมิน เห็นด้วยกับข้อความนั้นมากที่สุด <br>
                ระดับ 4 ผลการประเมิน เห็นด้วยกับข้อความนั้นมาก หรือเหมาะสมมาก <br>
                ระดับ 3 ผลการประเมิน เห็นด้วยกับข้อความนั้นมากปานกลาง หรือเหมาะสมมากปานกลาง <br>
                ระดับ 2 ผลการประเมิน เห็นด้วยกับข้อความนั้นน้อย หรือเหมาะสมน้อย <br>
                ระดับ 1 ผลการประเมิน เห็นด้วยกับข้อความนั้นน้อยที่สุด หรือเหมาะสมน้อยที่สุด <br>
                ระดับ -1 ผลการประเมิน ไม่มีความเห็นด้วย / ไม่มีข้อมูล / ไม่ต้องการประเมิน <br>
            </div>

            <form @submit.prevent="submitEvaluation">
                <h2>ส่วนที่ 1 สำหรับประเมินสถานประกอบการ</h2>
                <div>
                    <h5>การจัดการและการสนับสนุน</h5>
                </div>
                <table class="evaluation-table">
                    <thead>
                        <tr>
                            <th class="text-center">เกณฑ์การประเมิน</th>
                            <th>5</th>
                            <th>4</th>
                            <th>3</th>
                            <th>2</th>
                            <th>1</th>
                            <th>-1</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>การประสานงานด้านการจัดการดูแลนักศึกษาในสถานประกอบการ ระหว่างบุคคล และผู้นิเทศงานในสถานประกอบการ</td>
                            <td><input type="radio" :value="5" v-model.number="criteria" required></td>
                            <td><input type="radio" :value="4" v-model.number="criteria"></td>
                            <td><input type="radio" :value="3" v-model.number="criteria"></td>
                            <td><input type="radio" :value="2" v-model.number="criteria"></td>
                            <td><input type="radio" :value="1" v-model.number="criteria"></td>
                            <td><input type="radio" :value="-1" v-model.number="criteria"></td>
                        </tr>
                        <tr>
                            <td>การให้คำแนะนำดูแลนักศึกษาของฝ่ายบุคคล (การปฐมนิเทศ การแนะนำระเบียบวินัย การลางาน สวัสดิการ การจ่ายค่าตอบแทน)</td>
                            <td><input type="radio" :value="5" v-model.number="hrGuidance" required></td>
                            <td><input type="radio" :value="4" v-model.number="hrGuidance"></td>
                            <td><input type="radio" :value="3" v-model.number="hrGuidance"></td>
                            <td><input type="radio" :value="2" v-model.number="hrGuidance"></td>
                            <td><input type="radio" :value="1" v-model.number="hrGuidance"></td>
                            <td><input type="radio" :value="-1" v-model.number="hrGuidance"></td>
                        </tr>
                        <tr>
                            <td>บุคลากรในสถานประกอบการ ให้ความสนใจสนับสนุนและให้ความเป็นกันเองกับนักศึกษา</td>
                            <td><input type="radio" :value="5" v-model.number="employeeSupport" required></td>
                            <td><input type="radio" :value="4" v-model.number="employeeSupport"></td>
                            <td><input type="radio" :value="3" v-model.number="employeeSupport"></td>
                            <td><input type="radio" :value="2" v-model.number="employeeSupport"></td>
                            <td><input type="radio" :value="1" v-model.number="employeeSupport"></td>
                            <td><input type="radio" :value="-1" v-model.number="employeeSupport"></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" class="btn btn-primary">ส่งการประเมิน</button>
            </form>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import config from '../../../../config';

const route = useRoute();
const router = useRouter();
const student = ref(null);
const time = ref('1');

const criteria = ref('');
const hrGuidance = ref('');
const employeeSupport = ref('');

const fetchStudentData = async () => {
    try {
        const response = await axios.get(`${config.api_path}/user/${route.params.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(config.token_name)}`
            }
        });

        student.value = response.data;
    } catch (error) {
        console.error('Error fetching student data:', error);
    }
};

const submitEvaluation = async () => {
    try {
        const evaluatorStatus = localStorage.getItem(config.evaluatorStatus);
        const evaluatorName = `${localStorage.getItem(config.firstName_name)} ${localStorage.getItem(config.token_lastName)}`;
        const payload = {
            evaluatorStatus: evaluatorStatus,
            time: time.value,
            evaluatorName: evaluatorName,
            studentId: student.value.studentID,
            criteria: criteria.value,
            hrGuidance: hrGuidance.value,   
            employeeSupport: employeeSupport.value,   
        };

        const response = await axios.post(`${config.api_path}/data-evaluation-internship-university`, payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(config.token_name)}`
            }
        });

        if (response.data.message === "Success") {
            Swal.fire({
                title: "Success",
                text: "การประเมินสำเร็จ",
                icon: "success",
                timer: 2000
            });

            const userYear = student.value.year;

            if (userYear === "ป.ตรี ปีที่ 2") {
                router.push('/home-evaluation/student-ev-tec2');
            } else if (userYear === "ปวส 2") {
                router.push('/home-evaluation/student-ev-uvcr');
            } else {
                router.push('/home-evaluation/student-ev-vcr2');
            }
        }
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Error submitting evaluation: " + error.message,
            icon: "error"
        });
    }
};

onMounted(() => {
    fetchStudentData();
});
</script>

<style scoped>
.evaluation-container {
    padding: 20px;
}

.evaluation-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.evaluation-table th,
.evaluation-table td {
    border: 1px solid #ddd;
    padding: 8px;
}

.evaluation-table th {
    background-color: #f2f2f2;
    font-weight: bold;
    text-align: center;
}

.form-group {
    margin-bottom: 20px;
}

.form-check-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.form-check {
    display: flex;
    align-items: center;
}

.form-check-label {
    margin-left: 5px;
}

.btn {
    margin-top: 20px;
}
</style>
