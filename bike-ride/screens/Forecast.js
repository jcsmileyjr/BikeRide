import React, { useState, useEffect } from 'react'
import {View, Text, StyleSheet} from 'react-native';
import {Container, Icon} from 'native-base';
import {FORECAST_ACCESS_KEY, FORECAST_API_URL, FORECAST_APP_ID } from 'react-native-dotenv';

import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import FutureForecast from '../components/FutureForecast.js';
import Button from '../components/Button.js';//Navigation button to the Home Screen
import weather from '../data/weather.json';//Dummy data representing a sanitized 7 day weather forecast as a array of objects.
import CriteriaIcon from '../components/EditCriteria.js';/*Cog icon to navigate user to EditCriteria screen */

/*7 Day Forecast screen that makes an api call to get 7 days of weather data.
That data is then use to display if each day is a good or bad day to ride a bicycle. 
*/
const Forecast = ({navigation}) => {
	const [weatherData, setWeatherData] = useState(0);

	useEffect(() => { this.getForecast(); }, []);

	//API call to get the current weather forecast
	getForecast = async () => {
		//TESTING ONLY.
		
		const data = {
			"temperature": "72",
			"windSpeed": "11",
			"precip": "0",
			"date": "2020-04-27 15:12"
		}
		setWeatherData(data.temperature);

		//PRODUCTION CODE
		return fetch(`${FORECAST_API_URL}?app_id=${FORECAST_APP_ID}&app_key=${FORECAST_ACCESS_KEY}`)
			.then((response) => response.json())
			.then((data) =>{console.log(data);console.log(FORECAST_API_URL);})
			/*
			.then((data) =>{
				const convertedData = this.sanitizeData(data);//convert api data into a sanitize object with only needed information
				setWeatherData(convertedData.temperature);//updates weatherData with today's temperature
				
				//weatherData.push(this.sanitizeData(data));//old code that works				
			})
			*/
			.catch((error) => console.log(error));
		//
	}

	//Method to convert data from API object into a sanitize object to be comsume by the Home screen
	sanitizeData = (apiData) => {
		const workingArray = [];//temp array to hold data object from weather service api call
		let convertedData = {};//temp object to hold select data from API object
		workingArray.push(apiData);//push the api data object into the temp array

		convertedData.temperature = workingArray[0].current.temperature;
		convertedData.windSpeed = workingArray[0].current.windSpeed;
		convertedData.ifRained = workingArray[0].current.precip;
		convertedData.date = workingArray[0].location.localtime;

		return convertedData;
	}
	return(
		<Container>
			<Header title="7 Day Forecast" />
			
			{weather.weather.map((forecast, index) => {
				if(forecast.temperature >= 60 && forecast.temperature <=85){
					return <FutureForecast key={index} date={forecast.date} outcome="Good" />
				}else{
					return <FutureForecast key={index} date={forecast.date} outcome="Bad" />
				}
			 })
			}

			<Button nav="Home" navigation={navigation} text="Today Forecast" />
			<Footer>
				<CriteriaIcon />
				<Text>{weatherData}</Text>
			</Footer>
		</Container>
	);
}

const styles = StyleSheet.create({
	contentlayout:{/*Take up all available space between the Header and Footer*/
		display:"flex",
		flex:1,
	}
});

export default Forecast;