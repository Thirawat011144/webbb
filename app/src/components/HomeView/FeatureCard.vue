<template>
    <div class="col-md-4">
        <div class="card mb-4">
            <div class="card-body text-center ">
                <i :class="`${icon} fa-2x mb-3`"></i>
                <h5 class="card-title">{{ title }}</h5>
                <p class="card-text">{{ description }}</p>
             <router-link to="/news">   <a href="#" class="btn btn-primary">Click</a> </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FeatureCard',
    props: {
        icon: String,
        title: String,
        description: String
    }
}
</script>

<style scoped>
.card {
    max-width: 300px;
    width: 100%;
    height: auto;
}
</style>