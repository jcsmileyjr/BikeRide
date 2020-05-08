import { ACCESS_KEY, API_URL } from 'react-native-dotenv';
import {Toast} from 'native-base';

	/**
	 * API call to get the current user location, weather forecast, and update weatherData with the temperature
	 * @param {*} callback //This is the setWeatherdata function 
	 */
    export const loadCurrentWeather = (callback) => {
		navigator.geolocation.getCurrentPosition(position => {// Use the native window api to get current position (first ask permission)
			const lat = JSON.stringify(position.coords.latitude);
			const long = JSON.stringify(position.coords.longitude);		
			getCurrentWeather(lat, long, callback);// API call to get the current weather data
			},
			error => console.log(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
			
			)				
	}
	
	// API call to get the current weather forecast or display a warning message if there is no internet access
	getCurrentWeather = async (lat, long, callback) => {
		const response = await fetch(`${API_URL}current?access_key=${ACCESS_KEY}&query=${lat},${long}&units=f`)			
		if (response.ok === false) {// Check if there is no response or network connection failed				
			// Display error message to user
			Toast.show({text:"No network connection", position:"bottom", type:"warning", duration:5000});
		}

		const data = await response.json();// Extracts the JSON from the response.body and converts JSON string into a JavaScript object
		callback(sanitizeCurrentWeatherData(data));// Updates weatherData with today's weather data		
	}

	/**
	 * Method called in the getCurrentWeather() to convert raw data from an API call into a sanitize object to be comsume on the Home screen.  
	 * Certain data is extracted and placed into an object. That object is use to update the weatherData component state 
	 * @param {*} apiRawData 
	 */
	export const sanitizeCurrentWeatherData = (apiRawData) => {
		let convertedData = {};// Temp object to hold select data from API object

		convertedData.temperature = apiRawData.current.temperature;
		convertedData.windSpeed = apiRawData.current.wind_speed;
		convertedData.rain = apiRawData.current.precip;
		convertedData.date = apiRawData.location.localtime;

		return convertedData;
    }

	//Method used on to convert Fahrenheit to Celsius
	export const convertToCelsius = (temperature) => {
		return Math.ceil((temperature - 32) / 1.8);
	}