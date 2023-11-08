<template>
  <Transition name="modal-parcel">
    <div v-show="isModalActive" class="flex flex-col items-start justify-evenly w-[375px] h-[300px] border-white rounded-[15px] bg-main-color modal z-10">
      <div class="flex items-center justify-evenly pt-2 pl-2">
        <i class="fi fi-sr-marker text-fifth-color text-lg px-1"></i>
        <label for="cityFrom" class="text-white text-md">From:</label>
        <input type="text" id="cityFrom" v-model="parcel.cityFrom" class="font-semibold ml-3 rounded-[15px] pl-2 outline-0 py-1">
      </div>
      <div class="flex items-center justify-evenly pl-2">
        <i class="fi fi-rr-route text-fifth-color text-lg px-1"></i>
        <label for="cityTo" class="text-white text-md">To:</label>
        <input type="text" id="cityTo" v-model="parcel.cityTo" class="font-semibold ml-3 rounded-[15px] pl-2 outline-0 py-1">
      </div>
      <div class="flex items-center justify-evenly pl-2">
        <i class="fi fi-rr-box-open text-fifth-color text-lg px-1"></i>
        <label for="parcelType" class="text-white text-md">Type:</label>
        <select id="parcelType" v-model="parcel.parcelType" class="font-semibold ml-3 rounded-[15px] pl-2 outline-0 py-1">
          <option v-for="type in parcelTypes" :key="type">{{ type }}</option>
        </select>
      </div>
      <div class="flex items-center justify-evenly pl-2 pb-2">
        <i class="fi fi-rr-calendar text-fifth-color text-lg px-1"></i>
        <label for="dispatchDate" class="text-white text-md">Dispatch:</label>
        <input type="date" id="dispatchDate" v-model="parcel.dispatchDate" class="font-semibold ml-3 rounded-[15px] pl-2 outline-0 py-1">
      </div>
      <div class="flex items-center w-max justify-around mx-auto">
        <p class="w-[90px] h-[45px] bg-green-400 rounded-[15px] flex items-center justify-center mx-1 text-white font-bold">Save</p>
        <p @click="$emit('modal-is-active')" class="w-[90px] h-[45px] bg-red-600 rounded-[15px] flex items-center justify-center mx-1 text-white font-bold">Cancel</p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type {Parcel} from "@/parcel";
import {ParcelType} from "@/parcel";

const parcelTypes = Object.values(ParcelType);

defineEmits(['modal-is-active']);
defineProps({
  parcel: {
    type: Object as () => Parcel,
    required: true
  },
  isModalActive: {
    type: Boolean,
    default: false
  },
  parcelIdx: {
    type: Number,
    default: null
  }
})

</script>

<style>
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal-parcel-enter-active, .modal-parcel-leave-active {
  transition: opacity 0.3s ease-in;
}

.modal-parcel-enter-from, .modal-parcel-leave-to {
  opacity: 0;
}
</style>
