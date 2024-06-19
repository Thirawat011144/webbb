<template>
    <div>
        <NavbarVue />
        <div class="bg">
            <div class="container">
                <!-- <h1>รายละเอียดของสาขา</h1> -->
                <div class="branch-list">
                    <router-link to="/internshiped-list" style="text-decoration: none;">
                        <div class="branch-item">
                            <div class="icon">🏗️</div>
                            <p>สาขาครุศาสตร์อุตสาหกรรมโยธา</p>
                        </div>
                    </router-link>
                    <div class="branch-item">
                        <div class="icon">⚡</div>
                        <p>สาขาครุศาสตร์อุตสาหกรรมไฟฟ้า</p>
                    </div>
                    <div class="branch-item">
                        <div class="icon">🔧</div>
                        <p>สาขาครุศาสตร์อุตสาหกรรมเครื่องกล</p>
                    </div>
                    <div class="branch-item">
                        <div class="icon">🏭</div>
                        <p>สาขาครุศาสตร์อุตสาหกรรมอุตสาหการ</p>
                    </div>
                    <div class="branch-item">
                        <div class="icon">📡</div>
                        <p>สาขาครุศาสตร์อุตสาหกรรมอิเล็กทรอนิกส์และโทรคมนาคม</p>
                    </div>
                    <div class="branch-item">
                        <div class="icon">💻</div>
                        <p>สาขาครุศาสตร์อุตสาหกรรมคอมพิวเตอร์</p>
                    </div>
                    <div class="branch-item">
                        <div class="icon">🔩</div>
                        <p>สาขาครุศาสตร์อุตสาหการเชื่อมประกอบ</p>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup>
// import { onMounted, ref } from 'vue';
// import { useRoute } from 'vue-router';
import NavbarVue from "../../components/HomeView/Navbar.vue";
import Footer from '../../components/HomeView/Footer.vue';




</script>

<style scoped>
.bg {
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
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
    background-color: rgba(255, 255, 255, 0.9);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    width: 90%;
    max-width: 900px;
    text-align: center;
}

h1 {
    margin-bottom: 30px;
    font-size: 28px;
    color: #333;
}

.branch-list {
    display: flex;
    flex-direction: column;
    gap: 15px;

}

.branch-item {
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 15px;
    transition: transform 0.2s, box-shadow 0.2s;
    text-decoration: none;
}

.branch-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.branch-item p {
    margin: 0;
    font-size: 18px;
    color: #555;
}

.icon {
    font-size: 40px;
}
</style>
