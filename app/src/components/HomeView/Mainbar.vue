<template>
  <div class="feature-card">
    <img src="../../assets/img/8.1.png" alt="Feature image" />
  </div>
</template>

<script>
import FeatureCard from './FeatureCard.vue';

export default {
  components: {
    FeatureCard
  },
  methods: {
    discoverSchool() {
      alert('Discover the School');
    }
  }
};
</script>

<style scoped>
.mainbar {
  display: flex;
  justify-content: center;
  background-color: #f8f9fa;
}

.feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: -1;
}

.feature-card img {
  max-width: 100%;
  height: auto;
}

.feature-card .content {
  padding: 16px;
}
</style>
