

<template>
  <div class="bg">
    <Navbar />
    <div class="news-container">
      <h1>ข่าวสาร</h1>
      <div class="news-list">
        <div class="news-item" v-for="news in newsList" :key="news.id">
          <!-- <img :src="news.image" alt="news image" class="news-image"> -->
          <div class="news-content">
            <h2>{{ news.title }}</h2>
            <p class="news-date"><i class="fas fa-clock"></i> {{ formatDate(news.createdAt) }}</p>
            <!-- <p>{{ news.detail }}</p> -->
            <a :href="news.detail" target="_blank">คลิ๊กเพื่อดูรายละเอียด</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import Navbar from '../HomeView/Navbar.vue';
import { ref, onMounted } from 'vue';
import config from '../../../config';

const newsList = ref([]);

const fetchNews = async () => {
  try {
    const response = await axios.get(`${config.api_path}/news`); // เปลี่ยน URL เป็น API ของคุณ
    newsList.value = response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
  }
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('th-TH', options);
};

onMounted(() => {
  fetchNews();
});
</script>

<style scoped>
.bg {
  background-image: url('../../assets/img/8.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar-bg {
  background: rgba(255, 255, 255, 0.8);
  width: 100%;
}

.news-container {
  max-width: 1200px;
  margin: 80px auto 20px auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.news-container h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2em;
  color: #003366;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.news-item {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.news-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
}

.news-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
}

.news-content h2 {
  margin: 0 0 10px 0;
  font-size: 1.2em;
  color: #003366;
}

.news-content .news-date {
  color: #777;
  font-size: 0.9em;
}

.news-content p {
  margin: 0 0 10px 0;
  flex-grow: 1;
}

.news-content a {
  color: #003366;
  text-decoration: none;
  align-self: flex-start;
}
</style>
