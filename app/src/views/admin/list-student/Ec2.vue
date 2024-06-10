<script setup>
import axios from "axios";
import { ref, onMounted, computed } from 'vue';
import config from "../../../../config";
import Swal from 'sweetalert2';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const teacherStatus = ref('/admin-index/Ec2-req');
const companyStatus = ref('/admin-index/Ec2-active');

const navigate = (status) => {
  router.push(status);
};

const users = ref([]); // เปลี่ยน {} เป็น []
const isModalVisible = ref(false);
const modalData = ref(null);

const fetchData = async () => {
  try {
    const response = await axios.get(`${config.api_path}/users`);
    users.value = response.data.filter(user => user.year === "ป.ตรี ปีที่ 2");
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
    modalData.value = response.data;
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
// modal

const removeData = async (id) => {
  // แสดงป๊อปอัพยืนยันการลบ
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

  // ตรวจสอบว่าผู้ใช้กดยืนยันการลบหรือไม่
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

onMounted(() => {
  fetchData();
});
</script>

<template>
  <section class="content mt-4">
    <div class="card">
      <div class="card-header">
        <div class="card-title mb-2">ข้อมูลนักศึกษาชั้นปริญาตรี ชั้นปีที่ 2
          <div>
            <div>

            </div>
            <!-- <label for="">อาจารย์:</label>
            <router-link :to="`/admin-index/Ec2-req`"> <button class="btn btn-primary m-1">
                ขออนุมัติ</button></router-link>
            <router-link :to="`/admin-index/Ec2-active`"> <button
                class="btn btn-success m-1">อนุมัติ</button></router-link>
            <router-link :to="`/admin-index/Ec2-active`"> <button
                class="btn btn-danger m-1">ไม่อนุมัติ</button></router-link> -->

            <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;"
              class="mt-3 mb-3">
              <div style="display: flex; align-items: center; margin-right: 20px;">
                <label for="teacherStatus">อาจารย์:</label>
                <select v-model="teacherStatus" id="teacherStatus" class="form-select ms-3">
                  <option value="/admin-index/Ec2-req">ขออนุมัติ</option>
                  <option value="/admin-index/Ec2-active-success">อนุมัติ</option>
                  <option value="/admin-index/Ec2-active-danger">ไม่อนุมัติ</option>
                </select>
                <button class="btn btn-primary ms-3" @click="navigate(teacherStatus)">Go</button>
              </div>
              <div style="display: flex; align-items: center; margin-left: 20px;">
                <label for="companyStatus" style="white-space: nowrap;">สถานประกอบการ:</label>
                <select v-model="companyStatus" id="companyStatus" class="form-select ms-3">
                  <option value="/admin-index/Ec2-active">ขออนุมัติ</option>
                  <option value="/admin-index/Ec2-active-danger">ไม่อนุมัติ</option>
                  <option value="/admin-index/Ec2-active-success">อนุมัติ</option>
                  <option value="/admin-index/Ec2-active-training">กำลังฝึก</option>
                  <option value="/admin-index/Ec2-success">ฝึกจบแล้ว</option>
                </select>
                <button class="btn btn-primary ms-3" @click="navigate(companyStatus)">Go</button>
              </div>
            </div>

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
              <th class="text-center">ชื่อสถานประกอบการ</th>
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
              </td>
              <td>
                <router-link :to="`/edit-ec2/${user.id}`">
                  <button class="btn btn-primary m-1">Edit</button>
                </router-link>
                <button @click="removeData(user.id)" class="btn btn-danger m-1">Delete</button>
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
            <button type="button" class="btn-close" @click="isModalVisible = false" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-if="modalData">
            <p>รหัสนักศึกษา: {{ modalData.studentID }}</p>
            <p>ชื่อ-นามสกุล: {{ modalData.firstName }} {{ modalData.lastName }}</p>
            <p>สาขา: {{ modalData.branch }}</p>
            <p>ชั้นปี: {{ modalData.year }}</p>
            <div v-if="modalData.companyDetails">
              <p>สถานประกอบการ: {{ modalData.companyDetails.companyName }}</p>
              <p>ประเภทหน่วยงาน: {{ modalData.companyDetails.companyType }}</p>
              <p>เบอร์โทรศัพท์: {{ modalData.companyDetails.companyPhone }}</p>
              <p>Email: {{ modalData.companyDetails.companyEmail }}</p>
              <p>ที่ตั้งสถานประกอบการ: {{ modalData.companyDetails.companyAddress }}</p>
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
