<script setup>
import { ref } from 'vue';
import axios from 'axios';
import config from '../../../config';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const router = useRouter();

const userData = JSON.parse(localStorage.getItem('userData') || '{}');

const collegeName = ref('');
const contactFirstName = ref('');
const contactLastName = ref('');
const collegePhone = ref('');
const collegeEmail = ref('');
const collegeAddress = ref('');
const studentID = ref('');
const department = ref('');
const schoolSize = ref('')
const status = ref('');

if (userData.studentID) {
    studentID.value = userData.studentID;
    status.value = userData.status;
    console.log("sss", status.value)
} else {
    console.log('No userData found in localStorage');
}

const handleSubmit = async () => {
    const result = await Swal.fire({
        title: 'เพิ่มข้อมูล',
        text: 'คุณจะไม่สามารถย้อนกลับได้!',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
    });
    if (result.isConfirmed) {
        try {
            const formData = {
                collegeName: collegeName.value,
                contactFirstName: contactFirstName.value,
                contactLastName: contactLastName.value,
                collegePhone: collegePhone.value,
                collegeEmail: collegeEmail.value,
                collegeAddress: collegeAddress.value,
                studentID: studentID.value,
                department: department.value,
                schoolSize: schoolSize.value,
                status: status.value,
            };
            const response = await axios.post(`${config.api_path}/college`, formData);
            if (response.data.message === 'Success') {
                Swal.fire({
                    title: "สำเร็จ",
                    text: "เพิ่มข้อมูลสำเร็จ",
                    icon: "success",
                });
                console.log(response.data.newCollege);
                localStorage.setItem('collegeData', JSON.stringify(response.data.newCollege));
                router.push('/user-index/data-student');
            }
        } catch (error) {
            Swal.fire({
                title: "error",
                text: "Creating Data College Error: " + error.message,
                icon: "error"
            });
            console.log(error);
        }
    }
};
</script>

