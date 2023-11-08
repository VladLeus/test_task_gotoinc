<template>
  <div class="flex flex-col items-center justify-around">
    <div @click="toggleBtns"
         class="flex flex-col items-start justify-evenly w-[175px] h-max border-white rounded-[15px] bg-fourth-color">
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
        <p class="text-main-color text-md">Dispatch: <span class="font-semibold text-sm">{{ parcel.dispatchDate }}</span></p>
      </div>
    </div>
    <Transition name="edit-btns">
      <div v-show="showButtons"
           class="flex items-center justify-between w-[55px] mx-auto bg-fourth-color rounded-[15px] mt-1">
        <i @click="toggleEditModal" class="fi fi-rr-pencil text-md text-main-color hover:text-green-400 pl-1"></i>
        <i class="fi fi-rr-trash-xmark text-md text-main-color hover:text-red-700 pr-1"></i>
        <ModalParcelInfo :parcel="parcel" :parcel-idx="parcelIdx" :is-modal-active="isEditModalActive" @modal-is-active="toggleEditModal"/>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type {Parcel} from "@/parcel";
import type {Ref} from "vue";
import {ref} from "vue";
import ModalParcelInfo from "@/components/ModalParcelInfo.vue";

const showButtons: Ref<Boolean> = ref(false);
const isEditModalActive: any = ref(false);
const isDeleteModalActive: any = ref(false)

defineProps({
  parcel: {
    type: Object as () => Parcel,
    required: true
  },
  parcelIdx: {
    type: Number
  }
})

const toggleBtns = () => {
  showButtons.value = !showButtons.value;
}
const toggleEditModal = () => {
  isEditModalActive.value = !isEditModalActive.value
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
