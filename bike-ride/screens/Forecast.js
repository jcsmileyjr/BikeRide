import React, { useState, useEffect } from 'react'
import {StyleSheet, View, AsyncStorage} from 'react-native';
import {Container, H1, Toast} from 'native-base';// UI library for styling and complex components missing from the React Native
import { NavigationEvents } from "react-navigation";// Use to reload state when navigating from another screen

import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import FutureForecast from '../components/FutureForecast.js';// Component with Icon detailing if its a good or bad day to ride
import Button from '../components/Button.js';
import CriteriaIcon from '../components/EditCriteria.js';
import SavePredictions from '../components/SavePredictions.js';
import {loadWeatherData, loadCriteria, applyRidingCriteria, applyBestDayCriteria} from '../js/forecastScreenFunctions.js';

// Screen that makes an api call to get 7 days of weather data to display if each day is a good or bad day to ride a bicycle. 
const Forecast = ({navigation}) => {
	const [weatherData, setWeatherData] = useState([]);// State to hold weather data received from an weather API call
	const [rideCriteria, setRideCriteria] = useState({});// State to hold riding criteria loaded from local storage
	const [bestDayCriteria, setBestDayCriteria] = useState(false);// State to hold the best day criteria loaded from local storage
	

	useEffect(() => { loadWeatherData(setWeatherData); }, []);// Load API weather data to component state before page is loading
	
	useEffect(() => { // Load riding criteria to component state
		let mounted = true;// Unmounted components "Bug Fix". During clean up (components are unmounted), this stops async calls from being made		
		loadCriteria(mounted, setRideCriteria, setBestDayCriteria);// Get the current riding criteria from local storage or use the base criteria. 		
		
		return () => mounted = false;
	}, []);



	return(
		<Container>
			<Header title="7 Day Forecast" />

			{/*Check if the riding criteria have change */}
			<NavigationEvents onDidFocus={() => loadCriteria(mounted= true,setRideCriteria, setBestDayCriteria)} />
			
			{/*Display warning to user while data is loading */}
			{weatherData.length === 0 &&
				<View><H1 style={styles.loadingText}>Data is loading</H1></View>
			}

			{/*Loops through an array of converted api data to display a future Forcast for next 7 days based on two criteria */}
			{weatherData.map((forecast, index) => {
				if(applyRidingCriteria(forecast, rideCriteria)){
					if(applyBestDayCriteria(forecast, bestDayCriteria)){
						return <FutureForecast key={index} date={forecast.date} outcome="Best" />
					}else{
						return <FutureForecast key={index} date={forecast.date} outcome="Good" />
					}					
				}
				
				if(!applyRidingCriteria(forecast,  rideCriteria)){
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