<template>
  <div class="min-h-screen flex flex-col items-center">
    <p class="text-main-color text-xl font-semibold mt-3">Your parcels</p>
    <div class="grid grid-cols-2 gap-3 py-3 place-items-center" v-show="myParcelsJson">
      <ParcelCard v-for="(parcel, index) in myParcels"
                  :key="index"
                  :parcel="parcel"
                  :parcel-idx="index"
                  @is-deleted="checkIfDeleted"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ParcelCard from "@/components/ParcelCard.vue";
import type {Ref} from "vue";
import type {Parcel} from "@/parcel";
import {ref} from "vue";

const myParcelsJson: any = localStorage.getItem('myParcels');
const isDeleted: any = ref(false);
const myParcels: Ref<Parcel[]> = myParcelsJson ? ref(JSON.parse(myParcelsJson)) : ref([]);

const checkIfDeleted = () => {
  isDeleted.value = !isDeleted.value
  if (isDeleted) {
    myParcels.value = JSON.parse(localStorage.getItem('myParcels'))
    isDeleted.value = !isDeleted.value
  }
}
</script>

<style scoped>

</style>
