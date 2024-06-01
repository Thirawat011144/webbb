<template>
  <div class="content mt-4">
    <div class="card bg-white">
      <h5 class="card-header"> แบบฟอร์มแจ้งข้อมูลข่าวสาร </h5>
      <div class="card-header">
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Title</label>
            <input v-model="news.title" type="text" id="title" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Link</label>
            <input v-model="news.detail" type="text" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();

const news = ref({
  title: '',
  detail: '',
});

const submitForm = async () => {
  try {
    const response = await axios.post(`http://localhost:3000/api/news/`, news.value);
    if (response) {
      Swal.fire({
        title: "Sign Up",
        text: "แจ้งข่าวประชาสัมพันธ์เรียบร้อยแล้ว",
        icon: "success",
        timer: 2000
      })
      router.push('/admin-index/list-news')
    }
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "ไม่สามารถเพิ่มข่าวสารได้",
      icon: "error",
    });
  }
};
</script>

<style scoped></style>
