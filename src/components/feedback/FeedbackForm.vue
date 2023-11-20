<template>
  <form @submit.prevent="submit">
    <div class="flex justify-between mb-6">
      <BaseInput
        v-model="state.position"
        label="Interview Position"
        type="text"
        name="position"
        readonly
      />
      <BaseInput
        v-model="state.candidate"
        label="Interviewee Name"
        type="text"
        name="candidate"
        readonly
      />
    </div>
    <div class="flex justify-between mb-6">
      <BaseInput
        v-model="state.date"
        label="Interview Date"
        type="date"
        name="date"
        readonly
      />
      <BaseInput
        v-model="state.interviewer"
        label="Interviewer Name"
        type="text"
        name="interviewer"
        readonly
      />
    </div>
    <div class="mt-6">
      <h4 class="my-4 font-bold text-sm">Please fill the below Information</h4>
      <div class="flex justify-between mb-6">
        <BaseSelect
          :options="resultOptions"
          v-model="state.result"
          label="Result"
        />
        <BaseSelect
          :options="resultOptions"
          v-model="state.enockResult"
          label="Enock Result"
        />
      </div>
      <div class="flex justify-between mb-6">
        <BaseInput
          v-model="state.typingTestResult"
          label="Typing Test Result"
          type="text"
          name="typingTestResult"
        />
        <BaseInput
          v-model="state.testGorillaResult"
          label="Test Gorilla Result"
          type="text"
          name="testGorillaResult"
        />
      </div>
      <div class="flex justify-between mb-6">
        <div class="w-full">
          <label for="comment" class="block text-sm mb-2">Comments</label>
          <textarea
            v-model="state.comment"
            name="comment"
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
import { reactive, ref } from 'vue';
import BaseInput from '@/components/shared/BaseInput.vue';
import BaseSelect from '@/components/shared/BaseSelect.vue';
import BaseButton from '@/components/shared/BaseButton.vue';

const state = reactive({
    position:'',
    candidate: '',
    date: '',
    interviewer: '',
    selectedResult: '',
    selectedEnock: '',
    typingTestResult:'',
    testGorillaResult: '',
    comment: ''
})

const resultOptions = ref([
  'Passed',
  'Failed',
  'Pending'
])

function submit() {
    console.log("DATA", state);
}
</script>
