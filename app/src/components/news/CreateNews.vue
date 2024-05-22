<template>
  <div class="content">
    <div class="card bg-white">
      <div class="card-header"> แบบฟอร์มแจ้งข้อมูลข่าวสาร </div>
      <div class="card-header">
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Title</label>
            <input v-model="news.title" type="text" id="title" class="form-control" required>
            <!-- <input type="text" id="title" v-model="news.title" required /> -->

            <!-- <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> -->
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
    // alert('News updated successfully');
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
    console.error('Error updating news:', error);
    alert('Failed to update news');
  }
};
</script>

<style scoped></style>
