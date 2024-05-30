<script setup>
import { ref, onMounted, watch } from "vue";
import { useSearchStore } from '../../store/Search';

const searchStore = useSearchStore();
const searchResults = ref([]);

const removeData = async (id) => {
  // แสดงป๊อปอัพยืนยันการลบ
  const result = await Swal.fire({
    title: 'คุณแน่ใจหรือไม่?',
    text: 'คุณจะไม่สามารถย้อนกลับได้!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'ใช่, ลบเลย!',
    cancelButtonText: 'ยกเลิก'
  });

  // ตรวจสอบว่าผู้ใช้กดยืนยันการลบหรือไม่
  if (result.isConfirmed) {
    try {
      const response = await axios.delete(`${config.api_path}/users/${id}`);
      users.value = users.value.filter(user => user.id !== id);
      Swal.fire({
        title: 'สำเร็จ',
        text: 'ลบข้อมูลผู้ใช้สำเร็จ',
        icon: 'success',
      }).then((result) => {
        if (result.value) {
          fetchData(); // รีเฟรชข้อมูลหลังจากการลบ
        }
      });
    } catch (error) {
      Swal.fire({
        title: 'error',
        text: (error.message, 'Cr2 Error DeleteData'),
        icon: 'error'
      });
      console.log(error);
    }
  }
};


const updateSearchResults = () => {
    searchResults.value = searchStore.searchResults;
};

onMounted(() => {
    updateSearchResults();
});

watch(
    () => searchStore.searchResults,
    (newResults) => {
        updateSearchResults();
    }
);
</script>

<template>
    <section class="content">
        <div class="card">
            <div class="card-header">
                <div class="card-title">
                    ผลการค้นหา
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>รหัสนักศึกษา</th>
                            <th>ชื่อ-นามสกุล</th>
                            <th>ชั้นปี</th>
                            <th>สาขา</th>
                            <th>สถานที่ฝึกงาน</th>
                            <th>Tools</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in searchResults" :key="user.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ user.studentID }}</td>
                            <td>{{ user.firstName }} {{ user.lastName }}</td>
                            <td>{{ user.year }}</td>
                            <td>{{ user.branch }}</td>
                            <td>{{ user.company }}</td>
                            <td>
                                <router-link :to="`/edit-student/${user.id}`"> <button
                                        class="btn btn-primary m-1">Edit</button></router-link>
                                        <button @click="removeData(user.id)" class="btn btn-danger m-1">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>

<style scoped>
.table {
    width: 100%;
    margin: 20px 0;
}
</style>
