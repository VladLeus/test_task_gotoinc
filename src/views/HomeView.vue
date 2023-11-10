<template>
  <main class="flex flex-col">
    <h1 class="text-main-color font-bold font-sans text-2xl mx-auto mt-5 md:text-3xl 2xl:text-4xl">Welcome back!</h1>
    <div class="flex flex-col border-y border-blue-200 mx-auto mt-5 items-center w-[360px] md:container">
      <p v-show="myParcels.length === 0" class="text-main-color text-xl font-semibold mt-3
      md:text-2xl 2xl:text-3xl pb-3">You currently have no parcels</p>
      <p v-show="myParcels.length !== 0" class="text-main-color text-xl font-semibold mt-3 md:text-2xl 2xl:text-3xl">Your last parcels</p>
      <div v-show="myParcels.length !== 0" class="grid grid-cols-2 gap-3 py-3 place-items-center">
        <ParcelCard v-for="(parcel, index) in myParcels"
                    :key="index"
                    :parcel="parcel"
                    :parcel-idx="index"/>
      </div>
    </div>
    <div class="flex flex-col border-b border-blue-200 mx-auto mt-5 items-center w-[360px] md:container">
      <p class="text-lg text-main-color mt-1.5 font-semibold md:text-2xl 2xl:text-3xl">Want to send a new parcel?</p>
      <RouterLink :to="{name:'new-parcel'}">
        <div
            class="flex items-center justify-evenly w-max h-[50px] md:h-[75px] bg-third-color rounded-[15px] cursor-pointer mt-3 mb-5">
          <p class="text-main-color text-md font-bold pl-2 hover:text-black transition md:text-lg 2xl:text-xl">Send new!</p>
          <img class="w-[60px] h-[60px] md:w-[85px] md:h-[85px] bg-transparent mx-2" src="@/assets/img/delivery-truck.gif"
               alt="truck delivery">
        </div>
      </RouterLink>
    </div>
    <div class="flex flex-col items-center justify-evenly border-b border-blue-200 mx-auto mt-5 w-[360px] md:container">
      <p class="text-main-color font-bold text-xl md:text-2xl 2xl:text-3xl">We deliver faster than anybody!</p>
      <img class="w-[128px] h-[128px] xl:w-[256px] xl:h-[256px]" src="@/assets/img/delivery-truck-main.png" alt="delivery-track">
      <p class="text-main-color font-bold text-xl md:text-2xl 2xl:text-3xl">We deliver all around the globe!</p>
      <img class="w-[128px] h-[128px] xl:w-[256px] xl:h-[256px] mt-3" src="@/assets/img/pin.png" alt="globe">
      <p class="text-main-color font-bold text-xl mt-3 md:text-2xl 2xl:text-3xl">We deliver anything!</p>
      <img class="w-[128px] h-[128px] xl:w-[256px] xl:h-[256px] my-3" src="@/assets/img/package.png" alt="parcel">
    </div>
  </main>
</template>

<script setup lang="ts">
import ParcelCard from "@/components/ParcelCard.vue";
import {RouterLink} from "vue-router";
import type {Parcel} from "@/parcel";
import {ParcelType} from "@/parcel";
import type {Ref} from "vue";
import {ref} from "vue";


const myParcelsJson: any = localStorage.getItem('myParcels');
const myParcels: Ref<Parcel[]> = myParcelsJson ? ref(JSON.parse(myParcelsJson).slice(0, 4)) : ref([]);
</script>

