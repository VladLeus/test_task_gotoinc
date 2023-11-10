<template>
  <div class="flex flex-col items-center justify-around">
    <div @click="toggleBtns"
         class="flex flex-col items-start justify-evenly w-[175px] h-max border-white rounded-[15px] bg-second-color
         md:w-[245px] 2xl:w-[285px]
    ">
      <div class="flex items-center justify-evenly pt-2 pl-2">
        <i class="fi fi-sr-marker text-third-color text-lg px-1 md:text-xl 2xl:text-2xl"></i>
        <p class="text-white text-md md:text-xl 2xl:text-2xl">From: <span class="font-semibold">{{ parcel.cityFrom }}</span></p>
      </div>
      <div class="flex items-center justify-evenly pl-2">
        <i class="fi fi-rr-route text-third-color text-lg px-1 md:text-xl 2xl:text-2xl"></i>
        <p class="text-white text-md md:text-xl 2xl:text-2xl">To: <span class="font-semibold">{{ parcel.cityTo }}</span></p>
      </div>
      <div class="flex items-center justify-evenly pl-2">
        <i class="fi fi-rr-box-open text-third-color text-lg px-1 md:text-xl 2xl:text-2xl"></i>
        <p class="text-white text-md md:text-xl 2xl:text-2xl">Type: <span class="font-semibold">{{ parcel.parcelType }}</span></p>
      </div>
      <div class="flex items-center justify-evenly pl-2 pb-2">
        <i class="fi fi-rr-calendar text-third-color text-lg px-1 md:text-xl 2xl:text-2xl"></i>
        <p class="text-white text-md md:text-xl 2xl:text-2xl">Dispatch: <span class="font-semibold text-sm md:text-xl 2xl:text-2xl">{{ parcel.dispatchDate }}</span></p>
      </div>
    </div>
    <Transition name="edit-btns">
      <div v-show="showButtons"
           class="flex items-center justify-between w-[55px] md:w-[75px] mx-auto bg-second-color rounded-[15px] mt-1">
        <i @click="toggleEditModal" class="fi fi-rr-pencil text-md text-white hover:text-green-400 pl-1 cursor-pointer md:text-xl 2xl:text-2xl"></i>
        <i @click="() => { deleteCurrParcel(); $emit('is-deleted')}" class="fi fi-rr-trash-xmark text-md text-white hover:text-red-700 pr-1 cursor-pointer md:text-xl 2xl:text-2xl"></i>
        <ModalParcelInfo :key="parcelIdx" :parcel="parcel" :parcel-idx="parcelIdx" :is-modal-active="isEditModalActive" @modal-is-active="toggleEditModal"/>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type {Parcel} from "@/parcel";
import type {Ref} from "vue";
import {ref} from "vue";
import ModalParcelInfo from "@/components/ModalParcelInfo.vue";
import {useRoute} from "vue-router";

const route = useRoute();
const showButtons: Ref<Boolean> = ref(false);
const isEditModalActive: any = ref(false);

const myParcelsJson: any = localStorage.getItem('myParcels');
const myParcels: Ref<Parcel[]> = myParcelsJson ? ref(JSON.parse(myParcelsJson)) : ref([]);
const tempParcels: Parcel[] = myParcels.value;

defineEmits(['is-deleted'])
const props = defineProps({
  parcel: {
    type: Object as () => Parcel,
    required: true
  },
  parcelIdx: {
    type: Number,
    default: null
  },
})

const toggleBtns = () => {
  if (route.path === '/requests') {
    showButtons.value = !showButtons.value
  }
}
const toggleEditModal = () => {
  const now: Date = new Date();
  const parcelDate: Date = new Date(props.parcel.dispatchDate
      .toString().split('.').reverse().join('-'))
  if (parcelDate > now) {
    isEditModalActive.value = !isEditModalActive.value
  } else {
    alert('You can\'t change info about parcels where dispatch date is today or earlier!')
  }
}

const deleteCurrParcel = () => {
  tempParcels.splice(props.parcelIdx, 1)
  myParcels.value = tempParcels;
  localStorage.setItem('myParcels', JSON.stringify(myParcels.value));
  toggleBtns();
}
</script>

<style>
.edit-btns-enter-active, .edit-btns-leave-active {
  transition: opacity 0.3s ease-in;
}

.edit-btns-enter-from, .edit-btns-leave-to {
  opacity: 0;
}
</style>
