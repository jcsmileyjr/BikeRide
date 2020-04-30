import React, { useState, useEffect } from 'react'
import {StyleSheet, View} from 'react-native';
import {Container, H1} from 'native-base';
import {FORECAST_ACCESS_KEY, FORECAST_API_URL, FORECAST_APP_ID } from 'react-native-dotenv';//Weather service API keys

import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import FutureForecast from '../components/FutureForecast.js';
import Button from '../components/Button.js';//Navigation button to the Home Screen
import CriteriaIcon from '../components/EditCriteria.js';/*Cog icon to navigate user to EditCriteria screen */
import SavePredictions from '../components/SavePredictions.js';/*Disk icon to save 7 day forecast to local storage */

/*7 Day Forecast screen that makes an api call to get 7 days of weather data.
That data is then use to display if each day is a good or bad day to ride a bicycle. 
*/
const Forecast = ({navigation}) => {
	const [weatherData, setWeatherData] = useState([]);//state to hold weather data

	useEffect(() => { this.getForecast(); }, []);//load data with page is loaded

	//API call to get the current weather forecast
	getForecast = async () => {
		return fetch(`${FORECAST_API_URL}35.149,-90.049?app_id=${FORECAST_APP_ID}&app_key=${FORECAST_ACCESS_KEY}`)
			.then((response) => response.json())//converts api string into a JSON			
			.then((data) =>{
				const sortedData = this.sanitizeData(data);//convert api data into a sanitize object with only needed information
				setWeatherData(sortedData);//updates weatherData with today's temperature		
			})
			
			.catch((error) => console.log(error));
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

	return(
		<Container>
			<Header title="7 Day Forecast" />
			{/*Display warning to user while data is loading */}
			{weatherData.length === 0 &&
				<View><H1 style={styles.loadingText}>Data is loading</H1></View>
			}

			{/*Loops through an array of converted api data to display a future Forcast for next 7 days based on a criteria */}
			{weatherData.map((forecast, index) => {
				if(forecast.temperature >= 60 && forecast.temperature <=85){
					return <FutureForecast key={index} date={forecast.date} outcome="Good" />
				}else{
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