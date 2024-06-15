<template>
  <div>
    <Navbar />
    <div class="bg">
      <div class="container">
        <div class="header">
          <h1>ข่าวประชาสัมพันธ์</h1>
          <router-link to="/list-announcements">
            <button class="post-news-button">ดูข่าวทั้งหมด</button>
          </router-link>
        </div>
        <div class="content">
          <div class="announcement-listing" v-for="announcement in announcements" :key="announcement.id">
            <div class="announcement-header">
              <h6>{{ announcement.title }}</h6>
              <span class="announcement-date">
                <span class="icon">🕒</span>{{ formatDate(announcement.createdAt) }}
              </span>
            </div>
            <div class="announcement-details mt-4">
              <a :href="announcement.detail" target="_blank" class="news-link">คลิ๊กเพื่อดูรายละเอียด</a>
            </div>
          </div>
        </div>
      </div>

    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Navbar from '../../components/HomeView/Navbar.vue';
import Footer from '../../components/HomeView/Footer.vue';
import config from '../../../config';

const announcements = ref([]); // เก็บข้อมูลข่าวประชาสัมพันธ์

// ฟังก์ชันดึงข้อมูลจาก API และเรียงลำดับตามวันที่
const fetchAnnouncements = async () => {
  try {
    const response = await axios.get(`${config.api_path}/news`);
    announcements.value = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error('Error fetching announcements:', error);
  }
};

// ฟังก์ชันฟอร์แมตวันที่
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('th-TH', options);
};

// ดึงข้อมูลเมื่อคอมโพเนนต์ถูกเมาท์
onMounted(() => {
  fetchAnnouncements();
});
</script>

<style scoped>
.bg {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bg::before {
  content: "";
  background-image: url('../../assets/img/8.1.png');
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(3px);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
}

.container {
  width: 100%;
  max-width: 1000px;
  padding: 20px;
  background-color: #fff;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  margin: 20px auto;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

.post-news-button {
  background-color: #ffffff;
  color: rgb(255, 255, 255);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.content {
  padding: 20px;
}

.announcement-listing {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  margin: 0px auto;
  margin-bottom: 20px;
  /* เพิ่มระยะห่างระหว่างข่าวแต่ละข่าว */
}

.announcement-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.announcement-date {
  color: #555;
}

.announcement-details p {
  margin: 5px 0;
}
</style>
