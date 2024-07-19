<script setup>
import axios from "axios";
import { ref, onMounted, computed } from 'vue';
import config from "../../../../config";
import Swal from 'sweetalert2';
import { useRoute, useRouter } from 'vue-router';
// import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';
// ฟังก์ชันสำหรับการดาวน์โหลดไฟล์ Excel
import { format } from 'date-fns';

const users = ref([]);
const isModalVisible = ref(false);
const modalData = ref(null);
const evaluationData = ref([]); // เพิ่มการประกาศตัวแปร evaluationData

const fetchData = async () => {
    try {
        const [userResponse, evaluationResponse] = await Promise.all([
            axios.get(`${config.api_path}/users`),
            axios.get(`${config.api_path}/data-evaluation`)
        ]);
        users.value = userResponse.data.filter(user => user.status === "ผ่าน" && user.year === "ป.ตรี ปีที่ 4");
        evaluationData.value = evaluationResponse.data;
    } catch (error) {
        Swal.fire({
            title: "error",
            text: (error.message, "Cr2 Error"),
            icon: "error"
        });
    }
};

// modal
const showModal = async (id) => {
    isModalVisible.value = true;
    try {
        const response = await axios.get(`${config.api_path}/user/${id}`);
        const user = response.data;

        // หาข้อมูลการประเมินที่เกี่ยวข้องกับ studentID
        const evaluation = evaluationData.value.find(e => e.studentId === user.studentID);
        modalData.value = { ...user, evaluation };
    } catch (error) {
        Swal.fire({
            title: "error",
            text: (error.message, "Cr2 Error Fetching Data"),
            icon: 'error'
        });
    }
};

const closeModal = () => {
    isModalVisible.value = false;
    modalData.value = null;
};

