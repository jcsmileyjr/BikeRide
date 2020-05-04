import React, { useState, useEffect } from 'react'
import { View, StyleSheet} from 'react-native';
import { NavigationEvents } from "react-navigation"; // Use to reload state when navigating from another screen
import { Container, Text, Icon, H1 } from 'native-base';// UI library for styling and complex components missing from the React Native

import Header from '../components/Header.js';
import Button from '../components/Button.js';
import Footer from '../components/Footer.js';
import CriteriaIcon from '../components/EditCriteria.js';
import SaveGoodDayIcon from '../components/SaveGoodDay.js';
import {applyRidingCriteria, loadCriteria, getCurrentWeather} from '../js/homeScreenFunctions';

// First screen shown in the app that makes an api call to get today's weather to display if today is a good or bad to ride a bicycle. 
const Home = ({ navigation }) => {
	const loading = false;
	const [weatherData, setWeatherData] = useState(loading);// State to hold weather data
	const [rideCriteria, setRideSetting] = useState({});// State to hold riding criteria

	useEffect(() => { this.loadWeatherData(); loadCriteria(setRideSetting);}, []);// This code runs before the screen renders

	// API call to get the current weather forecast and update weatherData with the temperature
	loadWeatherData = async () => {
		//TESTING ONLY.	
		//
		const data = {
			"temperature": 84,
			"windSpeed": 11,
			"precip": 0,
			"date": "2020-04-27 15:12"
		}
		setWeatherData(data);
		//
		
		// API call to get the current user location, weather forecast, and update the component state with the temperature
		//getCurrentWeather(setWeatherData);
	}

	return (
		<Container>
			<Header title="Today" />
			{/*Check if the riding criteria have change */}
			<NavigationEvents onDidFocus={() => loadCriteria(setRideSetting)} />

			{/*Display warning to user while data is loading */}
			{weatherData === false &&
				<Text style={[styles.contentStyle, styles.loadingText]}>Data is loading</Text>
			}

			{/*Show a sun or red hand icon based on the riding criteria */}
			{weatherData !== false &&
				<View style={styles.contentlayout}>
					{applyRidingCriteria(weatherData, rideCriteria) &&
						<View style={styles.mainImageContainer}>
							<Icon style={[styles.mainImageStyle, styles.goodImage]} type="FontAwesome5" name="smile" />
							<H1 style={styles.imageHeaderStyle}>Good Day to Ride</H1>
						</View>
					}
					{!applyRidingCriteria(weatherData, rideCriteria) &&
						<View style={styles.mainImageContainer}>
							<Icon style={[styles.mainImageStyle, styles.badImage]} type="FontAwesome5" name="angry" />
							<H1 style={styles.imageHeaderStyle} >Do Not go Ride</H1>
						</View>
					}

					<Text style={styles.contentStyle}>The temperature is {weatherData.temperature} degrees</Text>
					<Button nav="Forecast" navigation={navigation} text="View 7 Day Forecast" />
				</View>
			}
			<Footer>
				<SaveGoodDayIcon goodDay={weatherData} />
				<CriteriaIcon navigation={navigation} />
			</Footer>
		</Container>
	);
}

const styles = StyleSheet.create({
	contentlayout: {// Take up all available space between the Header and Footer
		display: "flex",
		flex: 1,
	},
	contentStyle: {
		flex: 1,
		textAlign: "center",
		fontSize:16,
		paddingTop:225,
	},
	loadingText: {
		color:"red",
	},
	mainImageContainer: {
		flex: 2,
	},
	mainImageStyle: {// Styles for the main two images at the top of the screen
		marginTop: 20,
		fontSize: 250,// Size of main image
		textAlign: "center",
	},
	goodImage: {// Color of the good image
		color: "green",
	},
	badImage: {// Color of the stop riding image
		color: "red",
	},
	imageHeaderStyle:{
		textAlign:"center",
	}
});

export default Home;