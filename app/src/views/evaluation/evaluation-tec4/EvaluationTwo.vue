<template>
    <div class="evaluation-container">
      <h2>การประเมินนักศึกษา</h2>
      <div>
        เกณฑ์การให้คะแนนการประเมินสมรรถนะทางวิชาชีพครูในการปฏิบัติการสอน แบ่งเป็น ๕ ระดับ ดังนี้ <br />
        ระดับ 1 ผลการประเมิน ต่ำกว่ามาตรฐานควรปรับปรุงอย่างยิ่ง <br />
        ระดับ 2 ผลการประเมิน ต่ำกว่ามาตรฐานควรปรับปรุง <br />
        ระดับ 3 ผลการประเมิน มาตรฐานขั้นต่ำ <br />
        ระดับ 4 ผลการประเมิน สูงกว่ามาตรฐาน ระดับดี <br />
        ระดับ 5 ผลการประเมิน สูงกว่ามาตรฐาน ระดับดีมาก <br /> <br />
      </div>
      <div v-if="student">
        <h4>ข้อมูลนักศึกษาที่ทำการประเมิน</h4>
        <p>ชื่อ: {{ student.firstName }} {{ student.lastName }}</p>
        <p>รหัสนักศึกษา: {{ student.studentID }}</p>
  
        <form @submit.prevent="submitEvaluation">
          <div>
            <h5>ด้านการจัดการเรียนรู้</h5>
          </div>
          <table class="evaluation-table">
            <thead>
              <tr>
                <th class="text-center">เกณฑ์การประเมิน</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>สามารถวิเคราะห์ความสอดคล้องของสาระการเรียนรู้กับมาตรฐานการเรียนรู้ของหลักสูตร แกนกลางและหลักสูตรสถานศึกษา</td>
                <td><input type="radio" :value="1" v-model.number="criteria" required></td>
                <td><input type="radio" :value="2" v-model.number="criteria"></td>
                <td><input type="radio" :value="3" v-model.number="criteria"></td>
                <td><input type="radio" :value="4" v-model.number="criteria"></td>
                <td><input type="radio" :value="5" v-model.number="criteria"></td>
              </tr>
              <!-- Add more rows as needed -->
            </tbody>
          </table>
          <button type="submit" class="btn btn-primary">ส่งการประเมิน</button>
        </form>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import config from '../../../../config';
  
  const route = useRoute();
  const router = useRouter();
  const student = ref(null);
  const time = ref('2');
  const criteria = ref(null);
  
  const fetchStudentData = async () => {
    try {
      const response = await axios.get(`${config.api_path}/user/${route.params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(config.token_name)}`
        }
      });
      student.value = response.data;
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };
  
  const submitEvaluation = async () => {
    try {
      const phoneNumber = localStorage.getItem(config.phoneNumber);
      const evaluatorStatus = localStorage.getItem(config.evaluatorStatus);
      const evaluatorName = `${localStorage.getItem(config.firstName_name)} ${localStorage.getItem(config.token_lastName)}`;
      const payload = {
        evaluatorStatus: evaluatorStatus,
        time: time.value,
        evaluatorName: evaluatorName,
        phoneNumber: phoneNumber,
        studentId: student.value.studentID,
        criteria: criteria.value // This will now be a single value, not an array
      };
      console.log("Payload:", payload);
      console.log("Payload Length:", payload.criteria.length);
      const response = await axios.post(`${config.api_path}/data-evaluation`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(config.token_name)}`
        }
      });
      if (response.data.message === "Success") {
        Swal.fire({
          title: "Success",
          text: "การประเมินสำเร็จ",
          icon: "success",
          timer: 2000
        });
        const userYear = student.value.year;
        console.log(userYear);
  
        if (userYear === "ป.ตรี ปีที่ 4") {
          router.push('/home-evaluation/student-ev-tec4');
        } else if (userYear === "ป.ตรี ปีที่ 2") {
          router.push('/home-evaluation/student-ev-tec2');
        } else {
          router.push('/home-evaluation/student-ev-vcr2');
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error submitting evaluation: " + error.message,
        icon: "error"
      });
    }
  };
  
  onMounted(() => {
    fetchStudentData();
  });
  </script>
  
  <style scoped>
  .evaluation-container {
    padding: 20px;
  }
  
  .evaluation-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .evaluation-table th,
  .evaluation-table td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  .evaluation-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-check-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .form-check {
    display: flex;
    align-items: center;
  }
  
  .form-check-label {
    margin-left: 5px;
  }
  
  .btn {
    margin-top: 20px;
  }
  </style>
  