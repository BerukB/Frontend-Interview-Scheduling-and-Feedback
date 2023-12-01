<template>
  <form @submit.prevent="submit">
    <div class="flex justify-between mb-6 gap-6">
      <div class="w-full">
        <BaseInput
          v-model="position"
          label="Interview Position"
          type="text"
          name="position"
          readonly
        />
      </div>
    </div>
    <div class="flex justify-between mb-6 gap-6">
      <div class="w-1/2">
        <BaseInput
          v-model="date"
          label="Interview Date"
          type="text"
          name="date"
          readonly
        />
      </div>
      <div class="w-1/2">
        <BaseInput
          v-model="interviewer"
          label="Interviewer Name"
          type="text"
          name="interviewer"
          readonly
        />
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
            v-model="state.rotationalShift"
            name="rotationalShift"
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
import { computed, reactive, ref, toRefs } from 'vue';
import BaseInput from '@/components/shared/BaseInput.vue';
import BaseSelect from '@/components/shared/BaseSelect.vue';
import BaseButton from '@/components/shared/BaseButton.vue';
import BaseRadioGroup from '@/components/shared/BaseRadioGroup.vue';
import { updateSchedule } from '@/services/ScheduleService'
import { MDYhmFormat } from '@/utils/DateFormat.js'
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps({
  schedule: {
    type: Object
  }
})

const { schedule } = toRefs(props)

const position = ref(schedule.value.position)
const date = ref(MDYhmFormat(schedule.value.date))


const interviewer = computed(() => {
  return `${schedule.value.interviewer.firstName} ${schedule.value.interviewer.lastName}`
})

const state = reactive({
    result: schedule.value.feedback?.result || '',
    enockResult: schedule.value.feedback?.enockResult || '',
    typingTestResult: schedule.value.feedback?.typingTestResult || '',
    testGorillaResult: schedule.value.feedback?.testGorillaResult || '',
    educationalStatus: schedule.value.feedback?.educationalStatus || '',
    workStatus: schedule.value.feedback?.workStatus || '',
    rotationalShift: schedule.value.feedback?.rotationalShift,
    weekend: schedule.value.feedback?.weekend,
    training: schedule.value.feedback?.training,
    threeMonthContract: schedule.value.feedback?.threeMonthContract,
    salary: schedule.value.feedback?.salary,
    kebeleID: schedule.value.feedback?.kebeleID,
    personalFeedback: schedule.value.feedback?.personalFeedback
})

const resultOptions = ref([
  {label: 'Passed', value: 'Passed'},
  {label: 'Failed', value: 'Failed'},
])

const educationalStatusOptions = ref([
  {label: 'Collage Dropout', value: 'Collage Dropout'},
  {label: '12th graduate', value: '12th graduate'},
  {label: 'Undergraduate', value: 'Undergraduate'},
  {label: 'Bachelors Degree', value: 'Bachelors Degree'},
  {label: 'Masters Degree', value: 'Masters Degree'},
  {label: 'Doctorate or Ph.D.', value: 'Doctorate or Ph.D.'}
])

const workStatusOptions = ref([
  {label: 'Employed', value: 'Employed'},
  {label: 'Unemployed', value: 'Unemployed'},
  {label: 'Self-Employed', value: 'Self-Employed'},
  {label: 'Freelancer', value: 'Freelancer'},
  {label: 'Intern', value: 'Intern'}
])

const BooleanOptions = ref([
  {label: 'Yes', value: true},
  {label: 'No', value: false}
])

const feedbackData = {
  attendance: 'Came',
  feedback: state
}

function submit() {
  updateSchedule(schedule.value._id, feedbackData)
  router.back()
}
</script>
