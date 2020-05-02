import React, { useState, useEffect } from 'react'
import {StyleSheet, View, AsyncStorage} from 'react-native';
import {Container, H1, Toast} from 'native-base';
import {FORECAST_ACCESS_KEY, FORECAST_API_URL, FORECAST_APP_ID } from 'react-native-dotenv';//Weather service API keys
import * as Location from 'expo-location';

import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import FutureForecast from '../components/FutureForecast.js';//Component with Icon detailing if its a good or bad day to ride
import Button from '../components/Button.js';//Navigation button to the Home Screen
import CriteriaIcon from '../components/EditCriteria.js';/*Cog icon to navigate user to EditCriteria screen */
import SavePredictions from '../components/SavePredictions.js';/*Disk icon to save 7 day forecast to local storage */

const baseRideCriteria = {
	"minimalTemperature":60,
	"maximumTemperature":85,
	"ifRained":false,
	"windSpeedLimit":20,
}

const defaultBestDayCriteria = {

}

/*7 Day Forecast screen that makes an api call to get 7 days of weather data.
That data is then use to display if each day is a good or bad day to ride a bicycle. 
*/
const Forecast = ({navigation}) => {
	const [weatherData, setWeatherData] = useState([]);//state to hold weather data
	const [rideSetting, setRideSetting] = useState({});//state to hold riding criteria
	const [bestDayCriteria, setBestDayCriteria] = useState(false);

	useEffect(() => { this.getForecast(); }, []);//load API data to component state before page is loading
	
	useEffect(() => { //load riding criteria to component state
		let mounted = true;		
		this.setCriteria(mounted); 		
		
		return () => mounted = false;
	}, []);//load data before page is loading

	//API call to get the current weather forecast and the user's device current location
	getForecast = async () => {
		navigator.geolocation.getCurrentPosition(position => {
			const lat = JSON.stringify(position.coords.latitude);
			const long = JSON.stringify(position.coords.longitude);
			
			return fetch(`${FORECAST_API_URL}${lat},${long}?app_id=${FORECAST_APP_ID}&app_key=${FORECAST_ACCESS_KEY}`)
			.then((response) => {//extracts the JSON from the response.body and converts JSON string into a JavaScript object
				if (response.ok === false) {//there is no response or network connection failed				
					this.getSavedPredictions();//Check if there is a saved 7 day forecast. If so, load to component state. If not, show user a message
				}
				return response.json()
			})		
			.then((data) =>{
				const sortedData = this.sanitizeData(data);//convert api data into a sanitize object with only needed information
				setWeatherData(sortedData);//updates weatherData with today's temperature					
			})
			
			.catch((error) => console.log(error));
		},
		error => console.log(error.message),
		{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		
		)
	}

	getSavedPredictions = async () => {
		const savedForecast = await AsyncStorage.getItem('predictions');//get saved 7 day forecast from local storage
		const convertedForcast = JSON.parse(savedForecast);
		if(convertedForcast !== null ){//check if the data saved to local storage is not empty 
			setWeatherData(convertedForcast);
		}else{					
			//display error message to user
			Toast.show({text:"No network connection and no saved 7 day forecast", position:"top", type:"warning", duration:5000});
		}
	}

	//Method to convert data from an API object into a sanitize object to be comsume by the Forecast screen
	sanitizeData = (apiData) => {
		const workingArray = [];//temp array to hold data object from weather service api call
		workingArray.push(apiData);//push the api data object into the temp array
		let convertedArray = [];//temp array to hold converted api data as a weather object
		
		//Convert key data from each weather object and push into an array
		workingArray[0].Days.map((weather, index) => {
			let convertedData = {};//temp object to hold select data from API object
			convertedData.temperature = weather.temp_max_f;
			convertedData.windSpeed = weather.windspd_max_mph;
			convertedData.rain = weather.rain_total_in;
			convertedData.date = this.rebuildDate(weather.date);

			convertedArray.push(convertedData);
		})

		return convertedArray;
	}
 
	//Use date in old format (day/month/year) and return in updated format (month/day/year)
	rebuildDate = (oldDate) => {
		convertIntoArray = oldDate.split("/");
		return `${convertIntoArray[1]}/${convertIntoArray[0]}/${convertIntoArray[2]}`;		
	}

	//When the app loads, check if there is a riding criteria in local storage, if not then update local storage and state with base criteria
	setCriteria = async (isComponentMounted) => {
		try{
			const savedCriteria = await AsyncStorage.getItem('rideCriteria');//get saved ride criteria from local storage
			const savedBestDayCriteria = await AsyncStorage.getItem('bestDayCriteria');//get saved best ride criteria from local storage  
			if(isComponentMounted){//Bug Fix: UseEffect is called when the screen changes and throw an error. This fix by checking if the component is mounted. 
				if(savedCriteria !== null){//check if the data saved to local storage is not empty                
					setRideSetting(JSON.parse(savedCriteria));
				}else{
					//If there is no saved data, then save base criteria to local storage           
					await AsyncStorage.setItem("rideCriteria",JSON.stringify(baseRideCriteria));//Save base criteria to local storage
					setRideSetting(baseRideCriteria);//save base criteria to local state
				}

				if(savedBestDayCriteria !== null){//check if the data saved to local storage is not empty                
					setBestDayCriteria(JSON.parse(savedBestDayCriteria));
				}else {
					console.log("Best day Criteria not saved");
				}				
			}	
		}catch (e){
			console.log(e);
		}
		
	}

	//Return true or false based on ride criteria
	applyRidingCriteria = (forecast) => {
		//If current weather temperature is less then minimal temp criteria or more then maximum temp criteria then return false
		if (forecast.temperature < rideSetting.minimalTemperature || forecast.temperature > rideSetting.maximumTemperature) {
			return false;
		}
		if(forecast.windSpeed > rideSetting.windSpeedLimit){return false}//If current weather windspeed is greater then criteria, return false
		if(forecast.rain > 0 && rideSetting.ifRained === false){return false}//If it has rained and the criteria is false (no ride), return false
		return true;
	}

	//Return true or false based on best riding criteria temperature and wind speed by a negative or positive 1
	applyBestDayCriteria = (forecast) => {
		if(bestDayCriteria === false){//Return false if there is no best day criteria saved
			return false;
		}
		//Determine a best day if the forecast temperature is 1 degress more or less then the idea best day criteria temperature
		if(forecast.temperature >= (bestDayCriteria.temperature - 1) && forecast.temperature <= (bestDayCriteria.temperature + 1)){
			return false
		}

		//Determine a best day if the forecast wind speed is 1 degress more or less then the idea best day criteria wind speed
		if(forecast.windSpeed >= (bestDayCriteria.windSpeed -1) && forecast.windSpeed <= (bestDayCriteria.windSpeed + 1)){
			return false
		}		
		return true;
	}

	return(
		<Container>
			<Header title="7 Day Forecast" />
			{/*Display warning to user while data is loading */}
			{weatherData.length === 0 &&
				<View><H1 style={styles.loadingText}>Data is loading</H1></View>
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
	loadingText: {
		textAlign:"center",
		color:"red",
	}
});

export default Forecast;