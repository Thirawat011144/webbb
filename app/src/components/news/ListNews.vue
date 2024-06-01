<template>
  <div class="content mt-4">
    <div class="card">
      <h5 class="card-header">ข้อมูลข่าวประชาสัมพันธ์</h5>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ลำดับ</th>
            <th scope="col">Title</th>
            <th scope="col">Link</th>
            <th scope="col">Tools</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(news, index) in news" :key="news.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ news.title }}</td>
            <td>{{ news.detail }}</td>
            <td class="p-3">


              <router-link :to="`/admin-index/edit-news/${news.id}`"> <button
                  class="btn btn-primary">Edit</button></router-link>
              <button @click="removeData(news.id)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, computed } from 'vue';
import config from "../../../config";
import Swal from 'sweetalert2';

const news = ref([]); 

const fetchData = async () => {
  try {
    const response = await axios.get(`${config.api_path}/news`);
    news.value = response.data;
  } catch (error) {
    Swal.fire({
      title: "error",
      text: (error.message, "Cr2 Error"),
      icon: "error"
    });
  }
};

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
      const response = await axios.delete(`${config.api_path}/news/${id}`);
      news.value = news.value.filter(news => news.id !== id);
      Swal.fire({
        title: 'สำเร็จ',
        text: 'ลบข้อมูลผู้ใช้สำเร็จ',
        icon: 'success',
      }).then((result) => {
        if (result.value) {
          fetchData(); 
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


onMounted(() => {
  fetchData();
});
</script>

<style></style>