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
              <th>5</th>
              <th>4</th>
              <th>3</th>
              <th>2</th>
              <th>1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>สามารถวิเคราะห์ความสอดคล้องของสาระการเรียนรู้กับมาตรฐานการเรียนรู้ของหลักสูตร แกนกลางและหลักสูตรสถานศึกษา</td>
              <td><input type="radio" :value="5" v-model.number="criteria" required></td>
              <td><input type="radio" :value="4" v-model.number="criteria"></td>
              <td><input type="radio" :value="3" v-model.number="criteria"></td>
              <td><input type="radio" :value="2" v-model.number="criteria"></td>
              <td><input type="radio" :value="1" v-model.number="criteria"></td>
            </tr>
            <tr>
              <td>สามารถวิเคราะห์ความสอดคล้องของสาระการเรียนรู้เพื่อพัฒนาผู้เรียนให้มีปัญญารู้คิดและมีความเป็นนวัตกร</td>
              <td><input type="radio" :value="5" v-model.number="innovationAlignment" required></td>
              <td><input type="radio" :value="4" v-model.number="innovationAlignment"></td>
              <td><input type="radio" :value="3" v-model.number="innovationAlignment"></td>
              <td><input type="radio" :value="2" v-model.number="innovationAlignment"></td>
              <td><input type="radio" :value="1" v-model.number="innovationAlignment"></td>
            </tr>
            <tr>
              <td>สามารถเขียนแผนการจัดการเรียนรู้เพื่อพัฒนาผู้เรียนให้มีปัญญารู้คิดและมีความเป็นนวัตกร</td>
              <td><input type="radio" :value="5" v-model.number="learningPlan" required></td>
              <td><input type="radio" :value="4" v-model.number="learningPlan"></td>
              <td><input type="radio" :value="3" v-model.number="learningPlan"></td>
              <td><input type="radio" :value="2" v-model.number="learningPlan"></td>
              <td><input type="radio" :value="1" v-model.number="learningPlan"></td>
            </tr>
            <tr>
              <td>สามารถจัดการเรียนรู้ให้เป็นไปตามแผนการจัดการเรียนรู้เพื่อพัฒนาผู้เรียนให้มีปัญญารู้คิดและมีความเป็นนวัตกร</td>
              <td><input type="radio" :value="5" v-model.number="innovativeLearningPlan" required></td>
              <td><input type="radio" :value="4" v-model.number="innovativeLearningPlan"></td>
              <td><input type="radio" :value="3" v-model.number="innovativeLearningPlan"></td>
              <td><input type="radio" :value="2" v-model.number="innovativeLearningPlan"></td>
              <td><input type="radio" :value="1" v-model.number="innovativeLearningPlan"></td>
            </tr>
            <tr>
              <td>สามารถจัดกิจกรรมและสร้างบรรยากาศการเรียนรู้ให้ผู้เรียนมีความสุขในการเรียน</td>
              <td><input type="radio" :value="5" v-model.number="joyfulLearningActivities" required></td>
              <td><input type="radio" :value="4" v-model.number="joyfulLearningActivities"></td>
              <td><input type="radio" :value="3" v-model.number="joyfulLearningActivities"></td>
              <td><input type="radio" :value="2" v-model.number="joyfulLearningActivities"></td>
              <td><input type="radio" :value="1" v-model.number="joyfulLearningActivities"></td>
            </tr>
            <tr>
              <td>จัดกิจกรรมและสร้างบรรยากาศการเรียนรู้ให้ผู้เรียนโดยตระหนักถึงสุขภาวะของผู้เรียน</td>
              <td><input type="radio" :value="5" v-model.number="learnerWellbeingActivities" required></td>
              <td><input type="radio" :value="4" v-model.number="learnerWellbeingActivities"></td>
              <td><input type="radio" :value="3" v-model.number="learnerWellbeingActivities"></td>
              <td><input type="radio" :value="2" v-model.number="learnerWellbeingActivities"></td>
              <td><input type="radio" :value="1" v-model.number="learnerWellbeingActivities"></td>
            </tr>
            <tr>
              <td>สามารถดูแล ช่วยเหลือ และพัฒนาผู้เรียนเป็นรายบุคคลตามศักยภาพ</td>
              <td><input type="radio" :value="5" v-model.number="individualStudentDevelopment" required></td>
              <td><input type="radio" :value="4" v-model.number="individualStudentDevelopment"></td>
              <td><input type="radio" :value="3" v-model.number="individualStudentDevelopment"></td>
              <td><input type="radio" :value="2" v-model.number="individualStudentDevelopment"></td>
              <td><input type="radio" :value="1" v-model.number="individualStudentDevelopment"></td>
            </tr>
            <tr>
              <td>สามารถรายงานผลการพัฒนาคุณภาพผู้เรียนได้อย่างเป็นระบบ</td>
              <td><input type="radio" :value="5" v-model.number="systematicQualityReporting" required></td>
              <td><input type="radio" :value="4" v-model.number="systematicQualityReporting"></td>
              <td><input type="radio" :value="3" v-model.number="systematicQualityReporting"></td>
              <td><input type="radio" :value="2" v-model.number="systematicQualityReporting"></td>
              <td><input type="radio" :value="1" v-model.number="systematicQualityReporting"></td>
            </tr>
            <tr>
              <td>สามารถทำวิจัยที่สอดคล้องกับปัญหาของผู้เรียน</td>
              <td><input type="radio" :value="5" v-model.number="studentProblemResearch" required></td>
              <td><input type="radio" :value="4" v-model.number="studentProblemResearch"></td>
              <td><input type="radio" :value="3" v-model.number="studentProblemResearch"></td>
              <td><input type="radio" :value="2" v-model.number="studentProblemResearch"></td>
              <td><input type="radio" :value="1" v-model.number="studentProblemResearch"></td>
            </tr>
            <tr>
              <td>สามารถประยุกต์ใช้เทคโนโลยีดิจิทัลในการจัดการเรียนรู้ เช่น CAI, google classroom, Kahoot เป็นต้น</td>
              <td><input type="radio" :value="5" v-model.number="digitalLearningTools" required></td>
              <td><input type="radio" :value="4" v-model.number="digitalLearningTools"></td>
              <td><input type="radio" :value="3" v-model.number="digitalLearningTools"></td>
              <td><input type="radio" :value="2" v-model.number="digitalLearningTools"></td>
              <td><input type="radio" :value="1" v-model.number="digitalLearningTools"></td>
            </tr>
            <tr>
              <td>สามารถปฏิบัติงานร่วมกับผู้อื่นอย่างสร้างสรรค์</td>
              <td><input type="radio" :value="5" v-model.number="collaborativeCreativity" required></td>
              <td><input type="radio" :value="4" v-model.number="collaborativeCreativity"></td>
              <td><input type="radio" :value="3" v-model.number="collaborativeCreativity"></td>
              <td><input type="radio" :value="2" v-model.number="collaborativeCreativity"></td>
              <td><input type="radio" :value="1" v-model.number="collaborativeCreativity"></td>
            </tr>
            <tr>
              <td>มีส่วนร่วมในกิจกรรมการพัฒนาวิชาชีพ</td>
              <td><input type="radio" :value="5" v-model.number="professionalGrowthActivities" required></td>
              <td><input type="radio" :value="4" v-model.number="professionalGrowthActivities"></td>
              <td><input type="radio" :value="3" v-model.number="professionalGrowthActivities"></td>
              <td><input type="radio" :value="2" v-model.number="professionalGrowthActivities"></td>
              <td><input type="radio" :value="1" v-model.number="professionalGrowthActivities"></td>
            </tr>
          </tbody>
        </table>

        <div>
          <h5>ข้อเสนอแนะเพิ่มเติม</h5>
          <textarea v-model="additionalComments" class="form-control" rows="4" placeholder="ใส่ข้อเสนอแนะเพิ่มเติมที่นี่"></textarea>
        </div>

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
const time = ref('1');

