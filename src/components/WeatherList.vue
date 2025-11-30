<template>
  <div class="flex flex-col h-full">
    
    <div v-if="currentWeather" class="p-6 pb-2">
      <div class="relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/20">
        <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        
        <div class="relative z-10 flex justify-between items-end">
          <div>
            <h2 class="text-6xl font-black tracking-tighter">{{ currentWeather.temp }}°</h2>
            <p class="mt-1 text-blue-100 font-medium flex items-center gap-2">
              <ion-icon :icon="calendarOutline"></ion-icon>
              {{ formatDate(currentWeather.time) }}
            </p>
          </div>
          <div class="text-right pb-1">
             <ion-icon :icon="cloudyNightOutline" class="text-5xl text-blue-100 mb-2"></ion-icon>
             <p class="text-xs font-bold uppercase tracking-widest text-blue-200">Jakarta</p>
          </div>
        </div>
      </div>
    </div>

    <div class="pl-6 mt-6 mb-2">
      <h3 class="text-gray-400 font-bold text-xs uppercase tracking-widest mb-4">24 Jam Kedepan</h3>
      <div class="flex overflow-x-auto space-x-3 pb-4 pr-6 snap-x snap-mandatory hide-scrollbar">
        <div v-for="(item, index) in hourlyFormatted" :key="index" class="snap-start shrink-0">
          <div class="flex flex-col items-center justify-between p-3 h-28 w-[4.5rem] rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
            <span class="text-xs font-semibold text-gray-400">{{ formatHours(item.time) }}</span>
            <ion-icon :icon="item.temp > 29 ? sunnyOutline : partlySunnyOutline" class="text-xl" :class="item.temp > 29 ? 'text-amber-400' : 'text-blue-400'"></ion-icon>
            <span class="text-base font-bold text-gray-700 dark:text-gray-200">{{ item.temp }}°</span>
          </div>
        </div>
      </div>
    </div>

    <div class="px-6 mt-2">
      <h3 class="text-gray-400 font-bold text-xs uppercase tracking-widest mb-4">7 Hari Kedepan</h3>
      
      <div class="space-y-3 bg-white dark:bg-gray-800 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div 
          v-for="(day, index) in dailyFormatted" 
          :key="index"
          class="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-700 last:border-0"
        >
          <div class="w-24 font-medium text-gray-600 dark:text-gray-300">
            {{ index === 0 ? 'Hari Ini' : getDayName(day.time) }}
          </div>

          <div class="flex-1 flex justify-center">
             <ion-icon :icon="day.max > 30 ? sunnyOutline : cloudyOutline" class="text-xl text-gray-400"></ion-icon>
          </div>

          <div class="flex items-center gap-3 w-24 justify-end">
            <span class="text-gray-400 font-medium text-sm">{{ Math.round(day.min) }}°</span>
            
            <div class="w-16 h-1 bg-gray-100 rounded-full overflow-hidden relative">
              <div class="absolute h-full bg-gradient-to-r from-blue-400 to-orange-400 opacity-70 w-full"></div>
            </div>

            <span class="text-gray-800 dark:text-white font-bold text-sm">{{ Math.round(day.max) }}°</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IonIcon } from '@ionic/vue';
import { calendarOutline, cloudyNightOutline, sunnyOutline, partlySunnyOutline, cloudyOutline } from 'ionicons/icons';

// Props Baru (Hourly + Daily)
const props = defineProps<{
  hourlyTimes: string[];
  hourlyTemps: number[];
  dailyTimes: string[];
  dailyMax: number[];
  dailyMin: number[];
}>();

// --- HELPERS ---
const formatHours = (isoString: string) => {
  return new Date(isoString).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace('.', ':');
};

const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
};

const getDayName = (isoString: string) => {
  return new Date(isoString).toLocaleDateString('id-ID', { weekday: 'long' });
};

// --- COMPUTED ---
const currentWeather = computed(() => {
  if (!props.hourlyTimes.length) return null;
  return { time: props.hourlyTimes[0], temp: props.hourlyTemps[0] };
});

const hourlyFormatted = computed(() => {
  return props.hourlyTimes.slice(1, 25).map((time, i) => ({
    time,
    temp: props.hourlyTemps[i + 1]
  }));
});

// Computed baru untuk Daily Data
const dailyFormatted = computed(() => {
  return props.dailyTimes.map((time, i) => ({
    time,
    max: props.dailyMax[i],
    min: props.dailyMin[i]
  }));
});
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>