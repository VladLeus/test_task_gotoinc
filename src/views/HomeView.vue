<template>
  <main class="flex flex-col">
    <h1 class="text-main-color font-bold font-sans text-2xl mx-auto mt-5">Welcome back!</h1>
    <div class="flex flex-col border-y border-blue-200 mx-auto mt-5 items-center w-[360px]">
      <p class="text-main-color text-xl font-semibold mt-3">Your last parcels</p>
      <div v-show="myParcelsJson" class="grid grid-cols-2 gap-3 py-3 place-items-center">
        <ParcelCard v-for="(parcel, index) in myParcels" :key="index" :my-enum="ParcelType" :parcel="parcel"/>
      </div>
    </div>
    <div class="flex flex-col border-b border-blue-200 mx-auto mt-5 items-center w-[360px]">
      <p class="text-lg text-main-color mt-1.5 font-semibold">Want to send a new parcel?</p>
      <RouterLink :to="{name:'new-parcel'}">
        <div
            class="flex items-center justify-evenly w-max h-[50px] bg-fourth-color rounded-[15px] cursor-pointer mt-3 mb-5">
          <p class="text-main-color text-md font-bold pl-2 hover:text-black transition">Send new!</p>
          <img class="w-[60px] h-[60px] bg-transparent mx-2" src="@/assets/img/delivery-truck.gif"
               alt="truck delivery">
        </div>
      </RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import ParcelCard from "@/components/ParcelCard.vue";
import {RouterLink} from "vue-router";
enum ParcelType {
  GADGETS = 'gadgets',
  DRINKS = 'drinks',
  CLOTHES = 'clothes',
  MEDICINES = 'medicines',
  OTHER = 'other'
}

interface Parcel {
  cityFrom: string,
  cityTo: string,
  parcelType: ParcelType,
  dispatchDate: Date,
  parcelDescription?: string
}

localStorage.setItem('myParcels', JSON.stringify([
  {
    cityFrom: 'New York',
    cityTo: 'New Jersey',
    parcelType: ParcelType.CLOTHES,
    dispatchDate: new Date().toLocaleDateString('uk-UA', {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric'
    })
  },
  {
    cityFrom: 'Kyiv',
    cityTo: 'Cherkasy',
    parcelType: ParcelType.GADGETS,
    dispatchDate: new Date().toLocaleDateString('uk-UA', {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric'
    })
  },
  {
    cityFrom: 'London',
    cityTo: 'Berlin',
    parcelType: ParcelType.DRINKS,
    dispatchDate: new Date().toLocaleDateString('uk-UA', {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric'
    })
  },
  {
    cityFrom: 'Cherkasy',
    cityTo: 'Madrid',
    parcelType: ParcelType.OTHER,
    dispatchDate: new Date().toLocaleDateString('uk-UA', {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric'
    })
  },
]));

const myParcelsJson = localStorage.getItem('myParcels');


const myParcels: Parcel[] = myParcelsJson ? JSON.parse(myParcelsJson).slice(0, 4) : [];

</script>

