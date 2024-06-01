<template>
  <div class="content">
    <div class="card bg-white">
      <h5 class="card-header"> แก้ไขแบบฟอร์มแจ้งข้อมูลข่าวสาร </h5>
      <div class="card-header">
        <form @submit.prevent="updateData">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Title</label>
            <input v-model="news.title" type="text" id="title" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Link</label>
            <input v-model="news.detail" type="text" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-primary">แก้ไข</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import config from "../../../config";
import Swal from 'sweetalert2';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const news = ref({
  title: '',
  detail: '',
});

const fetchData = async () => {
  try {
    const response = await axios.get(`${config.api_path}/news/${route.params.id}`);
    const newsData = response.data; 
    news.value = { ...newsData }; 
  } catch (error) {
    Swal.fire({
      title: "error",
      text: (error.message, "ไม่สามารถแก้ไขได้"),
      icon: "error"
    });
  }
};

const updateData = async () => {
  const result = await Swal.fire({
    title: 'แก้ไขข้อมูล',
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
      const response = await axios.put(`${config.api_path}/news/${route.params.id}`, news.value);
      if (response.data.message === 'Success') {
        Swal.fire({
          title: "สำเร็จ",
          text: "แก้ไขข้อมูลผู้ใช้สำเร็จ",
          icon: "success",
        });

        router.push('/admin-index/list-news');
      }
    } catch (error) {
      Swal.fire({
        title: "error",
        text: (error.message, "Update Error"),
        icon: "error"
      });
    }
  }
};


onMounted(() => {
  fetchData();
});

</script>

<style scoped></style>