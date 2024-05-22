<script setup>
import axios from "axios";
import { ref } from 'vue';
import config from "../../../config";
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router'

const router = useRouter();

const firstName = ref(''); //ชื่อ
const lastName = ref('') //นามสกุล
const userName = ref(''); //user
const password = ref(''); //pass
const phoneNumber = ref(''); //เบอร์โทร
const gender = ref('') //เพศ
const year = ref(''); //ชั้นปี
const branch = ref(''); //สาขา
const status = ref(''); //สถานะ
const studentID = ref(''); //รหัสนักศึกษา
const company = ref(''); //สถานที่ขอออกฝึก



const handleRegister = async () => {
    try {
        const payload = {
            firstName: firstName.value,
            lastName: lastName.value,
            userName: userName.value,
            password: password.value,
            phoneNumber: phoneNumber.value,
            gender: gender.value,
            year: year.value,
            branch: branch.value,
            status: status.value,
            studentID: studentID.value,
            company: company.value
        }
        const response = await axios.post(`${config.api_path}/register`, payload);
        if (response.data.message === "Success") {
            Swal.fire({
                title: "Sign Up",
                text: "สมัครบัญชีเรียบร้อยแล้ว",
                icon: "success",
                timer: 2000
            })
            router.push('/login')
        }
    } catch (error) {
        Swal.fire({
            title: "error",
            text: (error.message, "Register Error"),
            icon: "error"
        })
    }
}


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

                                    <div class="row">
                                        <div class="col-md-6 mb-4">
                                            <div class="form-outline">
                                                <label class="form-label" for="form3Example1m">First name</label>
                                                <input type="text" id="form3Example1m"
                                                    class="form-control form-control-lg" v-model="firstName" />
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-4">
                                            <div class="form-outline">
                                                <label class="form-label" for="form3Example1n">Last name</label>
                                                <input type="text" id="form3Example1n"
                                                    class="form-control form-control-lg" v-model="lastName" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6 mb-4">
                                            <div class="form-outline">
                                                <label class="form-label" for="form3Example1m1">Username</label>
                                                <input type="text" id="form3Example1m1"
                                                    class="form-control form-control-lg" v-model="userName" />
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-4">
                                            <div class="form-outline">
                                                <label class="form-label" for="form3Example1n1">Password</label>
                                                <input type="password" id="form3Example1n1"
                                                    class="form-control form-control-lg" v-model="password" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example8">Tel</label>
                                        <input type="text" id="form3Example8" class="form-control form-control-lg"
                                            v-model="phoneNumber" />
                                    </div>

                                    <div class="d-md-flex justify-content-start align-items-center mb-4 py-2">
                                        <h6 class="mb-0 me-4">Gender: </h6>
                                        <div class="form-check form-check-inline mb-0 me-4">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                                id="femaleGender" value="Female" v-model="gender" />
                                            <label class="form-check-label" for="femaleGender">Female</label>
                                        </div>
                                        <div class="form-check form-check-inline mb-0 me-4">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                                id="maleGender" value="Male" v-model="gender" />
                                            <label class="form-check-label" for="maleGender">Male</label>
                                        </div>
                                    </div>

                                    <div class="d-md-flex justify-content-start align-items-center mb-4 py-2">
                                        <h6 class="mb-0 me-4">Year: </h6>
                                        <div class="form-check form-check-inline mb-0 me-4">
                                            <input class="form-check-input" type="radio" name="yearOptions" id="voc2"
                                                value="ปวช 2" v-model="year" />
                                            <label class="form-check-label" for="voc2">ปวช 2</label>
                                        </div>
                                        <div class="form-check form-check-inline mb-0 me-4">
                                            <input class="form-check-input" type="radio" name="yearOptions" id="bach2"
                                                value="ป.ตรี ปีที่ 2" v-model="year" />
                                            <label class="form-check-label" for="bach2">ป.ตรี ปีที่ 2</label>
                                        </div>
                                        <div class="form-check form-check-inline mb-0 me-4">
                                            <input class="form-check-input" type="radio" name="yearOptions" id="bach4"
                                                value="ป.ตรี ปีที่ 4" v-model="year" />
                                            <label class="form-check-label" for="bach4">ป.ตรี ปีที่ 4</label>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6 mb-4">
                                            <select v-model="branch" class="form-select">
                                                <option value="" disabled>Branch</option>
                                                <option value="Computer">Computer</option>
                                                <option value="ComSci">ComSci</option>
                                                <option value="Auto mechanic">Auto mechanic</option>
                                            </select>
                                        </div>
                                        <div class="col-md-6 mb-4">
                                            <select v-model="status" class="form-select">
                                                <option value="" disabled>Status</option>
                                                <option value="Request training">Request training</option>
                                                <option value="training">training</option>
                                                <option value="Finished training">Finished training</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example9">Student ID</label>
                                        <input v-model="studentID" type="text" id="form3Example9"
                                            class="form-control form-control-lg" />
                                    </div>

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example90">Company</label>
                                        <input v-model="company" type="text" id="form3Example90"
                                            class="form-control form-control-lg" />
                                    </div>

                                    <div class="d-flex justify-content-end pt-3">
                                        <button @click="handleRegister" type="button" class="btn btn-lg"
                                            style="background-color: mediumvioletred; color: white;">Submit
                                            form</button>
                                    </div>

                                    <div class="d-flex justify-content-end pt-3">
                                        <router-link to="/login">
                                            <small>Already have an account? Click <a href="#">Login</a></small>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>



<style scoped>
.bg-light {
    background-color: #f8f9fa !important;
}

.card-registration {
    position: relative;
    background: rgba(255, 255, 255);
    /* backdrop-filter: blur(10px); */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-registration::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/img/8.jpg');
    background-size: cover;
    background-position: center;
    filter: blur(10px);
    z-index: -1;
}

.card-registration .card-body {
    position: relative;
    padding: 2rem;
}

.form-outline {
    position: relative;
    margin-bottom: 1.5rem;
}

.form-label {
    display: block;
    margin-bottom: 0.5rem;
}

.form-control-lg {
    display: block;
    width: 100%;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-check-input {
    margin-right: 0.5rem;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}

.btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
}
</style>