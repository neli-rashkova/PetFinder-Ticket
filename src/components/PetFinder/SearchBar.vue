<template>
  <div class="w-full h-[14rem] bg-orange-500 relative md:h-[7rem]">
    <div
      class="absolute w-[90%] h-[90%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded md:w-3/4 md:h-[35%] md:top-24 md:p-1 md:bg-white lg:w-[55%]"
    >
      <div class="w-full h-full flex flex-wrap items-center md:flex-row">
        <input
          class="w-full h-1/4 px-3 rounded placeholder:uppercase md:w-[55%] md:h-full"
          placeholder="Enter your location zip code"
          v-model="location"
          aria-required="true"
        />

        <select
          aria-required="true"
          v-model="selected"
          class="w-full h-1/4 px-3 rounded bg-gray-200 md:w-[30%] md:h-full md:rounded-none"
        >
          <option disabled value="">Select Pet</option>
          <option>Cat</option>
          <option>Dog</option>
          <option>Rabbit</option>
          <option>Bird</option>
        </select>

        <div class="w-full h-1/4 flex justify-evenly py-1 md:hidden">
          <SmallButton label="Clear" @handleEvent="clear" />
          <SmallButton label="Search" @handleEvent="getPets" />
        </div>

        <RegularButton label="Search" @handleEvent="getPets" />
      </div>
      <div v-for="(pet, index) in store.pets" :key="index">
        <img :src="pet.photo?.medium" :alt="pet.name" />
        <span>Name: {{ pet.name }}</span>
        <span>Age: {{ pet.age }}</span>
        <span>Breed: {{ pet.breed }}</span>
        <span>Gender: {{ pet.gender }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { usePetDataStore } from "../../stores/PetDataStore";
import SmallButton from "../Buttons/SmallButton.vue";
import RegularButton from "../Buttons/RegularButton.vue";

const location = ref<number | undefined>(undefined);
const selected = ref("");
const store = usePetDataStore();
const token = ref(
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJNb2VXdGIyQVhNa20wVXBCOUNacXNTTjRPWVZjOU9kdWxuREI5aDZBRjRqWnNlczhHZCIsImp0aSI6ImQ3OWE4ZTU2MDExNmFkOGUyYjEwMjc2Y2FhNWM5YWM5YTMwZjJmM2U2ZGVmMjVmMjZiYWY4YjhlMzI2YjhhZWUzNTU3ZmFiYzA1MzJhZGI5IiwiaWF0IjoxNjkzOTE5MjQ5LCJuYmYiOjE2OTM5MTkyNDksImV4cCI6MTY5MzkyMjg0OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.DzaWVjG19a__J9vyVO2HKOyk_J2RPeVIy4BiYe_kXhMW6CKeRG-XgESuQn6r4WGNJjN5eKjuNavlHsVIeza9or3jH7JvCVFmUb0Q3CNeuUAkk5gi9ykAGmEorOL9EQ-Q9c2IdRonfqilciTR4A7ZsniIegZFsUBMyFH9VJ5yFTzi-R7VxENAZNXiuugXpCSnuINYASFihVNqSkhHg-ZyWtRF-JxmEHeKNj3BRiV55jXe5IafLL3IpnxB-65wQl-ycqieEaXJxBbi9vHj6G16SV041zvoHyV4f8GGFGEIRWmw7U39dgRvTxUOLllUg51gyzDuqQDy6wgASwgscYEXNw"
);
const BearerToken = `Bearer ${token.value}`;

const options = {
  method: "GET",
  headers: {
    Authorization: BearerToken,
  },
};

async function getPets() {
  try {
    const res = await fetch(
      "https://api.petfinder.com/v2/animals?type=dog&page=2",
      options
    );
    const pets = await res.json();
    let temp = pets.animals;
    for (let i = 0; i < temp.length; i++) {
      store.pets.push({
        age: temp[i].age,
        gender: temp[i].gender,
        name: temp[i].name,
        breed: temp[i].breeds.primary,
        distance: temp[i].distance,
        photo: temp[i].photos[0],
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function clear() {
  location.value = undefined;
}
</script>
