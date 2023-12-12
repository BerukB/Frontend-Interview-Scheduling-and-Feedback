<script setup>
import { reactive, ref, onMounted, computed, watch } from 'vue';
import BaseInput from '@/components/shared/BaseInput.vue';
import BaseSelect from '@/components/shared/BaseSelect.vue';
import BaseButton from '@/components/shared/BaseButton.vue';
import { useScheduleStore } from '../stores/scheduleStore';
import { useEventStore } from '../stores/eventStore';
import { createSchedule, updateSchedule } from '../services/ScheduleService';
import { NotificationToast } from '@/utils/NotificationToast';
import { MDYhmFormat } from '@/utils/DateFormat.js'

const scheduleStore = useScheduleStore();
const eventStore = useEventStore();

const interviewerListSet = ref(false);
const isClientListSet = ref(false);
const isCandidateListSet = ref(false);
const clientList = ref([]);
const interviewerList = ref([]);
const candidateList = ref([]);
const candidate = ref([]);
const isClientInterview = computed(() => schedule.interviewType === 'Client');
const currentCandidateId = computed(() => scheduleStore.getCurrentCandidateID);
const currentScheduleById = computed(() => eventStore.getScheduleById);
// const scheduleList = computed(() => scheduleStore.getSchedules);
console.log("schedule aaaaaaaaaaaaaaaaa", currentScheduleById.value._id);

const candidateOptions = computed(() => {
  return candidate.value.length > 0 ? candidate.value : candidateList.value;
});

const interviewType = ref([
  { value: 'In-person', label: 'In-person', },
  { value: 'Client', label: 'Client', }

])

// const position = ref([
//   { value: 'SDR', label: 'SDR', }

// ])

const durationList = ref([5, 10, 15, 20, 25, 30, 45, 60])
const formattedDurationList = durationList.value.map(duration => ({
  value: duration.toString(),
  label: `${duration} minutes`,
}));

const schedule = reactive({
  candidate: '',
  date: '',
  duration: 0,
  interviewType: '',
  interviewer: '',
  position: '',
  client: '',
})

const closePopup = () => {
  scheduleStore.setCandiateToEmpty();
  scheduleStore.setCurrentCandidateID(null);
  for (const key in schedule) {
    schedule[key] = '';
  }

  scheduleStore.setPopupValue(false);
}

const fetchClient = async () => {
  try {
    await scheduleStore.setClientList();
    isClientListSet.value = true;

    clientList.value = scheduleStore.getClientList.map(client => ({
      value: client._id,
      label: client.name
    }));
  } catch (error) {
    console.error('Error in setClientList:', error);
  }
};


const fetchInterviewer = async () => {
  try {
    await scheduleStore.setInterviewerList();
    interviewerListSet.value = true;

    interviewerList.value = scheduleStore.getInterviewerList.map(interviewer => ({
      value: interviewer._id,
      label: `${interviewer.firstName} ${interviewer.lastName}`
    }));
  } catch (error) {
    console.error('Error in setClientList:', error);
  }
};

const fetchCandidate = async () => {
  try {
    await scheduleStore.setCandidateList();
    isCandidateListSet.value = true;
    candidateList.value = scheduleStore.getCandidateList.map(candidate => ({
      value: candidate._id,
      label: `${candidate.user.firstName} ${candidate.user.lastName}`
    }));

  } catch (error) {
    console.error('Error in setClientList:', error);
  }
};
const fetchCandidateById = async (id) => {
  try {
    await scheduleStore.setCandidateById(id);
    candidate.value = scheduleStore.getCandidate.map(candidate => ({
      value: candidate._id,
      label: `${candidate.user.firstName} ${candidate.user.lastName}`
    }));
  } catch (error) {
    console.error('Error in fetchCandidateById:', error);
  }
};



watch(() => currentCandidateId.value, (newCandidateId, oldCandidateId) => {
  console.log('Hello its me:', candidate.value);
  console.log('Candidate ID changed:', oldCandidateId, '->', newCandidateId);
  if (newCandidateId !== null) fetchCandidateById(newCandidateId);
});

onMounted(async () => {
  await Promise.all([fetchClient(), fetchInterviewer(), fetchCandidate()]);

  
  // Check if there is data in currentScheduleById.value
  if (currentScheduleById.value) {
    const scheduleData = currentScheduleById.value;
    const datein = MDYhmFormat(scheduleData.date)
    console.log("abebebeso",  datein );
    // Assign values from currentScheduleById to schedule
    schedule.candidate = scheduleData.candidate._id|| '';
    schedule.date = datein || '';
    schedule.duration = scheduleData.duration || 0;
    schedule.interviewType = scheduleData.interviewType || '';
    schedule.interviewer = scheduleData.interviewer._id || '';
    schedule.position = scheduleData.position || '';
    schedule.client = scheduleData.client || '';
  }
});



const getCurrentDatetime = computed(() => {
  const now = new Date();
  const formattedDatetime = now.toISOString().slice(0, 16);
  return formattedDatetime;
});


async function submit() {
  try {
    schedule.interviewType !== 'Client' ? delete schedule.client : ''
    scheduleStore.setCandiateToEmpty();
    scheduleStore.setCurrentCandidateID(null);
    if(currentScheduleById.value._id){
      const { data } = await updateSchedule(currentScheduleById.value._id, schedule)
      data ? NotificationToast("Meeting Scheduled", 'success') : ""
    }else {
      const { data } = await createSchedule(schedule);
    data ? NotificationToast("Meeting Scheduled", 'success') : ""
    }
  

  } catch (error) {
    console.error("Error in POST request:", error);
    NotificationToast(error.data.message, 'error')
  }
  for (const key in schedule) {
    schedule[key] = '';
  }
  scheduleStore.setPopupValue(false);
}
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10">
    <div class="bg-white px-8 py-6 rounded-lg ">
      <form @submit.prevent="submit" class="flex flex-col space-y-4">
<div class="flex flex-row space-x-4">
  
          <div class="flex flex-col space-y-2">
            <BaseSelect :options="candidateOptions" v-model="schedule.candidate" label="Candidate" />
            <BaseInput v-model="schedule.date" label="Date" type="datetime-local" :min="getCurrentDatetime"
              name="scheduleDate" />
            <BaseSelect :options="interviewType" v-model="schedule.interviewType" label="Interview Type" />
          </div>
          <div class="flex flex-col space-y-2">
            <BaseSelect :options="formattedDurationList" v-model="schedule.duration" label="Duration" />
            <BaseInput v-model="schedule.position" label="Position" />
            <BaseSelect :options="interviewerList" v-model="schedule.interviewer" label="Interviewer" />
            <BaseSelect v-show="isClientInterview" :options="clientList" v-model="schedule.client" label="client" />
          </div>
</div>
        <!-- <ComboBox :load-options="loadUsers" v-model="user" /> -->

        <div class="flex justify-center ">
          <BaseButton @click="closePopup" text="Discard" type="button" buttonType="secondary" />
          <BaseButton text="Submit" type="submit" />
        </div>
      </form>
    </div>
  </div>
</template> 