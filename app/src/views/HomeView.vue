<template>
  <div id="app">
    <Navbar />
    <main>
      <MainBanner />
      <div class="container my-4">
        <div class="row my-4">
          <FeatureCard icon="fas fa-search" title="ติดตามข่าวสาร" description="" />
          <FeatureCard icon="fas fa-university" title="เว็บไซต์ระบบ ESS " description="" />
          <FeatureCard icon="fas fa-calendar-alt" title="FACEBOOK " description="" />
        </div>
      </div>
      <Newsletter />
    </main>
  </div>
</template>


<script>
import Navbar from '../components/HomeView/Navbar.vue'
import MainBanner from '../components/HomeView/Mainbar.vue'
import FeatureCard from '../components/HomeView/FeatureCard.vue'
import Newsletter from '../components/HomeView/Newsletter.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    MainBanner,
    FeatureCard,
    Newsletter
  }
}
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* main {
  padding-top: 70px; 
} */
</style>