const criteria = ref(null);
const innovationAlignment = ref(null)
const learningPlan = ref(null)
const innovativeLearningPlan = ref(null)
const joyfulLearningActivities = ref(null)
const learnerWellbeingActivities = ref(null)
const individualStudentDevelopment = ref(null)
const systematicQualityReporting = ref(null)
const studentProblemResearch = ref(null)
const digitalLearningTools = ref(null)
const collaborativeCreativity = ref(null)
const professionalGrowthActivities = ref(null)

const additionalComments = ref(''); // New state for additional comments

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

      criteria: criteria.value,
      innovationAlignment:innovationAlignment.value,
      learningPlan:learningPlan.value,
      innovativeLearningPlan:innovativeLearningPlan.value,
      joyfulLearningActivities:joyfulLearningActivities.value,
      learnerWellbeingActivities:learnerWellbeingActivities.value,
      individualStudentDevelopment:individualStudentDevelopment.value,
      systematicQualityReporting:systematicQualityReporting.value,
      studentProblemResearch:studentProblemResearch.value,
      digitalLearningTools:digitalLearningTools.value,
      collaborativeCreativity:collaborativeCreativity.value,
      professionalGrowthActivities:professionalGrowthActivities.value,

      additionalComments: additionalComments.value // Include additional comments in the payload
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

textarea.form-control {
  width: 100%;
  resize: none;
}
</style>
