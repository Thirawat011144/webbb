import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
    state: () => ({
        searchResults: [],
    }),
    actions: {
        setSearchResults(results) {
            this.searchResults = results;
        },
    },
});

export const useDataStore = defineStore('fetchData', {
    state: () => ({
        dataResults: [],
    }),
    actions: {
        setDataResults(results) { // เปลี่ยนชื่อ method จาก fetchDataResults เป็น setDataResults
            this.dataResults = results; // อัพเดท state ด้วยข้อมูลที่ดึงมา
        },
    }
})