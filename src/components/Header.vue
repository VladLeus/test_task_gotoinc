<template>
  <header class="sticky h-[85px] w-full bg-third-color rounded-b-[15px] flex items-center justify-between">
    <RouterLink :to="{name:'home'}">
      <div class="flex items-center justify-between">
        <img class="h-[65px] w-[65px]" src="@/assets/img/logo.png" alt="logo">
        <p class="text-main-color text-lg font-bold">LinkUp Express</p>
      </div>
    </RouterLink>
    <i class="fi fi-br-menu-burger text-main-color text-2xl mr-3.5 duration-150 cursor-pointer md:hidden" @click="toggleMenu"></i>
    <MobileMenu class="md:hidden" :mobile-nav-is-active="showMenu" @close-navigation="toggleMenu"/>
  </header>
</template>

<script setup lang="ts">
import {RouterLink} from "vue-router";
import {ref} from "vue";
import MobileMenu from "@/components/MobileMenu.vue";

const showMenu: any = ref(null);
const toggleMenu = () => showMenu.value = !showMenu.value;
</script>
