// src/services/weatherService.ts

export interface WeatherData {
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

export const fetchWeather = async (): Promise<WeatherData> => {
  // Update URL: Tambahkan parameter 'daily' dan 'timezone'
  const URL = 'https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FJakarta';
  
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error('Gagal mengambil data');
    
    const data = await response.json();
    
    // Kembalikan objek yang berisi data hourly DAN daily
    return {
      hourly: data.hourly,
      daily: data.daily
    }; 
  } catch (error) {
    console.error(error);
    throw error;
  }
};