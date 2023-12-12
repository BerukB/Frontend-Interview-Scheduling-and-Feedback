<script setup>
import BaseInput from '@/components/shared/BaseInput.vue';
import BaseButton from '@/components/shared/BaseButton.vue';
import BaseButton from '@/components/shared/BaseButton.vue';
</script>


<template>
 <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10">
    <div class="bg-white px-8 py-6 rounded-lg ">
      <form @submit.prevent="submit" class="flex flex-col space-y-2">

        <BaseSelect :options="candidateOptions" v-model="schedule.candidate" label="Candidate" />
        <BaseInput v-model="schedule.date" label="Date" type="datetime-local" :min="getCurrentDatetime"
          name="scheduleDate" />
        <BaseSelect :options="interviewType" v-model="schedule.interviewType" label="Interview Type" />
        <BaseSelect :options="formattedDurationList" v-model="schedule.duration" label="Duration" />
        <BaseSelect :options="position" v-model="schedule.position" label="Position" />
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