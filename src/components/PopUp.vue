<script setup>
import { reactive, ref, onMounted, computed, defineProps, watch} from 'vue';
import BaseInput from '@/components/shared/BaseInput.vue';
import BaseSelect from '@/components/shared/BaseSelect.vue';
import BaseButton from '@/components/shared/BaseButton.vue';
// import BaseSearchInput from './shared/BaseSearchInput.vue';
// import ComboBox from './shared/ComboBox.vue';
// const searchInput = ref('');

import { useScheduleStore } from '../stores/scheduleStore';
import { createSchedule } from '../services/ScheduleService';
const scheduleStore = useScheduleStore();

const interviewerListSet = ref(false);
const isClientListSet = ref(false);
const isCandidateListSet = ref(false);
const clientList = ref([]);
const interviewerList = ref([]);
const candidateList = ref([]);
const candidate = ref([]);
const isClientInterview = computed(() => schedule.interviewType === 'Client');
const props = defineProps({
  candidateId: {
    type: String,
  },
});
const candidateOptions = computed(() => {
  return candidate.value.length>0 ? candidate.value : candidateList.value;
});
console.log("candidateOptions",  candidateOptions.value)
console.log("propscandidateId",   props.candidateId)
const interviewType = ref([
  {value: 'In-person',label: 'In-person',},
  {value: 'Client', label: 'Client',}

])

const durationList = ref([5, 10, 15, 20, 25, 30, 45, 60])
const formattedDurationList = durationList.value.map(duration => ({
  value: duration.toString(), // Convert the number to a string if needed
  label: `${duration} minutes`,
}));

const schedule = reactive({
  candidate: '',
  date: '',
  duration: 0,
  interviewType: '',
  interviewer: '',
  client: '',
})
const closePopup = () =>{
  for (const key in schedule) {
    schedule[key] = ''; // Reset each form field to an empty string
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
      label: `${candidate.firstName} ${candidate.lastName}`
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
      label: `${candidate.firstName} ${candidate.lastName}`
    }));
    console.log("chemdesa",  candidate.value)
  } catch (error) {
    console.error('Error in fetchCandidateById:', error);
  }
};
watch(() => props.candidateId, (newCandidateId, oldCandidateId) => {

  console.log('Candidate ID changed:', oldCandidateId, '->', newCandidateId);

  fetchCandidateById(newCandidateId);
});

onMounted(async () => {
  await Promise.all([fetchClient(), fetchInterviewer(), fetchCandidate()]);
  // console.log("CLIENTS:", clientList.value);
  // console.log("interviewerList:", interviewerList.value);
   console.log("candList:", candidateList.value);
});



// const user = ref()
// console.log("helooooooo", user.value)
// async function loadUsers(query, setOptions) {
//   const response = await axios.get("http://localhost:3000/api/clients", {
//     params: { q: query }
//   });
//   const result = response.data.data;
//   console.log("weeeeeeeeeeeee", result)

//   setOptions(
//     result.map(user => {
//       return {
//         value: user._id,
//         label: user.name,
//       }
//     })
//   )
// }
const getCurrentDatetime = computed(() => {
  const now = new Date();
  // Format the date and time as a string in the required format (YYYY-MM-DDThh:mm)
  const formattedDatetime = now.toISOString().slice(0, 16);
  console.log(formattedDatetime);
  return formattedDatetime;
});


async function submit() {
  try {
  console.log("DATA", schedule);
    // const response = await axios.post('http://localhost:3000/api/schedules', schedule);
    
    const response = await createSchedule(schedule);

    console.log("POST response:", response.data);
  
  } catch (error) {
    console.error("Error in POST request:", error);

  }
  for (const key in schedule) {
    schedule[key] = ''; // Reset each form field to an empty string
  }
  scheduleStore.setPopupValue(false);
}
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10">
    <div class="bg-white px-8 py-6 rounded-lg ">
      <form @submit.prevent="submit" class="flex flex-col space-y-2">
        <!-- Your popup content goes here -->
        <BaseSelect :options="candidateOptions" v-model="schedule.candidate" label="Candidate" />
        <BaseInput v-model="schedule.date" label="Date" type="datetime-local" :min="getCurrentDatetime" name="scheduleDate" />
        <BaseSelect :options="interviewType" v-model="schedule.interviewType" label="Interview Type" />
        <BaseSelect :options="formattedDurationList" v-model="schedule.duration" label="Duration" />
        <BaseSelect :options="interviewerList" v-model="schedule.interviewer" label="Interviewer" />

        <BaseSelect v-show="isClientInterview" :options="clientList" v-model="schedule.client" label="client" />
        <!-- <ComboBox :load-options="loadUsers" v-model="user" /> -->

        <div class="flex justify-end ">
          <BaseButton @click="closePopup" text="Discard" type="button" buttonType="secondary" />
          <BaseButton text="Submit" type="submit" />
        </div>
      </form>
    </div>
  </div>
</template> 