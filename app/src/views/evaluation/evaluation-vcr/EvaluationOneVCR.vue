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
                โปรดบันทึกหมายเลข 5, 4, 3, 2, 1, หรือ -1 ตามความคิดเห็นของแต่ละหัวข้อการประเมิน โดยใช้เกณฑ์การประเมินค่าสำหรับระดับความคิดเห็นดังนี้ <br>
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
                        <tr v-for="(criterion, index) in criteria" :key="index">
                            <td>{{ criterion.label }}</td>
                            <td v-for="score in [5, 4, 3, 2, 1, -1]" :key="score">
                                <input type="radio" :id="'criterion' + index + '-' + score" :name="'criterion' + index"
                                    v-model="criterion.score" :value="score" required>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div>
                    <h5>ปริมาณงานและคุณภาพงานที่นักศึกษาได้รับมอบหมาย</h5>
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
                        <tr v-for="(criterion, index) in communityCriteria" :key="'community' + index">
                            <td>{{ criterion.label }}</td>
                            <td v-for="score in [5, 4, 3, 2, 1, -1]" :key="score">
                                <input type="radio" :id="'community' + index + '-' + score" :name="'community' + index"
                                    v-model="criterion.score" :value="score" required>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div>
                    <h5>การมอบหมายงานและนิเทศงานของผู้นิเทศงานในสถานประกอบการ</h5>
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
                        <tr v-for="(criterion, index) in professionalCriteria" :key="'professional' + index">
                            <td>{{ criterion.label }}</td>
                            <td v-for="score in [5, 4, 3, 2, 1, -1]" :key="score">
                                <input type="radio" :id="'professional' + index + '-' + score"
                                    :name="'professional' + index" v-model="criterion.score" :value="score" required>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <h2>ส่วนที่ 2 สำหรับประเมินนักศึกษา</h2>
                <div>
                    <h5>การพัฒนาตนเอง</h5>
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
                        <tr v-for="(criterion, index) in selfDevelopmentCriteria" :key="'selfDevelopment' + index">
                            <td>{{ criterion.label }}</td>
                            <td v-for="score in [5, 4, 3, 2, 1, -1]" :key="score">
                                <input type="radio" :id="'selfDevelopment' + index + '-' + score" :name="'selfDevelopment' + index"
                                    v-model="criterion.score" :value="score" required>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div>
                    <h5>การมีส่วนร่วมกับองค์กร</h5>
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
                        <tr v-for="(criterion, index) in organizationParticipationCriteria" :key="'organizationParticipation' + index">
                            <td>{{ criterion.label }}</td>
                            <td v-for="score in [5, 4, 3, 2, 1, -1]" :key="score">
                                <input type="radio" :id="'organizationParticipation' + index + '-' + score" :name="'organizationParticipation' + index"
                                    v-model="criterion.score" :value="score" required>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div>
                    <h5>ความประพฤติ คุณธรรม จริยธรรม และการปฏิบัติตามระเบียบวินัยขององค์กร</h5>
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
                        <tr v-for="(criterion, index) in ethicsCriteria" :key="'ethics' + index">
                            <td>{{ criterion.label }}</td>
                            <td v-for="score in [5, 4, 3, 2, 1, -1]" :key="score">
                                <input type="radio" :id="'ethics' + index + '-' + score" :name="'ethics' + index"
                                    v-model="criterion.score" :value="score" required>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div>
                    <h5>ความรู้ความสามารถพื้นฐานที่จำเป็นต่อการปฏิบัติงานที่ได้รับมอบหมายให้สำเร็จ</h5>
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
                        <tr v-for="(criterion, index) in basicSkillsCriteria" :key="'basicSkills' + index">
                            <td>{{ criterion.label }}</td>
                            <td v-for="score in [5, 4, 3, 2, 1, -1]" :key="score">
                                <input type="radio" :id="'basicSkills' + index + '-' + score" :name="'basicSkills' + index"
                                    v-model="criterion.score" :value="score" required>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div>
                    <h5>ความก้าวหน้าของการจัดทำรายงาน</h5>
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
                        <tr v-for="(criterion, index) in reportProgressCriteria" :key="'reportProgress' + index">
                            <td>{{ criterion.label }}</td>
                            <td v-for="score in [5, 4, 3, 2, 1, -1]" :key="score">
                                <input type="radio" :id="'reportProgress' + index + '-' + score" :name="'reportProgress' + index"
                                    v-model="criterion.score" :value="score" required>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- <div>
                    <h5>สรุปโดยรวมของนักศึกษา</h5>
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
                        <tr v-for="(criterion, index) in overallCriteria" :key="'overall' + index">
                            <td>{{ criterion.label }}</td>
                            <td v-for="score in [5, 4, 3, 2, 1, -1]" :key="score">
                                <input type="radio" :id="'overall' + index + '-' + score" :name="'overall' + index"
                                    v-model="criterion.score" :value="score" required>
                            </td>
                        </tr>
                    </tbody>
                </table> -->

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

