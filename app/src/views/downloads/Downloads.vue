<template>
    <div>
        <Navbar />
        <div class="bg">

            <div class="container">
                <div class="header">
                    <h1>ดาวน์โหลดเอกสาร</h1>
                </div>
                <div class="content">
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ชื่อ</th>
                                    <th>ดาวน์โหลด (PDF)</th>
                                    <th>ดาวน์โหลด (Doc)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(doc, index) in documents" :key="index">
                                    <td>{{ doc.name }}</td>
                                    <td><a :href="doc.pdfLink" target="_blank">{{ doc.pdfName }}</a></td>
                                    <td><a :href="doc.docLink" target="_blank">{{ doc.docName }}</a></td>
                                </tr>
                            </tbody>
                        </table>
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

// ข้อมูลเอกสารดาวน์โหลด
const documents = ref([
    {
        name: "สห-อง-1) บันทึกการนิเทศงาน",
        pdfLink: "path/to/b07ff89a6f-sh-xc-1banthuk-kar-nithes-ngan.pdf",
        pdfName: "b07ff89a6f-sh-xc-1banthuk-kar-nithes-ngan.pdf",
        docLink: "",
        docName: ""
    },
    {
        name: "สห-อง-2) ประเมินการนิเทศ",
        pdfLink: "path/to/6e7f6806a3-sh-xc-2pramein-kar-nithes.pdf",
        pdfName: "6e7f6806a3-sh-xc-2pramein-kar-nithes.pdf",
        docLink: "",
        docName: ""
    },
    {
        name: "สห-อง-3) แบบประเมินการนิเทศนักศึกษา",
        pdfLink: "path/to/0bbb6b8db9-sh-xc-3baeb-pramein-kar-nithes-naksuksa.pdf",
        pdfName: "0bbb6b8db9-sh-xc-3baeb-pramein-kar-nithes-naksuksa.pdf",
        docLink: "",
        docName: ""
    }
]);

// ดึงข้อมูลเมื่อคอมโพเนนต์ถูกเมาท์
onMounted(() => {
    // สามารถเพิ่มการดึงข้อมูลจาก API ได้ที่นี่ถ้าจำเป็น
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

.content {
    padding: 20px;
}

.table-container {
    width: 100%;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 1em;
    min-width: 400px;
    border: 1px solid #dddddd;
}

table thead tr {
    background-color: #f2f2f2;
    text-align: left;
}

table th,
table td {
    padding: 12px 15px;
    border: 1px solid #dddddd;
}

table tbody tr {
    border-bottom: 1px solid #dddddd;
}

table tbody tr:nth-of-type(even) {
    background-color: #f9f9f9;
}

table tbody tr:last-of-type {
    border-bottom: 2px solid #dddddd;
}

table tbody tr:hover {
    background-color: #f1f1f1;
}

a {
    color: #1a73e8;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>