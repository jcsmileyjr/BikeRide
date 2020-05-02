import React, { useState, useEffect } from 'react'
import { ACCESS_KEY, API_URL } from 'react-native-dotenv';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { NavigationEvents } from "react-navigation";
import { Container, Text, Icon, H1 } from 'native-base';

import Header from '../components/Header.js';
import Button from '../components/Button.js';//Navigation button to the Forecast Screen
import Footer from '../components/Footer.js';
import CriteriaIcon from '../components/EditCriteria.js';/*Cog icon to navigate user to EditCriteria screen */
import SaveGoodDayIcon from '../components/SaveGoodDay.js' //Heart icon to save the current weather as a good Day
import baseRideCriteria from '../js/baseRideCriteria.js';
import {sanitizeData, applyRidingCriteria} from '../js/homeScreenFunctions';

/**First screen shown in the app that makes an api call to get today's weather. 
 * That data is use to display if today is a good or bad to ride a bicycle. 
 */
const Home = ({ navigation }) => {
	const [weatherData, setWeatherData] = useState({});//state to hold weather data
	const [rideSetting, setRideSetting] = useState({});//state to hold riding criteria

	useEffect(() => { this.getForecast(); this.setCriteria();}, []);/*This code runs before the screen renders */

	//API call to get the current weather forecast and update weatherData with the temperature
	getForecast = async () => {
		//TESTING ONLY.	
		const data = {
			"temperature": 84,
			"windSpeed": 11,
			"precip": 0,
			"date": "2020-04-27 15:12"
		}
		setWeatherData(data);
		

		/*PRODUCTION CODE
		return fetch(`${API_URL}current?access_key=${ACCESS_KEY}&query=Memphis&units=f`)
			.then((response) => response.json()) //extracts the JSON from the response.body and converts JSON string into a JavaScript object
			.then((data) =>{
				const convertedData = sanitizeData(data);//convert api data into a sanitize object with only needed information
				setWeatherData(convertedData);//updates weatherData with today's weather data		
			})
			.catch((error) => console.log(error));
		*/
	}

	
	//When the app loads, check if there is a riding criteria in local storage, if not then update local storage and state with base criteria
	setCriteria = async () => {
		try{
			const savedCriteria = await AsyncStorage.getItem('rideCriteria');//get saved ride criteria from local storage 
			if(savedCriteria !== null){//check if the data saved to local storage is not empty                
				setRideSetting(JSON.parse(savedCriteria));
			}else{
				//If there is no saved data, then save base criteria to local storage           
				await AsyncStorage.setItem("rideCriteria",JSON.stringify(baseRideCriteria));//Save base criteria to local storage
				setRideSetting(baseRideCriteria);//save base criteria to local state				
			}
		}catch (e){
			console.log(e);
		}
		
	}

	return (
		<Container>
			<Header title="Today" />
			{/*Check if the riding criteria have change */}
			<NavigationEvents onDidFocus={() => this.setCriteria()} />

			{/*Show a sun or red hand icon based on the riding criteria */}
			<View style={styles.contentlayout}>
				{applyRidingCriteria(weatherData, rideSetting) &&
					<View style={styles.mainImageContainer}>
						<Icon style={[styles.mainImageStyle, styles.sunImage]} name="md-sunny" />
						<H1 style={styles.contentStyle} >Good Day to Ride</H1>
					</View>
				}
				{!applyRidingCriteria(weatherData, rideSetting) &&
					<View style={styles.mainImageContainer}>
						<Icon style={[styles.mainImageStyle, styles.stopHandImage]} type="FontAwesome" name="hand-stop-o" />
						<H1 style={styles.contentStyle} >Do Not go Ride</H1>
					</View>
				}

				<Text style={styles.contentStyle}>The temperature is {weatherData.temperature} degrees</Text>
				<Button nav="Forecast" navigation={navigation} text="7 Day Forecast" />
			</View>
			<Footer>
				<SaveGoodDayIcon goodDay={weatherData} />
				<CriteriaIcon navigation={navigation} />
			</Footer>
		</Container>
	);
}

const styles = StyleSheet.create({
	contentlayout: {/*Take up all available space between the Header and Footer*/
		display: "flex",
		flex: 1,
	},
	contentStyle: {
		flex: 1,	/*Evenly distribute space for each component in the content-layout section*/
		textAlign: "center",
	},
	mainImageContainer: {
		flex: 2,/*Override to double area */
	},
	mainImageStyle: {/*Styles for the main two images at the top of the screen */
		marginTop: 20,/*white-space between Header and Primary Image */
		marginBottom: 40,/*white-space between Primary Image and other elements */
		fontSize: 250,/*Size of main image */
		textAlign: "center",/*center the image */

	},
	sunImage: {/*color of the sun image */
		color: "#e8e600",
	},
	stopHandImage: {/*color of the stop riding image */
		color: "red",
	},
	footerStyle: {/*Style for the footer*/
		paddingTop: 5,/*add white space above content */
		paddingBottom: 5,/*add white space below content */
		backgroundColor: "white",
	},
	cogIconStyle: {/*Style for the save icon in the footer */
		color: "navy",/*Color of the icon*/
		textAlign: "center",/*Center the icon in its row*/
	},
	footerTextStyle: {
		color: "black",
	}
});

export default Home;