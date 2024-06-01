<template>
  <div>
    <div class="bg">
      <Navbar />
      <div>
        <div class="news-container">
          <h3 class="news-header">ประชาสัมพันธ์</h3>
          <div class="news-list">
            <div class="news-item" v-for="news in newsList" :key="news.id">
              <div class="news-content">
                <h2>{{ news.title }}</h2>
                <p class="news-date"><i class="fas fa-clock"></i> {{ formatDate(news.createdAt) }}</p>
                <a :href="news.detail" target="_blank" class="news-link">คลิ๊กเพื่อดูรายละเอียด</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterHome />
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import config from '../../../config';
import Navbar from '../HomeView/Navbar.vue';
import FooterHome from '../HomeView/Footer.vue'

const newsList = ref([]);

const fetchNews = async () => {
  try {
    const response = await axios.get(`${config.api_path}/news`);
    newsList.value = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
  background-image: url('../../assets/img/8.1.png');
  background-size: cover;
  background-position: center;
}

.news-container {
  width: 100%;
  max-width: 1000px;
  margin: 80px auto 20px auto;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.news-header {
  text-align: center;
  margin-bottom: 30px;
  /* font-size: 2.5em; */
  color: #333333;
  font-weight: bold;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.news-item {
  display: flex;
  flex-direction: row;
  background-color: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.news-item:hover {
  transform: scale(1.02);
}

.news-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex-grow: 1;
}

.news-content h2 {
  margin: 0;
  font-size: 1.1em;
  color: #101922;
  font-weight: bold;
}

.news-date {
  color: #888888;
  font-size: 0.9em;
}

.news-link {
  color: #0056b3;
  text-decoration: none;
  font-weight: bold;
  align-self: flex-start;
  margin-top: auto;
}

.news-link:hover {
  text-decoration: underline;
}
</style>
