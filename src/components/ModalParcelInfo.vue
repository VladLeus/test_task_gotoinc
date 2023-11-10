<template>
  <div v-show="isModalActive" class="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
  <Transition name="modal-parcel">
    <div v-show="isModalActive"
         class="flex flex-col items-start justify-evenly w-[375px] h-[450px] md:w-[475px] md:h-[550px] xl:w-[575px]
         xl:h-[650px] border-white rounded-[15px] bg-main-color modal z-20">
      <div class="flex items-center justify-evenly pt-2 pl-2">
        <i class="fi fi-sr-marker text-fifth-color text-lg px-1 md:text-2xl xl:text-3xl"></i>
        <label for="cityFrom" class="text-white text-md md:text-xl 2xl:text-2xl">From:</label>
        <input type="text" id="cityFrom" :value="parcel.cityFrom"
        class="font-semibold ml-3 rounded-[15px] pl-2 outline-0 py-1 md:w-[250px] xl:w-[350px] md:text-xl 2xl:text-2xl" disabled >
      </div>
      <div class="flex items-center justify-evenly pl-2">
        <i class="fi fi-rr-route text-fifth-color text-lg px-1 md:text-2xl xl:text-3xl"></i>
        <label for="cityTo" class="text-white text-md md:text-xl 2xl:text-2xl">To:</label>
        <div class="flex flex-col">
          <input @input="getLocation" type="text" id="cityTo" v-model="searchInput"
                  class="font-semibold ml-3 rounded-[15px] pl-2 outline-0 py-1 md:w-[250px] xl:w-[350px] md:text-xl 2xl:text-2xl w-[150px] ">
          <select v-model="changedCityTo" id="cityTo" v-show="cities.length !== 0"
                  class="font-semibold ml-3 rounded-[15px] w-[125px] pl-2 outline-0 py-1 mt-3">
            <option v-for="city in cities"> {{ city.place_name }}</option>
          </select>
        </div>
      </div>
      <div class="flex items-center justify-evenly pl-2">
        <i class="fi fi-rr-box-open text-fifth-color text-lg px-1 md:text-2xl xl:text-3xl"></i>
        <label for="parcelType" class="text-white text-md md:text-xl 2xl:text-2xl">Type:</label>
        <input type="text" id="parcelType" :value="parcel.parcelType"
               class="font-semibold ml-3 rounded-[15px] pl-2 outline-0 py-1 md:w-[250px] xl:w-[350px] md:text-xl 2xl:text-2xl" disabled >
      </div>
      <div class="flex items-center justify-evenly pl-2 pb-2">
        <i class="fi fi-rr-calendar text-fifth-color text-lg px-1 md:text-2xl xl:text-3xl"></i>
        <label for="dispatchDate" class="text-white text-md md:text-xl 2xl:text-2xl">Dispatch:</label>
        <input type="date" id="dispatchDate" v-model="changedDispatchDate" :min="minDate"
               class="font-semibold ml-3 rounded-[15px] pl-2 outline-0 py-1 md:w-[250px] xl:w-[350px] md:text-xl 2xl:text-2xl">
      </div>
      <div class="flex items-center justify-evenly pl-2 pb-2">
        <i class="fi fi-rr-calendar text-fifth-color text-lg px-1 md:text-2xl xl:text-3xl"></i>
        <label for="description" class="text-white text-md md:text-xl 2xl:text-2xl">Description:</label>
        <textarea autocomplete="off" maxlength="70" wrap="hard" id="description" v-model="parcelDesription"
                  class="font-semibold ml-3 rounded-[15px] h-[85px] md:h-[105px]
                    xl:h-[125px] md:w-[175px] xl:w-[225px] md:text-xl 2xl:text-2xl
                    pl-2 outline-0 py-1 resize-none"></textarea>
      </div>
      <div class="flex items-center w-max justify-around mx-auto">
        <p @click="() => { saveNewProps(); $emit('modal-is-active') }" class="w-[90px] h-[45px] bg-green-400 rounded-[15px] flex items-center justify-center mx-1 text-white font-bold">
          Save</p>
        <p @click="$emit('modal-is-active')"
           class="w-[90px] h-[45px] bg-red-600 rounded-[15px] flex items-center justify-center mx-1 text-white font-bold">
          Cancel</p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type {Parcel, City} from "@/parcel";
import {mapBoxAPI} from "@/parcel";
import {computed, ref} from 'vue';
import type {Ref} from "vue";

const myParcelsJson: any = localStorage.getItem('myParcels');
const myParcels: Ref<Parcel[]> = myParcelsJson ? ref(JSON.parse(myParcelsJson)) : ref([]);

const queryTimeout: Ref<number | undefined> = ref(undefined);
const searchError: Ref<boolean> = ref(false);
const cities: Ref<City[]> = ref([]);

defineEmits(['modal-is-active']);
const props: any = defineProps({
  parcel: {
    type: Object as () => Parcel,
    required: true
  },
  isModalActive: {
    type: Boolean,
    default: false
  },
  parcelIdx: {
    type: Number,
    default: null
  }
})

const parcelDesription: Ref<string> = ref(props.parcel.parcelDescription);
const tempParcelDesription: Ref<string> = ref(parcelDesription.value);
const searchInput: Ref<String> = ref(props.parcel.cityTo);
const tempSearchInput: Ref<String> = ref(searchInput.value);
const changedCityTo: Ref<String> = ref('');
const changedDispatchDate: Ref<string> = ref(props.parcel.dispatchDate.toString().split('.').reverse().join('-'));
const tempChangedDispatchDate: Ref<string> = ref(changedDispatchDate.value)
const getLocation = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchInput.value !== '') {
      const fetchURL =
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchInput.value}.json?access_token=${mapBoxAPI}&types=place`
      const request = await fetch(fetchURL)
          .then(res => res.json())
          .catch(() => { return searchError.value = true});
      cities.value = request.features;
      return;
    }
    cities.value = [];
  }, 200)
}

const minDate = computed(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = (today.getDate() + 1).toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
});


const saveNewProps = () => {
  if ((searchInput.value !== ''
      && searchInput.value !== tempSearchInput.value)
      || changedDispatchDate.value !== tempChangedDispatchDate.value
      || parcelDesription.value !== tempParcelDesription.value) {
    const tempMyParcels = JSON.parse(myParcelsJson);
    tempChangedDispatchDate.value = changedDispatchDate.value;
    if (changedCityTo.value === '')
      changedCityTo.value = searchInput.value;
    const [city, state] = changedCityTo.value.split(",");
    tempSearchInput.value = city;
    props.parcel.cityTo = city;
    props.parcel.dispatchDate = new Date(changedDispatchDate.value).toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
    props.parcel.parcelDescription = parcelDesription.value;
    tempMyParcels[props.parcelIdx] = props.parcel;
    myParcels.value = tempMyParcels;
    localStorage.setItem('myParcels', JSON.stringify(myParcels.value));
    changedCityTo.value = '';
    tempParcelDesription.value = '';
  }
}

</script>

<style>
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal-parcel-enter-active, .modal-parcel-leave-active {
  transition: opacity 0.3s ease-in;
}

.modal-parcel-enter-from, .modal-parcel-leave-to {
  opacity: 0;
}
</style>
