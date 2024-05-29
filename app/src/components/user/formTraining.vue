<script setup>
import { ref } from 'vue';
import axios from 'axios';
import config from '../../../config';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';


const router = useRouter();

const companyName = ref('');
const companyType = ref('');
const companyPhone = ref('');
const companyEmail = ref('');
const companyAddress = ref('');

const handleSubmit = async () => {
    const result = await Swal.fire({
        title: 'เพิ่มข้อมูล',
        text: 'คุณจะไม่สามารถย้อนกลับได้!',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
    });
    if (result.isConfirmed) {
        try {
            const formData = {
                companyName: companyName.value,
                companyType: companyType.value,
                companyPhone: companyPhone.value,
                companyEmail: companyEmail.value,
                companyAddress: companyAddress.value,
            };
            const response = await axios.post(`${config.api_path}/company`, formData);
            if (response.data.message === 'Success') {
                Swal.fire({
                    title: "สำเร็จ",
                    text: "เพิ่มข้อมูลสำเร็จ",
                    icon: "success",
                });
                console.log(response.data.newCompany)
                localStorage.setItem('companyData', JSON.stringify(response.data.newCompany));
                router.push('/user-index/data-student')
            }
        } catch (error) {
            Swal.fire({
                title: "error",
                text: (error.message, "Creating Company Error"),
                icon: "error"
            });
        }
    }
};
</script>

<template>
    <div>
        <div class="flex-grow-1 p-3">
            <h3>แบบฟอร์มลงทะเบียนขอออกฝึกประสบการณ์</h3>
            <div class="card">
                <div class="card-body">
                    <form @submit.prevent="handleSubmit">
                        <!-- 2 column grid layout with text inputs for the first and last names -->
                        <div class="row mb-4">
                            <div class="col">
                                <div data-mdb-input-init class="form-outline">
                                    <label class="form-label" for="form6Example1">ชื่อสถานประกอบการ</label>
                                    <input type="text" id="form6Example1" class="form-control" v-model="companyName" />
                                </div>
                            </div>
                            <div class="col">
                                <div data-mdb-input-init class="form-outline">
                                    <label class="form-label" for="form6Example2">ประเภทหน่วยงาน</label>
                                    <select id="form6Example2" class="form-control" v-model="companyType">
                                        <option value="">กรุณาเลือกประเภทหน่วยงาน</option>
                                        <option value="government">หน่วยงานรัฐบาล</option>
                                        <option value="stateEnterprise">รัฐวิสาหกิจ</option>
                                        <option value="publicOrganization">องค์การมหาชน</option>
                                        <option value="corporation">องค์การนิติบุคคล</option>
                                        <option value="nonProfit">องค์การไม่แสวงหาผลกำไร</option>
                                        <option value="educationalInstitution">สถาบันการศึกษา</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Text input -->
                        <div data-mdb-input-init class="form-outline mb-4">
                            <label class="form-label" for="form6Example3">เบอร์โทรศัพท์สถานประกอบการ</label>
                            <input type="text" id="form6Example3" class="form-control" v-model="companyPhone" />
                        </div>

                        <!-- Email input -->
                        <div data-mdb-input-init class="form-outline mb-4">
                            <label class="form-label" for="form6Example5">Email สถานประกอบการ</label>
                            <input type="email" id="form6Example5" class="form-control" v-model="companyEmail" />
                        </div>

                        <!-- Message input -->
                        <div data-mdb-input-init class="form-outline mb-4">
                            <label class="form-label" for="form6Example7">ที่ตั้งสถานประกอบการ</label>
                            <textarea class="form-control" id="form6Example7" rows="4"
                                v-model="companyAddress"></textarea>
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
