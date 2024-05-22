<script setup>
import { ref, onMounted, watch } from "vue";
import { useSearchStore } from '../../store/Search';

const searchStore = useSearchStore();
const searchResults = ref([]);

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
                                <button class="btn btn-primary m-1">Edit</button>
                                <button class="btn btn-danger m-1">Delete</button>
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
