import {AsyncStorage } from 'react-native';
import baseRideCriteria from '../js/baseRideCriteria.js';
import {FORECAST_ACCESS_KEY, FORECAST_API_URL, FORECAST_APP_ID } from 'react-native-dotenv';// Weather service API keys
import {Toast} from 'native-base';

    // API call to get the current weather forecast and the user's device current location
    
	export const loadWeatherData = async (setWeatherData) => {
		navigator.geolocation.getCurrentPosition(position => {
			const lat = JSON.stringify(position.coords.latitude);
			const long = JSON.stringify(position.coords.longitude);

			getWeather(lat, long, setWeatherData);// API call to get the current weather forecast and update component state
		},
		error => console.log(error.message),
		{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		
		)
	}

	// API call to get the current weather forecast or use a saved 7 day forecast if there is no internet access
	getWeather = async (lat, long, setWeatherData) => {
		const response = await fetch(`${FORECAST_API_URL}${lat},${long}?app_id=${FORECAST_APP_ID}&app_key=${FORECAST_ACCESS_KEY}`);
		if (response.ok === false) {// Check if there is no response or network connection failed				
			getSavedPredictions(setWeatherData);// Check if there is a saved 7 day forecast. If so, load to component state. If not, show user a message
		}

		const data = await response.json();// Extracts the JSON from the response.body and converts JSON string into a JavaScript object
		setWeatherData(sanitizeData(data))// Convert api data into a sanitize object with only needed information
	}

	// If there is no internet access, then get from local storage the last saved 7 Day forecast. If that is empty, display a message to the user
	getSavedPredictions = async (setWeatherData) => {
		const savedForecast = await AsyncStorage.getItem('predictions');// Get saved 7 day forecast from local storage
		const convertedForcast = JSON.parse(savedForecast);
		if(convertedForcast !== null ){// Check if the data saved to local storage is not empty 
			setWeatherData(convertedForcast);
		}else{					
			// Display error message to user
			Toast.show({text:"No network connection and no saved 7 day forecast", position:"bottom", type:"warning", duration:5000});
		}
	}

	// Convert data from an API object into a sanitize object to be comsume by the Forecast screen
	sanitizeData = (apiData) => {
		let convertedArray = [];
		const workingArray = [];
		workingArray.push(apiData);		
		
		// Convert key data from each weather object and push into an array
		workingArray[0].Days.map((weather, index) => {
			let convertedData = {};
			convertedData.temperature = weather.temp_max_f;
			convertedData.windSpeed = weather.windspd_max_mph;
			convertedData.rain = weather.rain_total_in;
			convertedData.date = rebuildDate(weather.date);

			convertedArray.push(convertedData);
		})

		return convertedArray;
	}
 
	// Use date in old format (day/month/year) and return in updated format (month/day/year)
	rebuildDate = (oldDate) => {
		convertIntoArray = oldDate.split("/");
		return `${convertIntoArray[1]}/${convertIntoArray[0]}/${convertIntoArray[2]}`;		
	}

	// When the app loads, check if there is a riding criteria in local storage, if not then update local storage and state with base criteria
	export const loadCriteria = async (isComponentMounted, setRideCriteria, setBestDayCriteria) => {		 
		if(isComponentMounted){// Bug Fix: UseEffect is called when the screen changes and throw an error. This fix by checking if the component is mounted. 
			this.loadRideCriteria(setRideCriteria);
			this.loadBestDayCriteria(setBestDayCriteria);			
		}			
	}

	// When the app loads, check if there is a riding criteria in local storage
	loadRideCriteria = async (setRideCriteria) => {
		const savedCriteria = await AsyncStorage.getItem('rideCriteria');// Get saved ride criteria from local storage
		if(savedCriteria !== null){// Check if the data saved to local storage is not empty                
			setRideCriteria(JSON.parse(savedCriteria));
		}else{
			// If there is no saved data, then save base criteria to local storage           
			await AsyncStorage.setItem("rideCriteria",JSON.stringify(baseRideCriteria));// Save base criteria to local storage
			setRideCriteria(baseRideCriteria);// Save base riding criteria to local state
		}		
	}

	// When the app loads, check if there is a best day to ride criteria in local storage
	loadBestDayCriteria = async (setBestDayCriteria) => {
		const savedBestDayCriteria = await AsyncStorage.getItem('bestDayCriteria');// Get saved best ride criteria from local storage
		if(savedBestDayCriteria !== null){// Check if the data saved to local storage is not empty                
			setBestDayCriteria(JSON.parse(savedBestDayCriteria));
		}		 
	}

	// Return true or false based on ride criteria
	export const applyRidingCriteria = (forecast, rideCriteria) => {
		// If current weather temperature is less then minimal temp criteria or more then maximum temp criteria then return false
		if (forecast.temperature < rideCriteria.minimalTemperature || forecast.temperature > rideCriteria.maximumTemperature) {
			return false;
		}
		if(forecast.windSpeed > rideCriteria.windSpeedLimit){return false}// If current weather windspeed is greater then criteria, return false
		if(forecast.rain > 0 && rideCriteria.ifRained === false){return false}// If it has rained and the criteria is false (no ride), return false
		return true;
	}

	// Return true or false based on best riding criteria temperature and wind speed by a negative or positive 1
	export const applyBestDayCriteria = (forecast, bestDayCriteria) => {
		if(bestDayCriteria === false){// Return false if there is no best day criteria saved
			return false;
		}
		// Determine a best day if the forecast temperature is 1 degress more or less then the idea best day criteria temperature
		if(forecast.temperature >= (bestDayCriteria.temperature - 1) && forecast.temperature <= (bestDayCriteria.temperature + 1)){
			return false
		}

		// Determine a best day if the forecast wind speed is 1 degress more or less then the idea best day criteria wind speed
		if(forecast.windSpeed >= (bestDayCriteria.windSpeed -1) && forecast.windSpeed <= (bestDayCriteria.windSpeed + 1)){
			return false
		}		
		return true;
	}