const criteria = ref([
    { label: 'การประสานงานด้านการจัดการดูแลนักศึกษาในสถานประกอบการ ระหว่างบุคคล และผู้นิเทศงานในสถานประกอบการ', score: null },
    { label: 'การให้คำแนะนำดูแลนักศึกษาของฝ่ายบุคคล (การปฐมนิเทศ การแนะนำระเบียบวินัย การลางาน สวัสดิการ การจ่ายค่าตอบแทน)', score: null },
    { label: 'บุคลากรในสถานประกอบการ ให้ความสนใจสนับสนุนและให้ความเป็นกันเองกับนักศึกษา', score: null },
    // เพิ่มหัวข้อการประเมินเพิ่มเติมได้ที่นี่
]);

const communityCriteria = ref([
    { label: 'ปริมาณงานที่ได้รับมอบหมาย', score: null },
    { label: 'คุณลักษณะงานที่ได้รับมอบหมายตรงกับสาขาวิชาเอกของนักศึกษา', score: null },
    { label: 'งานที่ได้รับมอบหมายตรงกับที่สถานประกอบการเสนอไว้', score: null },
    { label: 'งานที่ได้รับมอบหมายตรงกับความสนใจของนักศึกษา', score: null },
    { label: 'ความเหมาะสมของหัวข้อรายงานที่นักศึกษาได้รับ', score: null },
    // เพิ่มหัวข้อการประเมินเพิ่มเติมได้ที่นี่
]);

const professionalCriteria = ref([
    { label: 'มีผู้นิเทศงานในสถานประกอบการดูแลนักศึกษาตั้งแต่วันแรกที่ทำงาน', score: null },
    { label: 'ความรู้และประสบการณ์วิชาชีพของผู้นิเทศงานในสถานประกอบการ', score: null },
    { label: 'เวลาผู้นิเทศงานในสถานประกอบการให้แก่นักศึกษาด้านการปฏิบัติงาน', score: null },
    { label: 'เวลาผู้นิเทศงานในสถานประกอบการให้แก่นักศึกษาด้านการเขียนรายงาน', score: null },
    { label: 'ความสนใจของผู้นิเทศงานในสถานประกอบการต่อการสอนงานและสั่งงาน', score: null },
    { label: 'การให้ความสำคัญต่อการประเมินผลการปฏิบัติงานและเขียนรายงานของผู้นิเทศงานในสถานประกอบการ', score: null },
    { label: 'การจัดทำแผนปฏิบัติงานตลอดระยะเวลาของการปฏิบัติงานให้กับนักศึกษา', score: null },
    // เพิ่มหัวข้อการประเมินเพิ่มเติมได้ที่นี่
]);

const selfDevelopmentCriteria = ref([
    { label: 'บุคลิกภาพ', score: null },
    { label: 'วุฒิภาวะ', score: null },
    { label: 'การปรับตัว', score: null },
    { label: 'การเรียนรู้', score: null },
    { label: 'การแสดงความคิดเห็น', score: null },
    { label: 'มนุษย์สัมพันธ์', score: null },
    { label: 'ทัศนคติ', score: null },
    // เพิ่มหัวข้อการประเมินเพิ่มเติมได้ที่นี่
]);

const organizationParticipationCriteria = ref([
    { label: 'การมีส่วนร่วมกับองค์กร', score: null },
    // { label: 'การแสดงออกทางความคิดและข้อเสนอแนะในที่ประชุม', score: null },
    // เพิ่มหัวข้อการประเมินเพิ่มเติมได้ที่นี่
]);

const ethicsCriteria = ref([
    { label: 'ความประพฤติ คุณธรรม จริยธรรม และการปฏิบัติตามระเบียบวินัยขององค์กร', score: null },
    // { label: 'การปฏิบัติตนเป็นตัวอย่างที่ดีในด้านความซื่อสัตย์และความรับผิดชอบ', score: null },
    // เพิ่มหัวข้อการประเมินเพิ่มเติมได้ที่นี่
]);

const basicSkillsCriteria = ref([
    { label: 'ความรู้และทักษะพื้นฐานที่จำเป็นต่อการปฏิบัติงาน มอบหมายงานให้สำเร็จ', score: null },
    // { label: 'การนำความรู้และทักษะไปประยุกต์ใช้ในงานที่ได้รับมอบหมาย', score: null },
    // เพิ่มหัวข้อการประเมินเพิ่มเติมได้ที่นี่
]);

const reportProgressCriteria = ref([
    { label: 'ความก้าวหน้าและความสมบูรณ์ของการจัดทำรายงาน', score: null },
    // { label: 'การสื่อสารข้อมูลในรายงานอย่างชัดเจนและเป็นระบบ', score: null },
    // เพิ่มหัวข้อการประเมินเพิ่มเติมได้ที่นี่
]);

// const overallCriteria = ref([
    // { label: 'การประเมินโดยรวมของนักศึกษา', score: null },
    // { label: 'ข้อเสนอแนะในการปรับปรุงและพัฒนานักศึกษา', score: null },
    // เพิ่มหัวข้อการประเมินเพิ่มเติมได้ที่นี่
// ]);

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
            criteria: criteria.value.concat(communityCriteria.value).concat(professionalCriteria.value)
                       .concat(selfDevelopmentCriteria.value).concat(organizationParticipationCriteria.value)
                       .concat(ethicsCriteria.value).concat(basicSkillsCriteria.value).concat(reportProgressCriteria.value)
                    //    .concat(overallCriteria.value)
        };

        const response = await axios.post(`${config.api_path}/data-evaluation-internship`, payload, {
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
