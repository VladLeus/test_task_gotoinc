<template>
  <main class="flex flex-col">
    <h1 class="text-main-color font-bold font-sans text-2xl mx-auto mt-5">Welcome back!</h1>
    <div class="flex flex-col border-y border-blue-200 mx-auto mt-5 items-center w-[360px]">
      <p class="text-main-color text-xl font-semibold mt-3">Your last parcels</p>
      <div v-show="myParcelsJson" class="grid grid-cols-2 gap-3 py-3 place-items-center">
        <ParcelCard v-for="(parcel, index) in myParcels"
                    :key="index"
                    :parcel="parcel"
                    :parcel-idx="index"/>
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
    <div class="flex flex-col items-center justify-evenly border-b border-blue-200 mx-auto mt-5 w-[360px]">
      <p class="text-main-color font-bold text-xl">We deliver faster than anybody!</p>
      <img class="w-[128px] h-[128px]" src="@/assets/img/delivery-truck-main.png" alt="delivery-track">
      <p class="text-main-color font-bold text-xl">We deliver all around the globe!</p>
      <img class="w-[128px] h-[128px] mt-3" src="@/assets/img/pin.png" alt="globe">
      <p class="text-main-color font-bold text-xl mt-3">We deliver anything!</p>
      <img class="w-[128px] h-[128px] my-3" src="@/assets/img/package.png" alt="parcel">
    </div>
  </main>
</template>

<script setup lang="ts">
import ParcelCard from "@/components/ParcelCard.vue";
import {RouterLink} from "vue-router";
import type {Parcel} from "@/parcel";
import {ParcelType} from "@/parcel";


localStorage.setItem('myParcels', JSON.stringify([
  {
    cityFrom: 'New York',
    cityTo: 'New Jersey',
    parcelType: ParcelType.CLOTHES,
    dispatchDate: new Date('2023.11.25').toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    })
  },
  {
    cityFrom: 'Kyiv',
    cityTo: 'Cherkasy',
    parcelType: ParcelType.GADGETS,
    dispatchDate: new Date().toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    })
  },
  {
    cityFrom: 'London',
    cityTo: 'Berlin',
    parcelType: ParcelType.DRINKS,
    dispatchDate: new Date().toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    })
  },
  {
    cityFrom: 'Cherkasy',
    cityTo: 'Madrid',
    parcelType: ParcelType.OTHER,
    dispatchDate: new Date().toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    })
  },
  {
    cityFrom: 'Kyiv',
    cityTo: 'Cherkasy',
    parcelType: ParcelType.GADGETS,
    dispatchDate: new Date().toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    })
  },
  {
    cityFrom: 'London',
    cityTo: 'Berlin',
    parcelType: ParcelType.DRINKS,
    dispatchDate: new Date().toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    })
  },
  {
    cityFrom: 'Cherkasy',
    cityTo: 'Madrid',
    parcelType: ParcelType.OTHER,
    dispatchDate: new Date().toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    })
  },
  {
    cityFrom: 'Kyiv',
    cityTo: 'Cherkasy',
    parcelType: ParcelType.GADGETS,
    dispatchDate: new Date().toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    })
  },
  {
    cityFrom: 'London',
    cityTo: 'Berlin',
    parcelType: ParcelType.DRINKS,
    dispatchDate: new Date().toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    })
  },
  {
    cityFrom: 'Cherkasy',
    cityTo: 'Madrid',
    parcelType: ParcelType.OTHER,
    dispatchDate: new Date().toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    })
  },
  {
    cityFrom: 'Kyiv',
    cityTo: 'Cherkasy',
    parcelType: ParcelType.GADGETS,
    dispatchDate: new Date().toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    })
  },
  {
    cityFrom: 'London',
    cityTo: 'Berlin',
    parcelType: ParcelType.DRINKS,
    dispatchDate: new Date().toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    })
  },
  {
    cityFrom: 'Cherkasy',
    cityTo: 'Madrid',
    parcelType: ParcelType.OTHER,
    dispatchDate: new Date().toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    })
  },
]));

const myParcelsJson = localStorage.getItem('myParcels');


const myParcels: Parcel[] = myParcelsJson ? JSON.parse(myParcelsJson).slice(0, 4) : [];

</script>

