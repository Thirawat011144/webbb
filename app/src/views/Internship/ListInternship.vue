<template>
  <div>
    <div class="bg">
      <Navbar />
      <div class="bg">
        <div class="container">
          <div class="header">
            <h1>สถานที่ฝึกงาน</h1>
            <button class="post-job-button">สถานที่ฝึกสอน</button>
          </div>
          <div class="content">
            <div class="job-listing" v-for="job in jobs" :key="job.id">
              <div class="job-header">
                <h4>    <router-link :to="`/data-internship/${job.id}`">{{ job.company }}</router-link></h4>
                <span class="job-type"> {{ formatDate(job.createdAt) }}</span>
              </div>
              <div class="job-details">
                <p><span class="text-bold">ตำแหน่ง:</span> {{ job.position }}</p>
                <p><span class="text-bold">ที่อยู่:</span> {{ job.location }}</p>
                <p><span class="text-bold">โทรศัพท์:</span> {{ job.tel }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Navbar from '../../components/HomeView/Navbar.vue';
import Footer from '../../components/HomeView/Footer.vue';
import config from '../../../config';

const jobs = ref([]); // เก็บข้อมูลสถานที่ฝึกงาน

// ฟังก์ชันดึงข้อมูลจาก API และเรียงลำดับตามวันที่
const fetchJobs = async () => {
  try {
    const response = await axios.get(`${config.api_path}/internship`);
    jobs.value = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error('Error fetching jobs:', error);
  }
};

// ฟังก์ชันฟอร์แมตวันที่
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('th-TH', options);
};

// ดึงข้อมูลเมื่อคอมโพเนนต์ถูกเมาท์
onMounted(() => {
  fetchJobs();
});
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #fff;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  margin: 20px auto;
  border-radius: 5px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

.header h1 {
  margin: 0;
  font-size: 24px;
}

.post-job-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.content {
  padding: 20px;
}

.job-listing {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  margin: 0px auto;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.job-type {
  color: #555;
}

.job-details p {
  margin: 5px 0;
}

.text-bold {
  font-weight: bold;
}
</style>