<template>
    <div>
        <div class="flex-grow-1 p-3">
            <h3>แบบฟอร์มลงทะเบียนขอออกฝึกสอน</h3>
            <div class="card">
                <div class="card-body">
                    <form @submit.prevent="handleSubmit">
                        <div class="row mb-4">
                            <div class="col">
                                <div data-mdb-input-init class="form-outline">
                                    <label class="form-label" for="collegeName">ชื่อวิทยาลัย
                                        <span class="text-red">*</span></label>
                                    <input type="text" id="collegeName" class="form-control" v-model="collegeName"
                                        required />
                                </div>
                            </div>
                        </div>

                        <label class="form-label" for="contactInfo">ข้อมูลผู้ประสานงานวิทยาลัย</label>
                        <!-- Text input -->
                        <div data-mdb-input-init class="form-outline row mb-4 ">
                            <div class="col">
                                <label class="form-label" for="contactFirstName">ชื่อ <span
                                        class="text-red">*</span></label>
                                <input type="text" id="contactFirstName" class="form-control" v-model="contactFirstName"
                                    required />
                            </div>
                            <div class="col">
                                <label class="form-label" for="contactLastName">นามสกุล <span
                                        class="text-red">*</span></label>
                                <input type="text" id="contactLastName" class="form-control" v-model="contactLastName"
                                    required />
                            </div>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <label class="form-label" for="collegePhone">เบอร์โทรศัพท์ <span
                                    class="text-red">*</span></label>
                            <input type="tel" id="collegePhone" class="form-control" v-model="collegePhone"
                                maxlength="10" required />
                        </div>

                        <!-- Email input -->
                        <div data-mdb-input-init class="form-outline mb-4">
                            <label class="form-label" for="collegeEmail">Email </label>
                            <input type="email" id="collegeEmail" class="form-control" v-model="collegeEmail" />
                        </div>

                        <!-- StudentID input -->
                        <div data-mdb-input-init class="form-outline mb-4">
                            <label class="form-label" for="studentID">Student ID <span class="text-red">*</span></label>
                            <input type="text" id="studentID" class="form-control" v-model="studentID" disabled />
                        </div>

                        <!-- Department input -->
                        <div data-mdb-input-init class="form-outline mb-4">
                            <label class="form-label" for="department">แผนกวิชาที่นักศึกษาเข้ารับการฝึกประสบการณ์วิชาชีพ
                                <span class="text-red">*</span></label>
                            <select id="department" class="form-select" v-model="department" required>
                                <option value="" disabled>กรุณาเลือก</option>
                                <option value="แผนกวิชาเทคนิคพื้นฐาน">แผนกวิชาเทคนิคพื้นฐาน</option>
                                <option value="แผนกวิชาเทคโนโลยีคอมพิวเตอร์">แผนกวิชาเทคโนโลยีคอมพิวเตอร์</option>
                                <option value="แผนกวิชาช่างเทคนิคพื้นฐาน">แผนกวิชาช่างเทคนิคพื้นฐาน</option>
                                <option value="แผนกวิชาแมคคาทอ닉ส์">แผนกวิชาแมคคาทอนิกส์</option>
                                <option value="แผนกวิชาช่างกลโรงงาน">แผนกวิชาช่างกลโรงงาน</option>
                                <option value="แผนกวิชาช่างก่อสร้าง">แผนกวิชาช่างก่อสร้าง</option>
                                <option value="แผนกวิชาช่างเชื่อมโลหะ">แผนกวิชาช่างเชื่อมโลหะ</option>
                                <option value="แผนกวิชาช่างเทคนิคอุตสาหกรรม">แผนกวิชาช่างเทคนิคอุตสาหกรรม</option>
                                <option value="แผนกวิชาช่างไฟฟ้า">แผนกวิชาช่างไฟฟ้า</option>
                                <option value="แผนกวิชาช่างไฟฟ้ากำลัง">แผนกวิชาช่างไฟฟ้ากำลัง</option>
                                <option value="แผนกวิชาช่างยนต์">แผนกวิชาช่างยนต์</option>
                                <option value="แผนกวิชาช่างโยธา">แผนกวิชาช่างโยธา</option>
                                <option value="แผนกวิชาช่างสถาปัตยกรรม">แผนกวิชาช่างสถาปัตยกรรม</option>
                                <option value="แผนกวิชาช่างอิเล็กทรอนิกส์">แผนกวิชาช่างอิเล็กทรอนิกส์</option>
                                <option value="แผนกวิชาเทคโนโลยีคอมพิวเตอร์">แผนกวิชาเทคโนโลยีคอมพิวเตอร์</option>
                                <option value="แผนกวิชาคอมพิวเตอร์ธุรกิจ">แผนกวิชาคอมพิวเตอร์ธุรกิจ</option>
                            </select>
                        </div>

                        <!-- SchoolSize Input -->

                        <div class="form-outline mb-4">
                            <label class="form-label" for="schoolSize">ขนาดสถานศึกษา</label>
                            <select id="schoolSize" class="form-select" v-model="schoolSize" required>
                                <option value="" disabled>-</option>
                                <option value="สถานศึกษาขนาดเล็ก">สถานศึกษาขนาดเล็ก</option>
                                <option value="สถานศึกษาขนาดกลาง">สถานศึกษาขนาดกลาง</option>
                                <option value="สถานศึกษาขนาดใหญ่">สถานศึกษาขนาดใหญ่</option>
                                <option value="สถานศึกษาขนาดใหญ่พิเศษ">สถานศึกษาขนาดใหญ่พิเศษ
                                </option>
                            </select>
                        </div>


                        <!-- Message input -->
                        <div data-mdb-input-init class="form-outline mb-4">
                            <label class="form-label" for="collegeAddress">ที่ตั้งวิทยาลัย <span
                                    class="text-red">*</span></label>
                            <textarea class="form-control" id="collegeAddress" rows="4" v-model="collegeAddress"
                                required></textarea>
                        </div>

                        <!-- Submit button -->
                        <button type="submit" class="btn btn-primary btn-block mb-4">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.form-outline {
    margin-bottom: 1rem;
}
</style>