// ฟังก์ชันสำหรับการลบข้อมูล
const removeData = async (id) => {
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



const downloadExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Students');

    worksheet.columns = [
        { header: 'ประทับเวลา', key: 'timestamp', width: 30 },
        { header: 'ชื่อ - สกุล(ผู้ประเมิน)', key: 'evaluatorName', width: 30 },
        { header: 'เบอร์โทรศัพท์', key: 'phoneNumber', width: 15 },
        { header: 'ชื่อสถานศึกษาที่นักศึกษาเข้ารับการฝึก', key: 'collegeName', width: 50 },
        { header: 'แผนกสาขาวิชาที่นักศึกษาเข้ารับการฝึก', key: 'department', width: 50 },
        { header: 'ขนาดสถานศึกษา', key: 'schoolSize', width: 20 },
        { header: 'สถานะผู้ประเมินสมรรถวิชาชีพ', key: 'evaluatorStatus', width: 30 },
        { header: 'รอบการประเมิน', key: 'time', width: 20 },
        { header: 'สาขาวิชาที่นักศึกษากำลังศึกษา', key: 'branch', width: 30 },
        { header: 'รายชื่อนักศึกษา', key: 'studentName', width: 30 },
        { header: 'รหัสนักศึกษา', key: 'studentID', width: 20 },
        { header: 'สามารถวิเคราะห์ความสอดคล้องของสาระการเรียนรู้กับมาตรฐานการเรียนรู้ของหลักสูตร แกนกลางและหลักสูตรสถานศึกษา', key: 'criteria', width: 50 },
        { header: 'สามารถวิเคราะห์ความสอดคล้องของสาระการเรียนรู้เพื่อพัฒนาผู้เรียนให้มีปัญญารู้คิดและมีความเป็นนวัตกร', key: 'innovationAlignment', width: 50 },
        { header: 'สามารถเขียนแผนการจัดการเรียนรู้เพื่อพัฒนาผู้เรียนให้มีปัญญารู้คิดและมีความเป็นนวัตกร', key: 'learningPlan', width: 50 },
        { header: 'สามารถจัดการเรียนรู้ให้เป็นไปตามแผนการจัดการเรียนรู้เพื่อพัฒนาผู้เรียนให้มีปัญญารู้คิดและมีความเป็นนวัตกร', key: 'innovativeLearningPlan', width: 50 },
        { header: 'สามารถจัดกิจกรรมและสร้างบรรยากาศการเรียนรู้ให้ผู้เรียนมีความสุขในการเรียน', key: 'joyfulLearningActivities', width: 50 },
        { header: 'จัดกิจกรรมและสร้างบรรยากาศการเรียนรู้ให้ผู้เรียนโดยตระหนักถึงสุขภาวะของผู้เรียน', key: 'learnerWellbeingActivities', width: 50 },
        { header: 'สามารถดูแล ช่วยเหลือ และพัฒนาผู้เรียนเป็นรายบุคคลตามศักยภาพ', key: 'individualStudentDevelopment', width: 50 },
        { header: 'สามารถรายงานผลการพัฒนาคุณภาพผู้เรียนได้อย่างเป็นระบบ', key: 'systematicQualityReporting', width: 50 },
        { header: 'สามารถทำวิจัยที่สอดคล้องกับปัญหาของผู้เรียน', key: 'studentProblemResearch', width: 50 },
        { header: 'สามารถประยุกต์ใช้เทคโนโลยีดิจิทัลในการจัดการเรียนรู้ เช่น CAI, google classroom, Kahoot เป็นต้น', key: 'digitalLearningTools', width: 50 },
        { header: 'สามารถปฏิบัติงานร่วมกับผู้อื่นอย่างสร้างสรรค์', key: 'collaborativeCreativity', width: 50 },
        { header: 'มีส่วนร่วมในกิจกรรมการพัฒนาวิชาชีพ', key: 'professionalGrowthActivities', width: 50 },
        { header: 'ข้อเสนอแนะ', key: 'additionalComments', width: 50 }
    ];

    sortedUsers.value.forEach(user => {
        const evaluations = evaluationData.value.filter(e => e.studentId === user.studentID);
        evaluations.forEach(evaluation => {
            const formattedDate = evaluation.createdAt ? format(new Date(evaluation.createdAt), 'dd/MM/yyyy, HH:mm:ss') : '';
            worksheet.addRow({
                timestamp: formattedDate,
                evaluatorName: evaluation.evaluatorName || '',
                phoneNumber: evaluation.phoneNumber || '',
                collegeName: user.collegeDetails?.collegeName || '',
                department: user.collegeDetails?.department || '',
                schoolSize: user.collegeDetails?.schoolSize || '',
                evaluatorStatus: evaluation.evaluatorStatus || '',
                time: evaluation.time || '',
                branch: user.branch,
                studentName: `${user.firstName} ${user.lastName}`,
                studentID: user.studentID,
                criteria: evaluation.criteria || '',
                innovationAlignment: evaluation.innovationAlignment || '',
                learningPlan: evaluation.learningPlan || '',
                innovativeLearningPlan: evaluation.innovativeLearningPlan || '',
                joyfulLearningActivities: evaluation.joyfulLearningActivities || '',
                learnerWellbeingActivities: evaluation.learnerWellbeingActivities || '',
                individualStudentDevelopment: evaluation.individualStudentDevelopment || '',
                systematicQualityReporting: evaluation.systematicQualityReporting || '',
                studentProblemResearch: evaluation.studentProblemResearch || '',
                digitalLearningTools: evaluation.digitalLearningTools || '',
                collaborativeCreativity: evaluation.collaborativeCreativity || '',
                professionalGrowthActivities: evaluation.professionalGrowthActivities || '',
                additionalComments: evaluation.additionalComments || ''
            });
        });
    });

    // Apply styles to all cells
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        row.eachCell({ includeEmpty: false }, (cell) => {
            cell.font = { name: 'TH Sarabun New', size: 16 };
            cell.alignment = { horizontal: 'center' };
        });
        // Apply bold and background color to header row
        if (rowNumber === 1) {
            row.eachCell((cell) => {
                cell.font = { name: 'TH Sarabun New', size: 16, bold: true };
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFCCCCCC' } // Gray background
                };
                cell.alignment = { horizontal: 'center' };
            });
        }
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'students.xlsx';
        link.click();
    });
};


onMounted(() => {
    fetchData();
});

</script>


