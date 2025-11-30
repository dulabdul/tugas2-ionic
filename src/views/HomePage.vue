<template>
  <ion-page>
    <ion-header :translucent="true" class="ion-no-border">
      <ion-toolbar class="bg-white dark:bg-gray-900">
        <ion-title class="text-center font-bold text-gray-800 dark:text-white">Cuaca Jakarta</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="bg-gray-50 dark:bg-gray-900">
      <div class="max-w-md mx-auto min-h-screen bg-gray-50 dark:bg-gray-900">
        
        <div v-if="isLoading" class="flex flex-col justify-center items-center h-screen gap-3">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p class="text-gray-400 text-sm font-medium">Memuat data satelit...</p>
        </div>

        <div v-else-if="error" class="p-4 text-center text-red-500 mt-10">
          <p>{{ error }}</p>
        </div>

        <WeatherList 
          v-else 
          :hourlyTimes="weatherData?.hourly.time || []" 
          :hourlyTemps="weatherData?.hourly.temperature_2m || []"
          :dailyTimes="weatherData?.daily.time || []"
          :dailyMax="weatherData?.daily.temperature_2m_max || []"
          :dailyMin="weatherData?.daily.temperature_2m_min || []"
        />
        
        <footer class="p-6 text-center text-[10px] text-gray-400 pb-10">
          Data provided by Open-Meteo API
        </footer>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { fetchWeather, type WeatherData } from '@/services/weatherService';
import WeatherList from '@/components/WeatherList.vue';

const weatherData = ref<WeatherData | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

onMounted(async () => {
  isLoading.value = true;
  try {
    weatherData.value = await fetchWeather();
  } catch (err) {
    error.value = 'Gagal memuat data cuaca.';
  } finally {
    isLoading.value = false;
  }
});
</script>