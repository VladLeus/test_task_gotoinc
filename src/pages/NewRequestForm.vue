<template>
  <Transition name="modal-parcel">
    <div class="min-h-screen flex flex-col items-center justify-evenly">
      <div class="flex flex-col items-center justify-between border-b border-blue-200 w-[360px]">
        <p class="text-main-color font-bold font-sans text-2xl mx-auto mt-5">New parcel</p>
        <p class="text-sm text-main-color mt-1.5 font-semibold text-center my-3">To create new parcel, write cities and select lower the one you need, select type and date, add description as optional.</p>
      </div>
      <div
          class="flex flex-col items-start justify-evenly w-[375px] h-[700px] border-white rounded-[15px] mt-5 mx-auto bg-main-color">
        <div class="flex items-center justify-evenly pt-2 pl-2">
          <i class="fi fi-sr-marker text-fifth-color text-lg px-1"></i>
          <label for="cityFrom" class="text-white text-md">From:</label>
          <div class="flex flex-col">
            <input autocomplete="off" @input="getLocationFrom" type="text" id="cityFrom" v-model="searchInputFrom"
                   class="font-semibold ml-3 rounded-[15px] pl-2 outline-0 py-1 w-[150px]">
            <select v-model="selectedCityFrom" id="cityTo" v-show="citiesFrom.length !== 0"
                    class="font-semibold ml-3 rounded-[15px] w-[125px] pl-2 outline-0 py-1 mt-3">
              <option v-for="city in citiesFrom"> {{ city.place_name }}</option>
            </select>
          </div>
        </div>
        <div class="flex items-center justify-evenly pl-2">
          <i class="fi fi-rr-route text-fifth-color text-lg px-1"></i>
          <label for="cityTo" class="text-white text-md">To:</label>
          <div class="flex flex-col">
            <input autocomplete="off" @input="getLocationTo" type="text" id="cityTo" v-model="searchInputTo"
                   class="font-semibold ml-3 rounded-[15px] pl-2 outline-0 py-1 w-[150px]">
            <select v-model="selectedCityTo" id="cityTo" v-show="citiesTo.length !== 0"
                    class="font-semibold ml-3 rounded-[15px] w-[125px] pl-2 outline-0 py-1 mt-3">
              <option v-for="city in citiesTo"> {{ city.place_name }}</option>
            </select>
          </div>
        </div>
        <div class="flex items-center justify-evenly pl-2">
          <i class="fi fi-rr-box-open text-fifth-color text-lg px-1"></i>
          <label for="parcelType" class="text-white text-md">Type:</label>
          <select id="parcelType" v-model="selectedParcelType"
                  class="font-semibold ml-3 rounded-[15px] pl-2 outline-0 py-1 w-[150px]">
            <option v-for="type in parcelTypes" :key="type">{{ type }}</option>
          </select>
        </div>
        <div class="flex items-center justify-evenly pl-2 pb-2">
          <i class="fi fi-rr-calendar text-fifth-color text-lg px-1"></i>
          <label for="dispatchDate" class="text-white text-md">Dispatch:</label>
          <input type="date" id="dispatchDate" v-model="dispatchDate" :min="minDate"
                 class="font-semibold ml-3 rounded-[15px] pl-2 outline-0 py-1">
        </div>
        <div class="flex items-center justify-evenly pl-2 pb-2">
          <i class="fi fi-rr-calendar text-fifth-color text-lg px-1"></i>
          <label for="description" class="text-white text-md">Description:</label>
          <textarea autocomplete="off" maxlength="70" wrap="hard" id="description" v-model="parcelDescription"
                    class="font-semibold ml-3 rounded-[15px] h-[85px] pl-2 outline-0 py-1 resize-none"></textarea>
        </div>
        <div class="flex items-center w-max justify-around mx-auto">
          <p @click="createNewParcel"
             class="w-[90px] h-[45px] bg-green-400 rounded-[15px] flex items-center justify-center mx-1 text-white font-bold">
            Save</p>
          <p @click="clearForm"
             class="w-[90px] h-[45px] bg-red-600 rounded-[15px] flex items-center justify-center mx-1 text-white font-bold">
            Clear</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type {Parcel, City} from "@/parcel";
import {ParcelType, mapBoxAPI} from "@/parcel";
import type {Ref} from "vue";
import {ref, computed} from "vue";

const myParcelsJson: any = localStorage.getItem('myParcels');
const myParcels: Ref<Parcel[]> = myParcelsJson ? ref(JSON.parse(myParcelsJson)) : ref([]);
const tempMyParcels: Parcel[] = myParcels.value;

const queryTimeout: Ref<number | undefined> = ref(undefined);
const searchError: Ref<boolean> = ref(false);
const searchInputFrom: Ref<string> = ref('');
const searchInputTo: Ref<string> = ref('');
const selectedCityFrom: Ref<string> = ref('');
const selectedCityTo: Ref<string> = ref('');
const citiesFrom: Ref<City[]> = ref([]);
const citiesTo: Ref<City[]> = ref([]);
const dispatchDate: Ref<Date | undefined> = ref();
const parcelTypes = Object.values(ParcelType);
const selectedParcelType: Ref<ParcelType | null> = ref(null);
const parcelDescription: Ref<string> = ref('')


const minDate = computed(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = (today.getDate() + 1).toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
});
const getLocationFrom = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchInputFrom.value !== '') {
      const fetchURL =
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchInputFrom.value}.json?access_token=${mapBoxAPI}&types=place`
      const request = await fetch(fetchURL)
          .then(res => res.json())
          .catch(() => { return searchError.value = true});
      citiesFrom.value = request.features;
      return;
    }
    citiesFrom.value = [];
  }, 300)
}
const getLocationTo = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchInputTo.value !== '') {
      const fetchURL =
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchInputTo.value}.json?access_token=${mapBoxAPI}&types=place`
      const request = await fetch(fetchURL)
          .then(res => res.json())
          .catch(() => { return searchError.value = true});
      citiesTo.value = request.features;
      return;
    }
    citiesTo.value = [];
  }, 300)
}

const createNewParcel = () => {
  if (selectedCityFrom.value !== ''
      && selectedCityTo.value !== ''
      && selectedParcelType.value !== null
      && dispatchDate.value !== undefined) {
    const dispatchDateToCorrectFormat: Date = new Date(dispatchDate.value);
    const [cityTo, stateTo] = selectedCityTo.value.split(",");
    const [cityFrom, stateFrom] = selectedCityFrom.value.split(",");

    const newParcel: Parcel = {
      cityTo: cityTo,
      cityFrom: cityFrom,
      parcelType: selectedParcelType.value,
      dispatchDate: dispatchDateToCorrectFormat.toLocaleDateString('uk-UA', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      }),
      parcelDescription: parcelDescription.value
    }

    tempMyParcels.unshift(newParcel);
    myParcels.value = [...tempMyParcels];
    localStorage.setItem('myParcels', JSON.stringify(myParcels.value))
    clearForm();
  }
}

const clearForm = () => {
  searchInputTo.value = '';
  searchInputFrom.value = '';
  citiesTo.value = [];
  citiesFrom.value = [];
  selectedParcelType.value = null;
  dispatchDate.value = undefined;
  parcelDescription.value = '';
}
</script>

