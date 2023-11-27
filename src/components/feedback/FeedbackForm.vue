<template>
  <form @submit.prevent="submit">
    <div class="flex justify-between mb-6 gap-6">
      <div class="w-1/2">
        <BaseInput
          v-model="state.position"
          label="Interview Position"
          type="text"
          name="position"
        />
      </div>
      <div class="w-1/2">
        <label class="block text-sm mb-2">Candidate Name</label>
        <select v-model="state.candidate">
          <option
            v-for="candidate in candidates"
            :key="candidate"
            :value="candidate._id"
          >
            {{ candidate.firstName }} {{ candidate.lastName }}
          </option>
        </select>
        <!-- <BaseInput
          v-model="state.candidate"
          label="Interviewee Name"
          type="text"
          name="candidate"
        /> -->
      </div>
    </div>
    <div class="flex justify-between mb-6 gap-6">
      <div class="w-1/2">
        <BaseInput
          v-model="state.date"
          label="Interview Date"
          type="date"
          name="date"
        />
      </div>
      <div class="w-1/2">
        <label class="block text-sm mb-2">Interviewer Name</label>
        <select v-model="state.interviewer">
          <option
            v-for="interviewer in interviewers"
            :key="interviewer"
            :value="interviewer._id"
          >
            {{ interviewer.firstName }} {{ interviewer.lastName }}
          </option>
        </select>
      </div>
    </div>
    <div class="mt-6">
      <h4 class="my-4 font-bold text-sm">Please fill the below Information</h4>
      <div class="flex justify-between mb-6 gap-6">
        <div class="w-1/2">
          <BaseSelect
            :options="resultOptions"
            v-model="state.result"
            label="Result"
          />
        </div>
        <div class="w-1/2">
          <BaseSelect
            :options="resultOptions"
            v-model="state.enockResult"
            label="Enock Result"
          />
        </div>
      </div>
      <div class="flex justify-between mb-6 gap-6">
        <div class="w-1/2">
          <BaseInput
            v-model="state.typingTestResult"
            label="Typing Test Result"
            type="text"
            name="typingTestResult"
          />
        </div>
        <div class="w-1/2">
          <BaseInput
            v-model="state.testGorillaResult"
            label="Test Gorilla Result"
            type="text"
            name="testGorillaResult"
          />
        </div>
      </div>
      <div class="flex justify-between mb-6 gap-6">
        <div class="w-1/2">
          <BaseSelect
            :options="educationalStatusOptions"
            v-model="state.educationalStatus"
            label="Educational Status"
          />
        </div>
        <div class="w-1/2">
          <BaseSelect
            :options="workStatusOptions"
            v-model="state.workStatus"
            label="Work Status"
          />
        </div>
      </div>
      <div class="flex justify-between mb-6 gap-6">
        <div class="w-1/2">
          <label class="block text-sm mb-2"
            >Willingness to work in rotational shifts</label
          >
          <BaseRadioGroup
            v-model="state.rotaionalShift"
            name="rotaionalShift"
            :options="BooleanOptions"
            vertical
          />
        </div>
        <div class="w-1/2">
          <label class="block text-sm mb-2 gap-6"
            >Willingness to work on the weekends</label
          >
          <BaseRadioGroup
            v-model="state.weekend"
            name="weekend"
            :options="BooleanOptions"
            vertical
          />
        </div>
      </div>
      <div class="flex justify-between mb-6 gap-6">
        <div class="w-1/2">
          <label class="block text-sm mb-2"
            >Willingness to commit to 1 month training</label
          >
          <BaseRadioGroup
            v-model="state.training"
            name="training"
            :options="BooleanOptions"
            vertical
          />
        </div>
        <div class="w-1/2">
          <label class="block text-sm mb-2">3 Months Contract awareness</label>
          <BaseRadioGroup
            v-model="state.threeMonthContract"
            name="threeMonthContract"
            :options="BooleanOptions"
            vertical
          />
        </div>
      </div>
      <div class="flex justify-between mb-6 gap-6">
        <div class="w-1/2">
          <label class="block text-sm mb-2">Salary</label>
          <BaseRadioGroup
            v-model="state.salary"
            name="salary"
            :options="BooleanOptions"
            vertical
          />
        </div>
        <div class="w-1/2">
          <label class="block text-sm mb-2">Kebele ID Possession</label>
          <BaseRadioGroup
            v-model="state.kebeleID"
            name="kebeleID"
            :options="BooleanOptions"
            vertical
          />
        </div>
      </div>
      <div class="flex justify-between mb-6 gap-6">
        <div class="w-full">
          <label for="comment" class="block text-sm mb-2"
            >Personal Feedback</label
          >
          <textarea
            v-model="state.personalFeedback"
            name="personalFeedback"
            cols="30"
            rows="10"
            class="w-full min-w-full border border-gray-100 bg-gray-50 rounded-md py-2 px-3 focus:outline-none"
          ></textarea>
        </div>
      </div>
      <div class="flex justify-end mb-6">
        <BaseButton text="Cancel" buttonType="secondary" />
        <BaseButton text="Submit" type="submit" />
      </div>
    </div>
  </form>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import BaseInput from '@/components/shared/BaseInput.vue';
import BaseSelect from '@/components/shared/BaseSelect.vue';
import BaseButton from '@/components/shared/BaseButton.vue';
import BaseRadioGroup from '@/components/shared/BaseRadioGroup.vue';
import { updateSchedule } from '@/services/ScheduleService'
import { useUserStore } from '@/stores/user'
import { useScheduleStore } from '@/stores/schedule'

const state = reactive({
    position:'',
    candidate: '',
    date: '',
    interviewer: '',
    typingTestResult:'',
    testGorillaResult: '',
    educationalStatus: '',
    rotaionalShift: '',
    weekend: '',
    training: '',
    threeMonthContract: '',
    salary: '',
    kebeleID: '',
    personalFeedback: ''
})

const resultOptions = ref([
  'Passed',
  'Failed',
  'Pending'
])

const educationalStatusOptions = ref([
  'Collage Dropout',
  '12th graduate ',
  'Undergraduate',
  'Bachelors Degree',
  'Masters Degree',
  'Doctorate or Ph.D.'
])

const workStatusOptions = ref([
  'Employed',
  'Unemployed',
  'Self-Employed',
  'Freelancer',
  'Intern'
])

const BooleanOptions = ref([
  {label: 'Yes', value: true},
  {label: 'No', value: false}
])

const userStore = useUserStore()

const scheduleStore = useScheduleStore()

const interviewers = computed(() => {
  return userStore.filterInterviewers
})

const candidates = computed(()=>{
  return userStore.filterCandidates
})

function submit() {
    console.log("DATA", state);
    updateSchedule(state)
}

// function interviewers() {
//   getSchedules()
// }

onMounted(() => {
  userStore.fetchUsers()
  scheduleStore.fetchSchedules(`interviewer=654e3f74027ffa948ebb09e2`)
})
</script>

<style scoped>
select {
  width: 100%;
  height: 52px;
  min-width: 300px;
  padding: 0 24px 0 10px;
  vertical-align: middle;
  background: #fff
    url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E")
    no-repeat right 12px center;
  background-size: 8px 10px;
  border: solid 1px rgba(0, 0, 0, 0.4);
  border-radius: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  @apply border border-gray-100 bg-gray-50 rounded-md
}
</style>
