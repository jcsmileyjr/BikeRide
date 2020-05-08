import React, { useState, useEffect } from 'react'
import {StyleSheet, View, AsyncStorage} from 'react-native';
import {Container, H1, Toast, Spinner} from 'native-base';// UI library for styling and complex components missing from the React Native
import {FORECAST_ACCESS_KEY, FORECAST_API_URL, FORECAST_APP_ID } from 'react-native-dotenv';// Weather service API keys
import { NavigationEvents } from "react-navigation";// Use to reload state when navigating from another screen
import {loadRideCriteria} from '../js/loadRideCriteria.js';

import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import FutureForecast from '../components/FutureForecast.js';// Component with Icon detailing if its a good or bad day to ride
import Button from '../components/Button.js';
import CriteriaIcon from '../components/EditCriteria.js';
import SavePredictions from '../components/SavePredictions.js';

// Screen that makes an api call to get 7 days of weather data to display if each day is a good or bad day to ride a bicycle. 
const Forecast = ({navigation}) => {
	const [weatherData, setWeatherData] = useState([]);// State to hold weather data received from an weather API call
	const [rideCriteria, setRideCriteria] = useState({});// State to hold riding criteria loaded from local storage
	const [bestDayCriteria, setBestDayCriteria] = useState(false);// State to hold the best day criteria loaded from local storage

	useEffect(() => { this.loadWeatherData(); }, []);// Load API weather data to component state before page is loading
	
	useEffect(() => { // Load riding criteria to component state
		let mounted = true;// Unmounted components "Bug Fix". During clean up (components are unmounted), this stops async calls from being made		
		loadCriteria(mounted);// Get the current riding criteria from local storage or use the base criteria. 		
		
		return () => mounted = false;
	}, []);

	// API call to get the current weather forecast and the user's device current location
	loadWeatherData = async () => {
		navigator.geolocation.getCurrentPosition(position => {
			const lat = JSON.stringify(position.coords.latitude);
			const long = JSON.stringify(position.coords.longitude);

			this.getSevenDayForecast(lat, long);// API call to get the current weather forecast and update component state
		},
		error => console.log(error.message),
		{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		
		)
	}

	// API call to get the current weather forecast or use a saved 7 day forecast if there is no internet access
	getSevenDayForecast = async (lat, long) => {
		const response = await fetch(`${FORECAST_API_URL}${lat},${long}?app_id=${FORECAST_APP_ID}&app_key=${FORECAST_ACCESS_KEY}`);
		if (response.ok === false) {// Check if there is no response or network connection failed				
			this.getSavedPredictions();// Check if there is a saved 7 day forecast. If so, load to component state. If not, show user a message
		}

		const data = await response.json();// Extracts the JSON from the response.body and converts JSON string into a JavaScript object
		setWeatherData(this.sanitizeCurrentWeatherData(data))// Convert api data into a sanitize object with only needed information
	}

	// If there is no internet access, then get from local storage the last saved 7 Day forecast. If that is empty, display a message to the user
	getSavedPredictions = async () => {
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
	sanitizeCurrentWeatherData = (apiData) => {
		let convertedArray = [];
		const workingArray = [];
		workingArray.push(apiData);		
		
		// Convert key data from each weather object and push into an array
		workingArray[0].Days.map((weather, index) => {
			let convertedData = {};
			convertedData.temperature = weather.temp_max_f;
			convertedData.windSpeed = weather.windspd_max_mph;
			convertedData.rain = weather.rain_total_in;
			convertedData.date = this.rebuildDate(weather.date);

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
	loadCriteria = async (isComponentMounted) => {		 
		if(isComponentMounted){// Bug Fix: UseEffect is called when the screen changes and throw an error. This fix by checking if the component is mounted. 
			loadRideCriteria(setRideCriteria);
			this.loadBestDayCriteria();			
		}			
	}

	// When the app loads, check if there is a best day to ride criteria in local storage
	loadBestDayCriteria = async () => {
		const savedBestDayCriteria = await AsyncStorage.getItem('bestDayCriteria');// Get saved best ride criteria from local storage
		if(savedBestDayCriteria !== null){// Check if the data saved to local storage is not empty                
			setBestDayCriteria(JSON.parse(savedBestDayCriteria));
		}else {
			console.log("Best day Criteria not saved");
		}		 
	}

	// Return true or false based on ride criteria
	applyRidingCriteria = (forecast) => {
		// If current weather temperature is less then minimal temp criteria or more then maximum temp criteria then return false
		if (forecast.temperature < rideCriteria.minimalTemperature || forecast.temperature > rideCriteria.maximumTemperature) {
			return false;
		}
		if(forecast.windSpeed > rideCriteria.windSpeedLimit){return false}// If current weather windspeed is greater then criteria, return false
		if(forecast.rain > 0 && rideCriteria.ifRained === false){return false}// If it has rained and the criteria is false (no ride), return false
		return true;
	}

	// Return true or false based on best riding criteria temperature and wind speed by a negative or positive 2
	applyBestDayCriteria = (forecast) => {
		if(bestDayCriteria === false){// Return false if there is no best day criteria saved
			return false;
		}
		// Determine a best day if the forecast temperature is 1 degress more or less then the idea best day criteria temperature
		if(forecast.temperature > (bestDayCriteria.temperature + 2) || forecast.temperature < (bestDayCriteria.temperature - 2)){
			return false
		}

		// Determine a best day if the forecast wind speed is 1 degress more or less then the idea best day criteria wind speed
		if(forecast.windSpeed >= (bestDayCriteria.windSpeed + 2) || forecast.windSpeed <= (bestDayCriteria.windSpeed - 2)){
			return false
		}		
		return true;
	}

	return(
		<Container>
			<Header title="7 Day Forecast" />

			{/*Check if the riding criteria have change */}
			<NavigationEvents onDidFocus={() => this.loadCriteria(setRideCriteria)} />
			
			{/*Display warning to user while data is loading */}
			{weatherData.length === 0 &&
				<View>
					<H1 style={styles.loadingText}>Data is loading</H1>
					<Spinner color='blue' />
				</View>
				
			}

			{/*Loops through an array of converted api data to display a future Forcast for next 7 days based on two criteria */}
			{weatherData.map((forecast, index) => {
				if(applyRidingCriteria(forecast)){
					if(applyBestDayCriteria(forecast)){
						return <FutureForecast key={index} date={forecast.date} outcome="Best" />
					}else{
						return <FutureForecast key={index} date={forecast.date} outcome="Good" />
					}					
				}
				
				if(!applyRidingCriteria(forecast)){
					return <FutureForecast key={index} date={forecast.date} outcome="Bad" />
				}
			 })
			}

			<Button nav="Home" navigation={navigation} text="Today Forecast" />
			<Footer>
				<SavePredictions forecast={weatherData} />
				<CriteriaIcon navigation={navigation} />
			</Footer>
		</Container>
	);
}

const styles = StyleSheet.create({
	loadingText: {// Style for text displayed when the screen is loading and no data has been received from API call
		textAlign:"center",
		color:"red",
	}
});

export default Forecast;