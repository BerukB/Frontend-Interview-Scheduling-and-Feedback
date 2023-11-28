<script setup>
import { reactive, ref, computed, onMounted, watch} from 'vue';
import axios from 'axios';
import BaseInput from '@/components/shared/BaseInput.vue';
import BaseSelect from '@/components/shared/BaseSelect.vue';
import BaseButton from '@/components/shared/BaseButton.vue';
// import BaseSearchInput from './shared/BaseSearchInput.vue';
import ComboBox from './shared/ComboBox.vue';
// const searchInput = ref('');

import { useScheduleStore } from '../stores/scheduleStore';
const scheduleStore = useScheduleStore();

const interviewerListSet = ref(false);
const isClientListSet = ref(false);
const clientList = ref([]);
const interviewerList = ref([]);

const interviewType = ref([
  'In-person',
  'Client'
])

const durationList = ref([5, 10, 15, 20, 25, 30, 45, 60])


const schedule = reactive({
  candidate: '',
  date: '',
  duration: '',
  interviewType: '',
  interviewer: '', 
  client: '',
})

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
      label: interviewer.firstName
    }));
  } catch (error) {
    console.error('Error in setClientList:', error);
  }
};

onMounted(async () => {
  await Promise.all([fetchClient(), fetchInterviewer()]);
  console.log("CLIENTS:", clientList.value);
  console.log("interviewerList:", interviewerList.value);
});



const user = ref()
console.log("helooooooo", user.value)
async function loadUsers(query, setOptions) {
  const response = await axios.get("http://localhost:3000/api/clients", {
    params: { q: query }
  });
  const result = response.data.data;
  console.log("weeeeeeeeeeeee", result)

  setOptions(
    result.map(user => {
      return {
        value: user._id,
        label: user.name,
      }
    })
  )
}



async function submit() {
  // try {
    console.log("DATA", schedule);
  //   const response = await axios.post('http://localhost:3000/api/schedules', schedule.value);

  //   console.log("POST response:", response.data);

  // } catch (error) {
  //   console.error("Error in POST request:", error);

  // }
}
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10">
    <div class="bg-white p-8 rounded-lg ">
      <form @submit.prevent="submit">
        <!-- Your popup content goes here -->
        <BaseSelect :options="candidateList" v-model="schedule.candidate" label="Candidate" />
        <BaseInput v-model="schedule.startDateTime" label="Date" type="datetime-local" name="scheduleDate" />
        <BaseSelect :options="interviewType" v-model="schedule.interviewType" label="Interview Type" />
        <BaseSelect :options="durationList" v-model="schedule.durationList" label="Duration" />
        <BaseSelect :options="interviewerList" v-model="schedule.interviewer" label="Interviewer" />

        <BaseSelect :options="clientList" v-model="schedule.client" label="client" />
        <!-- <ComboBox :load-options="loadUsers" v-model="user" /> -->

        <div class="flex justify-end ">
          <BaseButton text="Discard" buttonType="secondary" />
          <BaseButton text="Submit" type="submit" />
        </div>
      </form>
    </div>
  </div>
</template> 