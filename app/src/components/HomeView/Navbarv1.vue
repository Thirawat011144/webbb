<template>
    <div>
        <div class="bg">
            <div class="row">
                <div id="wb_Image" class="image-container">
                    <img class="banner-img" src="../../assets/img/438.png" alt="Faculty Banner" width="800" height="85">
                </div>
            </div>
        </div>
        <div class="row bgmenu sticky-top">
            <div>
                <ul class="nav-links d-flex flex-row justify-content-center align-items-center"
                    style="list-style-type: none;">
                    <router-link to="/" style="color: black;" class="text-decoration-none">
                        <li class="nav-item mt-2 p-2 abb "><i class="fa-solid fa-house"></i></li>
                    </router-link>
                    <li class="nav-item p-2">สถานที่ฝึกงาน</li>
                    <li class="nav-item p-2">ดาวน์โหลด</li>
                    <router-link to="/news" class="text-black text-decoration-none ">
                        <li class="nav-item p-2 abb ">ข่าวสาร</li>
                    </router-link>
                    <li class="nav-item p-2">ติดต่อเรา</li>
                    <router-link to="/login" class="text-decoration-none text-black">
                        <li class="nav-item p-2 abb">เข้าสู่ระบบ</li>
                    </router-link>
                </ul>
            </div>
        </div>
        <!-- <mainbar /> -->
    </div>
</template>

<script setup>
import Mainbar from './Mainbar.vue';

</script>

<style scoped>
.bg {
    background-color: rgb(244, 241, 244);
}

.abb:hover {
    color: rgb(115, 115, 115);
}

.bgmenu {
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    position: sticky;
    top: 0;
    z-index: 1000;
}

.image-container {
    display: flex;
    justify-content: start;
    width: 100%;
    height: auto;
    z-index: 1;
}

.banner-img {
    max-width: 100%;
    height: auto;
}

.nav-links {
    padding: 0;
    margin: 0;
}

.nav-item {
    display: flex;
    align-items: center;
    margin: 0 10px;
    position: relative;
    transition: transform 0.3s ease-in-out;
}

.nav-item i {
    margin-right: 5px;
}

.nav-item span.hover-text {
    display: none;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -20px;
    /* Adjust based on your design */
    background-color: #fff;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    white-space: nowrap;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

.nav-item:hover {
    transform: scale(1.2);
}

.nav-item:hover span.hover-text {
    display: block;
}

.content {
    padding: 20px;
    background-color: #f4f4f4;
    height: 2000px;
}
</style>
