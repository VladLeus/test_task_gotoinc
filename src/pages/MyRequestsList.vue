<template>
  <div class="min-h-screen flex flex-col items-center">
    <p class="text-main-color text-xl font-semibold mt-3">Your parcels</p>
    <div class="grid grid-cols-2 gap-3 py-3 place-items-center" v-show="myParcelsJson">
      <ParcelCard v-for="(parcel, index) in myParcels"
                  :key="index"
                  :parcel="parcel"
                  :parcel-idx="index"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import ParcelCard from "@/components/ParcelCard.vue";
import {myParcelsJson, myParcels} from "@/parcel";

</script>

<style scoped>

</style>
