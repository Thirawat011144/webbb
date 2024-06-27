<script setup>
import axios from "axios";
import { ref } from 'vue';
import config from "../../../config";
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const router = useRouter();

const firstName = ref('');
const lastName = ref('');
const userName = ref('');
const password = ref('');
const phoneNumber = ref('');
const studentID = ref('');
const schoolName = ref('');
const department = ref('');
const schoolSize = ref('');
const courseRelation = ref('');
const evaluatorStatus = ref('');
const currentStudyField = ref('');
const branch = ref(''); // เพิ่มตัวเลือก branch

const handleRegister = async () => {
    try {
        const payload = {
            firstName: firstName.value,
            lastName: lastName.value,
            userName: userName.value,
            password: password.value,
            phoneNumber: phoneNumber.value,
            studentID: studentID.value,
            schoolName: schoolName.value,
            department: department.value,
            schoolSize: schoolSize.value,
            courseRelation: courseRelation.value,
            evaluatorStatus: evaluatorStatus.value,
            currentStudyField: currentStudyField.value,
            branch: branch.value, // เพิ่มตัวเลือก branch ใน payload
        };

        const response = await axios.post(`${config.api_path}/register`, payload);
        if (response.data.message === "Success") {
            Swal.fire({
                title: "Sign Up",
                text: "สมัครบัญชีเรียบร้อยแล้ว",
                icon: "success",
                timer: 2000,
            });
            router.push('/login');
        }
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Register Error",
            icon: "error",
        });
        console.log(error);
    }
};
</script>

<template>
    <section class="h-100 bg-light">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col">
                    <div class="card card-registration my-4">
                        <div class="row g-0">
                            <div class="col-xl-12">
                                <div class="card-body p-md-5 text-black">
                                    <h3 class="mb-5 text-uppercase">สมัครสมาชิก</h3>

                                    <form @submit.prevent="handleRegister">
                                        <div class="row">
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label" for="firstName">ชื่อ</label>
                                                    <input type="text" id="firstName"
                                                        class="form-control form-control-lg" v-model="firstName"
                                                        required />
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label" for="lastName">นามสกุล</label>
                                                    <input type="text" id="lastName"
                                                        class="form-control form-control-lg" v-model="lastName"
                                                        required />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label" for="userName">ชื่อผู้ใช้</label>
                                                    <input type="text" id="userName"
                                                        class="form-control form-control-lg" v-model="userName"
                                                        required />
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label" for="password">รหัสผ่าน</label>
                                                    <input type="password" id="password"
                                                        class="form-control form-control-lg" v-model="password"
                                                        required />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label"
                                                        for="studentID">เลขบัตรประจำตัวประชาชน</label>
                                                    <input type="text" id="studentID"
                                                        class="form-control form-control-lg" v-model="studentID"
                                                        required />
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label"
                                                        for="schoolName">ชื่อสถานศึกษาที่นักศึกษาเข้ารับการปฏิบัติการสอน</label>
                                                    <input type="text" id="schoolName"
                                                        class="form-control form-control-lg" v-model="schoolName"
                                                        required />
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label"
                                                        for="department">แผนกวิชาที่นักศึกษาเข้ารับการฝึกประสบการณ์วิชาชีพ</label>
                                                    <input type="text" id="department"
                                                        class="form-control form-control-lg" v-model="department"
                                                        required />
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label" for="schoolSize">ขนาดสถานศึกษา</label>
                                                    <input type="text" id="schoolSize"
                                                        class="form-control form-control-lg" v-model="schoolSize"
                                                        required />
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label"
                                                        for="courseRelation">ความสัมพันธ์ของรายวิชาปฏิบัติการสอนในสถานศึกษา</label>
                                                    <input type="text" id="courseRelation"
                                                        class="form-control form-control-lg" v-model="courseRelation"
                                                        required />
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label"
                                                        for="evaluatorStatus">สถานะผู้ประเมินสมรรถนะวิชาชีพครู</label>
                                                    <input type="text" id="evaluatorStatus"
                                                        class="form-control form-control-lg" v-model="evaluatorStatus"
                                                        required />
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label"
                                                        for="currentStudyField">สาขาวิชาที่นักศึกษากำลังศึกษา</label>
                                                    <input type="text" id="currentStudyField"
                                                        class="form-control form-control-lg" v-model="currentStudyField"
                                                        required />
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline mb-4">
                                                    <label class="form-label" for="phoneNumber">เบอร์โทร</label>
                                                    <input type="tel" id="phoneNumber"
                                                        class="form-control form-control-lg" v-model="phoneNumber"
                                                        maxlength="10" pattern="[0-9]{10}" required />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <label for="branch">สาขาวิชาที่ดูแล</label>
                                            <div class="col mb-4">
                                                <select v-model="branch" class="form-select" required>
                                                    <option value="" disabled>-</option>
                                                    <option value="สาขาครุศาสตร์อุตสาหกรรมโยธา">
                                                        สาขาครุศาสตร์อุตสาหกรรมโยธา</option>
                                                    <option value="สาขาครุศาสตร์อุตสาหกรรมไฟฟ้า">
                                                        สาขาครุศาสตร์อุตสาหกรรมไฟฟ้า</option>
                                                    <option value="สาขาครุศาสตร์อุตสาหกรรมเครื่องกล">
                                                        สาขาครุศาสตร์อุตสาหกรรมเครื่องกล</option>
                                                    <option value="สาขาครุศาสตร์อุตสาหกรรมอุตสาหการ">
                                                        สาขาครุศาสตร์อุตสาหกรรมอุตสาหการ</option>
                                                    <option value="สาขาครุศาสตร์อุตสาหกรรมอิเล็กทรอนิกส์และโทรคมนาคม">
                                                        สาขาครุศาสตร์อุตสาหกรรมอิเล็กทรอนิกส์และโทรคมนาคม</option>
                                                    <option value="สาขาครุศาสตร์อุตสาหกรรมคอมพิวเตอร์">
                                                        สาขาครุศาสตร์อุตสาหกรรมคอมพิวเตอร์</option>
                                                    <option value="สาขาวิศวกรรมโยธา">สาขาวิศวกรรมโยธา</option>
                                                    <option value="สาขาวิศวกรรมไฟฟ้า">สาขาวิศวกรรมไฟฟ้า</option>
                                                    <option value="สาขาวิศวกรรมเครื่องกล">สาขาวิศวกรรมเครื่องกล</option>
                                                    <option value="สาขาวิศวกรรมอุตสาหการ">สาขาวิศวกรรมอุตสาหการ</option>
                                                    <option value="สาขาวิศวกรรมอิเล็กทรอนิกส์">
                                                        สาขาวิศวกรรมอิเล็กทรอนิกส์</option>
                                                    <option value="สาขาวิศวกรรมคอมพิวเตอร์">สาขาวิศวกรรมคอมพิวเตอร์
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="d-flex justify-content-end pt-3">
                                            <button type="reset" class="btn btn-light btn-lg">Reset all</button>
                                            <button type="submit" class="btn btn-warning btn-lg ms-2">Submit
                                                form</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
