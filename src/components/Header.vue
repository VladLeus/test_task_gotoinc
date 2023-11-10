<template>
  <header class="sticky h-[85px] w-full bg-third-color rounded-b-[15px] flex items-center justify-between max-w-screen-2xl md:mx-auto">
    <RouterLink :to="{name:'home'}">
      <div class="flex items-center justify-between md:pl-3 xl:pl-6">
        <img class="h-[65px] w-[65px] md:w-[105px] md:h-[105px]" src="@/assets/img/logo.png" alt="logo">
        <p class="text-main-color text-lg font-bold md:text-2xl xl:text-3xl">LinkUp Express</p>
      </div>
    </RouterLink>
    <i class="fi fi-br-menu-burger text-main-color text-2xl mr-3.5 duration-150 cursor-pointer md:hidden" @click="toggleMenu"></i>
    <MobileMenu class="md:hidden" :mobile-nav-is-active="showMenu" @close-navigation="toggleMenu"/>
    <div class="hidden md:flex  items-center justify-evenly w-[450px]">
      <RouterLink :to="{name:'requests'}">
        <p class="w-max cursor-pointer flex flex-col hover-underline-animation text-xl text-main-color font-bold xl:text-2xl">My requests</p>
      </RouterLink>
      <RouterLink :to="{name:'new-parcel'}">
        <p class="w-max cursor-pointer flex flex-col hover-underline-animation text-xl text-main-color font-bold xl:text-2xl">New parcel</p>
      </RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import {RouterLink} from "vue-router";
import {ref} from "vue";
import MobileMenu from "@/components/MobileMenu.vue";

const showMenu: any = ref(null);
const toggleMenu = () => showMenu.value = !showMenu.value;
</script>

<style>
.hover-underline-animation {
  position: relative;
}

.hover-underline-animation::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #E6CCB2;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
