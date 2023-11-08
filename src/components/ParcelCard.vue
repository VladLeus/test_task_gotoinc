<template>
  <div class="flex flex-col items-start justify-evenly w-[175px] h-max border-white rounded-[15px] bg-fourth-color">
    <div class="flex items-center justify-evenly pt-2 pl-2">
      <i class="fi fi-sr-marker text-fifth-color text-lg px-1"></i>
      <p class="text-main-color text-md">From: <span class="font-semibold">{{ parcel.cityFrom }}</span></p>
    </div>
    <div class="flex items-center justify-evenly pl-2">
      <i class="fi fi-rr-route text-fifth-color text-lg px-1"></i>
      <p class="text-main-color text-md">To: <span class="font-semibold">{{ parcel.cityTo }}</span></p>
    </div>
    <div class="flex items-center justify-evenly pl-2">
      <i class="fi fi-rr-box-open text-fifth-color text-lg px-1"></i>
      <p class="text-main-color text-md">Type: <span class="font-semibold">{{ parcel.parcelType }}</span></p>
    </div>
    <div class="flex items-center justify-evenly pl-2 pb-2">
      <i class="fi fi-rr-calendar text-fifth-color text-lg px-1"></i>
      <p class="text-main-color text-md">Dispatch: <span class="font-semibold">{{ parcel.dispatchDate }}</span></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Parcel} from "@/parcel";

defineProps({
  parcel: {
    type: Object as () => Parcel,
    required: true
  }
})
</script>

<style scoped>

</style>
