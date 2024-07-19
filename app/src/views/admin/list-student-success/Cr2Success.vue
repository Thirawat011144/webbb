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
const universityEvaluationData = ref([]); // เพิ่มการประกาศตัวแปร universityEvaluationData

const fetchData = async () => {
    try {
        const [userResponse, evaluationResponse, universityEvaluationResponse] = await Promise.all([
            axios.get(`${config.api_path}/users`),
            axios.get(`${config.api_path}/data-evaluation-internship`),
            axios.get(`${config.api_path}/data-evaluation-internship-university`) // เพิ่มการดึงข้อมูลจาก API
        ]);
        users.value = userResponse.data.filter(user => user.status === "ผ่าน" && user.year === "ปวช 3");
        evaluationData.value = evaluationResponse.data;
        universityEvaluationData.value = universityEvaluationResponse.data; // เก็บข้อมูลที่ได้จาก API
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
        { header: 'ชื่อสถานประกอบการที่นักศึกษาเข้ารับการฝึก', key: 'companyName', width: 50 },
        { header: 'แผนกที่นักศึกษาเข้ารับการฝึก', key: 'department', width: 50 },
        { header: 'สถานะผู้ประเมินสมรรถวิชาชีพ', key: 'evaluatorStatus', width: 30 },
        { header: 'รอบการประเมิน', key: 'time', width: 20 },
        { header: 'สาขาวิชาที่นักศึกษากำลังศึกษา', key: 'branch', width: 30 },
        { header: 'รายชื่อนักศึกษา', key: 'studentName', width: 30 },
        { header: 'รหัสนักศึกษา', key: 'studentID', width: 20 },
        { header: 'คะแนนรวม', key: 'totalScore', width: 20 },
        { header: 'คิดเป็นร้อยละ', key: 'averageScore', width: 20 },
        { header: 'ปริมาณงาน (Quantity Of Work) ปริมาณงานที่ปฏิบัติสำเร็จตามหน้าที่หรือตามที่ได้รับมอบหมายภายในระยะเวลาที่กำหนด (ในระดับที่นักศึกษาจะปฏิบัติได้) และเทียบกับนักศึกษาทั่ว ๆ ไป', key: 'criteria', width: 100 },
        { header: 'คุณภาพงาน (Quality Of Work) ทำงานได้ถูกต้องครบถ้วนสมบูรณ์ มีความประณีตเรียบร้อย มีความรอบคอบ ไม่เกิดปัญหาติดตามมา งานไม่ค้าง ทำงานเสร็จทันเวลาหรือก่อนเวลาที่กำหนด', key: 'qualityOfWork', width: 100 },
        { header: 'ความรู้ความสามารถทั่วไป (General Knowledge) การใช้ความรู้ความสามารถพื้นฐานในการปฏิบัติงาน', key: 'generalKnowledge', width: 100 },
        { header: 'ความรู้ความสามารถเฉพาะด้าน (Specific Knowledge) การใช้ความรู้ความสามารถเฉพาะทางในการปฏิบัติงาน', key: 'specificKnowledge', width: 100 },
        { header: 'ความรับผิดชอบในหน้าที่ (Responsibility) การทำงานอย่างมีความรับผิดชอบ', key: 'responsibility', width: 100 },
        { header: 'ความรับผิดชอบต่อทีม (Team Responsibility) การทำงานร่วมกับทีมและสนับสนุนเพื่อนร่วมงาน', key: 'teamResponsibility', width: 100 },
        { header: 'การประพฤติปฏิบัติตน (Conduct) ความสุภาพเรียบร้อยและความมีวินัย', key: 'conduct', width: 100 },
        { header: 'การแก้ไขปัญหา (Problem Solving) การจัดการและแก้ไขปัญหาในงาน', key: 'problemSolving', width: 100 },
        { header: 'จุดเด่นของนักศึกษา/Strength', key: 'strength', width: 100 },
        { header: 'ข้อควรปรับปรุงของนักศึกษา/Improvement', key: 'improvement', width: 100 },
        { header: 'หากนักศึกษาผู้นี้สำเร็จการศึกษาแล้ว ท่านจะรับเข้าทำงานในสถานประกอบการนี้หรือไม่ (หากมีโอกาสเลือก)', key: 'jobOffer', width: 100 },
        { header: 'ข้อคิดเห็นเพิ่มเติม/Other Comments', key: 'other', width: 100 },
    ];

    sortedUsers.value.forEach(user => {
        const evaluations = evaluationData.value.filter(e => e.studentId === user.studentID);
        evaluations.forEach(evaluation => {
            const formattedDate = evaluation.createdAt ? format(new Date(evaluation.createdAt), 'dd/MM/yyyy, HH:mm:ss') : '';
            console.log(user); // เพิ่มการพิมพ์ข้อมูล user เพื่อดูโครงสร้าง
            console.log(evaluation); // เพิ่มการพิมพ์ข้อมูล evaluation เพื่อดูโครงสร้าง
            worksheet.addRow({
                timestamp: formattedDate,
                evaluatorName: evaluation.evaluatorName || '',
                phoneNumber: evaluation.phoneNumber || '',
                companyName: user.companyDetails?.companyName || 'ไม่มีข้อมูล', // เพิ่มค่าเริ่มต้นเป็น 'ไม่มีข้อมูล'
                department: user.companyDetails?.companyDepartment || 'ไม่มีข้อมูล', // เพิ่มค่าเริ่มต้นเป็น 'ไม่มีข้อมูล'
                evaluatorStatus: evaluation.evaluatorStatus || '',
                time: evaluation.time || '',
                branch: user.branch,
                studentName: `${user.firstName} ${user.lastName}`,
                studentID: user.studentID,

                totalScore: `${evaluation.totalScore || 'ไม่มีข้อมูล'}`,
                averageScore: `${evaluation.averageScore || 'ไม่มีข้อมูล'}% `,

                criteria: evaluation.criteria || 'ไม่มีข้อมูล',
                qualityOfWork: evaluation.qualityOfWork || 'ไม่มีข้อมูล',
                generalKnowledge: evaluation.generalKnowledge || 'ไม่มีข้อมูล',
                specificKnowledge: evaluation.specificKnowledge || 'ไม่มีข้อมูล',
                responsibility: evaluation.responsibility || 'ไม่มีข้อมูล',
                teamResponsibility: evaluation.teamResponsibility || 'ไม่มีข้อมูล',
                conduct: evaluation.conduct || 'ไม่มีข้อมูล',
                problemSolving: evaluation.problemSolving || 'ไม่มีข้อมูล',
                strength: evaluation.strength || 'ไม่มีข้อมูล',
                improvement: evaluation.improvement || 'ไม่มีข้อมูล',
                jobOffer: evaluation.jobOffer || 'ไม่มีข้อมูล',
                other: evaluation.other || 'ไม่มีข้อมูล',
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


const downloadExcelUniversity = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('StudentsForUniversity');

    worksheet.columns = [
        { header: 'ประทับเวลา', key: 'timestamp', width: 30 },
        { header: 'ชื่อ - สกุล(ผู้ประเมิน)', key: 'evaluatorName', width: 30 },
        { header: 'เบอร์โทรศัพท์', key: 'phoneNumber', width: 15 },
        { header: 'ชื่อสถานประกอบการที่นักศึกษาเข้ารับการฝึก', key: 'companyName', width: 50 },
        { header: 'แผนกที่นักศึกษาเข้ารับการฝึก', key: 'department', width: 50 },
        { header: 'สถานะผู้ประเมินสมรรถวิชาชีพ', key: 'evaluatorStatus', width: 30 },
        { header: 'รอบการประเมิน', key: 'time', width: 20 },
        { header: 'สาขาวิชาที่นักศึกษากำลังศึกษา', key: 'branch', width: 30 },
        { header: 'รายชื่อนักศึกษา', key: 'studentName', width: 30 },
        { header: 'รหัสนักศึกษา', key: 'studentID', width: 20 },
        { header: 'รหัสนักศึกษา', key: 'studentID', width: 20 },
        { header: 'การประสานงานด้านการจัดการดูแลนักศึกษาในสถานประกอบการ ระหว่างบุคคล และผู้นิเทศงานในสถานประกอบการ', key: 'criteria', width: 20 },
        { header: 'การให้คำแนะนำดูแลนักศึกษาของฝ่ายบุคคล (การปฐมนิเทศ การแนะนำระเบียบวินัย การลางาน สวัสดิการ การจ่ายค่าตอบแทน)', key: 'hrGuidance', width: 20 },
        { header: 'บุคลากรในสถานประกอบการ ให้ความสนใจสนับสนุนและให้ความเป็นกันเองกับนักศึกษา', key: 'employeeSupport', width: 20 },
        // { header: 'คะแนนรวม', key: 'totalScore', width: 20 },
        // { header: 'คิดเป็นร้อยละ', key: 'averageScore', width: 20 },
        // { header: 'ปริมาณงาน (Quantity Of Work) ปริมาณงานที่ปฏิบัติสำเร็จตามหน้าที่หรือตามที่ได้รับมอบหมายภายในระยะเวลาที่กำหนด (ในระดับที่นักศึกษาจะปฏิบัติได้) และเทียบกับนักศึกษาทั่ว ๆ ไป', key: 'criteria', width: 100 },
        // { header: 'คุณภาพงาน (Quality Of Work) ทำงานได้ถูกต้องครบถ้วนสมบูรณ์ มีความประณีตเรียบร้อย มีความรอบคอบ ไม่เกิดปัญหาติดตามมา งานไม่ค้าง ทำงานเสร็จทันเวลาหรือก่อนเวลาที่กำหนด', key: 'qualityOfWork', width: 100 },
        // { header: 'ความรู้ความสามารถทั่วไป (General Knowledge) การใช้ความรู้ความสามารถพื้นฐานในการปฏิบัติงาน', key: 'generalKnowledge', width: 100 },
        // { header: 'ความรู้ความสามารถเฉพาะด้าน (Specific Knowledge) การใช้ความรู้ความสามารถเฉพาะทางในการปฏิบัติงาน', key: 'specificKnowledge', width: 100 },
        // { header: 'ความรับผิดชอบในหน้าที่ (Responsibility) การทำงานอย่างมีความรับผิดชอบ', key: 'responsibility', width: 100 },
        // { header: 'ความรับผิดชอบต่อทีม (Team Responsibility) การทำงานร่วมกับทีมและสนับสนุนเพื่อนร่วมงาน', key: 'teamResponsibility', width: 100 },
        // { header: 'การประพฤติปฏิบัติตน (Conduct) ความสุภาพเรียบร้อยและความมีวินัย', key: 'conduct', width: 100 },
        // { header: 'การแก้ไขปัญหา (Problem Solving) การจัดการและแก้ไขปัญหาในงาน', key: 'problemSolving', width: 100 },
        // { header: 'จุดเด่นของนักศึกษา/Strength', key: 'strength', width: 100 },
        // { header: 'ข้อควรปรับปรุงของนักศึกษา/Improvement', key: 'improvement', width: 100 },
        // { header: 'หากนักศึกษาผู้นี้สำเร็จการศึกษาแล้ว ท่านจะรับเข้าทำงานในสถานประกอบการนี้หรือไม่ (หากมีโอกาสเลือก)', key: 'jobOffer', width: 100 },
        // { header: 'ข้อคิดเห็นเพิ่มเติม/Other Comments', key: 'other', width: 100 },
    ];

    sortedUsers.value.forEach(user => {
        const evaluations = universityEvaluationData.value.filter(e => e.studentId === user.studentID);
        evaluations.forEach(evaluation => {
            const formattedDate = evaluation.createdAt ? format(new Date(evaluation.createdAt), 'dd/MM/yyyy, HH:mm:ss') : '';
            console.log(user); // เพิ่มการพิมพ์ข้อมูล user เพื่อดูโครงสร้าง
            console.log(evaluation); // เพิ่มการพิมพ์ข้อมูล evaluation เพื่อดูโครงสร้าง
            worksheet.addRow({
                timestamp: formattedDate,
                evaluatorName: evaluation.evaluatorName || '',
                phoneNumber: evaluation.phoneNumber || '',
                companyName: user.companyDetails?.companyName || 'ไม่มีข้อมูล', // เพิ่มค่าเริ่มต้นเป็น 'ไม่มีข้อมูล'
                department: user.companyDetails?.companyDepartment || 'ไม่มีข้อมูล', // เพิ่มค่าเริ่มต้นเป็น 'ไม่มีข้อมูล'
                evaluatorStatus: evaluation.evaluatorStatus || '',
                time: evaluation.time || '',
                branch: user.branch,
                studentName: `${user.firstName} ${user.lastName}`,
                studentID: user.studentID,
                criteria: evaluation.criteria || 'ไม่มีข้อมูล',
                hrGuidance: evaluation.hrGuidance || 'ไม่มีข้อมูล',
                employeeSupport: evaluation.employeeSupport || 'ไม่มีข้อมูล',

                // totalScore: `${evaluation.totalScore || 'ไม่มีข้อมูล'}`,
                // averageScore: `${evaluation.averageScore || 'ไม่มีข้อมูล'}% `,


                // qualityOfWork: evaluation.qualityOfWork || 'ไม่มีข้อมูล',
                // generalKnowledge: evaluation.generalKnowledge || 'ไม่มีข้อมูล',
                // specificKnowledge: evaluation.specificKnowledge || 'ไม่มีข้อมูล',
                // responsibility: evaluation.responsibility || 'ไม่มีข้อมูล',
                // teamResponsibility: evaluation.teamResponsibility || 'ไม่มีข้อมูล',
                // conduct: evaluation.conduct || 'ไม่มีข้อมูล',
                // problemSolving: evaluation.problemSolving || 'ไม่มีข้อมูล',
                // strength: evaluation.strength || 'ไม่มีข้อมูล',
                // improvement: evaluation.improvement || 'ไม่มีข้อมูล',
                // jobOffer: evaluation.jobOffer || 'ไม่มีข้อมูล',
                // other: evaluation.other || 'ไม่มีข้อมูล',
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
        link.download = 'studentsForUniversity.xlsx';
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
                <div class="card-title mb-2">ข้อมูลนักศึกษาชั้นประกาศนียบัตรวิชาชีพ ชั้นปีที่ 3 (ผ่าน)
                    <div>
                        <router-link :to="`/admin-index/cr2-req`"> <button
                                class="btn btn-primary m-1">ขออนุมัติ</button></router-link>
                        <router-link :to="`/admin-index/vcr2-approved`"> <button
                                class="btn btn-success m-1">อนุมัติ</button></router-link>
                        <router-link :to="`/admin-index/cr2-active`"> <button
                                class="btn btn-warning m-1">กำลังฝึก</button></router-link>
                        <router-link :to="`/admin-index/cr2-success`"> <button class="btn btn-success m-1">ผ่าน</button>
                        </router-link>
                        <router-link :to="`/admin-index/cr2-notpass`"> <button
                                class="btn btn-danger m-1">ไม่ผ่าน</button>
                        </router-link>
                        <button class="btn btn-info m-1" @click="downloadExcel">ดาวน์โหลด Excel</button>
                        <button class="btn btn-info m-1"
                            @click="downloadExcelUniversity">ดาวน์โหลดการประเมินจากมหาวิทยาลัย</button>
                        <button class="btn btn-info m-1" @click="updateAllStatusToCompleted">เสร็จสิ้นทั้งหมด</button>
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