<template>
    <section class="content">
        <div class="card">
            <div class="card-header">
                <div class="card-title mb-2">ข้อมูลนักศึกษาชั้นปริญาตรีชั้นปีที่ 4 (ผ่าน)
                    <div>
                        <router-link :to="`/admin-index/Ec4-req`"> <button
                                class="btn btn-primary m-1">ขออนุมัติ</button></router-link>
                        <router-link :to="`/admin-index/Ec4-approved`"> <button
                                class="btn btn-success m-1">อนุมัติ</button></router-link>
                        <router-link :to="`/admin-index/Ec4-active`"> <button
                                class="btn btn-warning m-1">เข้ารับการฝึก</button></router-link>
                        <router-link :to="`/admin-index/Ec4-success`"> <button
                                class="btn btn-success m-1">ผ่าน</button></router-link>
                        <router-link :to="`/admin-index/Ec4-notpass`"> <button
                                class="btn btn-danger m-1">ไม่ผ่าน</button></router-link>
                        <button class="btn btn-info m-1" @click="downloadExcel">ดาวน์โหลด Excel</button>
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
                            <th class="text-center">ข้อมูลสถานประกอบการ</th>
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
                            <td class="text-center">
                                <button class="btn btn-success" @click="showModal(user.id)">ดูข้อมูล</button>
                                <router-link :to="`data-tec4-admin/${user.id}`">
                                    <button class="btn btn-success m-1">ข้อมูลการประเมิน</button>
                                </router-link>
                            </td>
                            <td>
                                <router-link :to="`/edit-ec4/${user.id}`">
                                    <button class="btn btn-primary m-1"><i
                                            class="fa-solid fa-pen-to-square"></i></button>
                                </router-link>
                                <button @click="removeData(user.id)" class="btn btn-danger m-1"><i
                                        class="fa-solid fa-trash-can"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- Modal -->
        <div v-if="isModalVisible" class="modal fade show" tabindex="-1" style="display: block;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="infoModalLabel">ข้อมูลผู้ใช้</h5>
                        <button type="button" class="btn-close" @click="isModalVisible = false"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body" v-if="modalData">
                        <p>รหัสนักศึกษา: {{ modalData.studentID }}</p>
                        <p>ชื่อ-นามสกุล: {{ modalData.firstName }} {{ modalData.lastName }}</p>
                        <p>สาขา: {{ modalData.branch }}</p>
                        <p>ชั้นปี: {{ modalData.year }}</p>
                        <p>สถานะ: {{ modalData.status }}</p>
                        <p>เบอร์โทรศัพท์: {{ modalData.phoneNumber }}</p>
                        <p v-if="modalData.email">Email: {{ modalData.email }}</p>
                        <p v-else></p>
                        <div v-if="modalData.evaluation">
                            <p class="text-bold">ข้อมูลการประเมิน</p>
                            <p>ชื่อผู้ประเมิน: {{ modalData.evaluation.evaluatorName }}</p>
                            <p>สถานะผู้ประเมิน: {{ modalData.evaluation.evaluatorStatus }}</p>
                            <p>เวลา: {{ modalData.evaluation.time }}</p>
                            <p>การประเมิน: {{ modalData.evaluation.criteria ?
                                JSON.stringify(modalData.evaluation.criteria) : '' }}</p>
                        </div>
                        <div v-if="modalData.collegeDetails">
                            <p class="text-bold">ข้อมูลสถานที่ฝึกประสบการณ์</p>
                            <p>โรงเรียน/วิทยาลัย: {{ modalData.collegeDetails.collegeName }}</p>
                            <p>ชื่อ-นามสกุลผู้ประสานงาน: {{ modalData.collegeDetails.contactFirstName }} {{
                                modalData.collegeDetails.contactLastName }}</p>
                            <p>เบอร์โทรศัพท์: {{ modalData.collegeDetails.collegePhone }}</p>
                            <p v-if="modalData.collegeDetails.collegeEmail">Email: {{
                                modalData.collegeDetails.collegeEmail }}</p>
                            <p v-else></p>
                            <p>ที่ตั้งวิทยาลัย: {{ modalData.collegeDetails.collegeAddress }}</p>

                        </div>
                        <div v-else>
                            <p>ไม่มีข้อมูลสถานประกอบการ</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal">ปิด</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800&display=swap');

body {
    font-family: 'Sarabun', sans-serif;
}
</style>
