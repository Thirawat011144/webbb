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
const studentID = ref('')
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
                status: status.value
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
