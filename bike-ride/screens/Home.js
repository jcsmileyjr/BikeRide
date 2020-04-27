import React, {useState, useEffect} from 'react'
import dotenv from 'dotenv';
dotenv.config();
import { View, StyleSheet } from 'react-native';
import { Container,Text, Icon, H1} from 'native-base';

import Header from '../components/Header.js';
import Button from '../components/Button.js';//Navigation button to the Forecast Screen
import Footer from '../components/Footer.js';
import CriteriaIcon from '../components/EditCriteria.js';/*Cog icon to navigate user to EditCriteria screen */
import weather from '../data/weather.json';//Dummy data representing a sanitized 7 day weather forecast as a array of objects.

/**First screen shown in the app that makes an api call to get today's weather. 
 * That data is use to display if today is a good or bad to ride a bicycle. 
 */
const Home = ({navigation}) => {
	const [weatherData, setWeatherData] = useState([]);

	useEffect(() => {this.getForecast();}, []);

	//API call to get the current weather forcast
	//format is: weatherData[0].current.temperature
	getForecast = async () => {
		return fetch(`${process.env.API_URL}current?access_key=${process.env.ACCESS_KEY}&query=Memphis&units=f`)
			.then((response) => response.json())
			.then((data) =>{
				weatherData.push(data);
				console.log(weatherData[0].current.temperature);
			})
			.catch((error) => console.log(error));
	}

	//Return true or false based on a criteria like temperature
	getTodayForecast = () => {
		const forecast = weather.weather[0];
		if(forecast.temperature >= 60 && forecast.temperature <=85){
			return true;
		}
		return false;
	}

	return (
		<Container>
			<Header title="Today" />
			<View style={styles.contentlayout}>
				{this.getTodayForecast() &&
					<View style={styles.mainImageContainer}>
						<Icon style={[styles.mainImageStyle, styles.sunImage]} name="md-sunny" />
						<H1 style={styles.contentStyle} >Good Day to Ride</H1>
					</View>
				}
				{!this.getTodayForecast() &&
					<View style={styles.mainImageContainer}>
						<Icon style={[styles.mainImageStyle, styles.stopHandImage]} type="FontAwesome" name="hand-stop-o" />
						<H1 style={styles.contentStyle} >Do Not go Ride</H1>
					</View>					
				}								
				
				<Text style={styles.contentStyle}>The temperature is {weather.weather[0].temperature} degrees</Text>
				<Button nav="Forecast" navigation={navigation} text="7 Day Forecast" />
			</View>
			<Footer>
				<CriteriaIcon />				
			</Footer>
		</Container>
	);
}

const styles = StyleSheet.create({
contentlayout:{/*Take up all available space between the Header and Footer*/
	display:"flex",
	flex:1,
},
contentStyle:{
	flex:1,	/*Evenly distribute space for each component in the content-layout section*/
	textAlign:"center",
},
mainImageContainer:{
	flex:2,/*Override to double area */
},
mainImageStyle:{/*Styles for the main two images at the top of the screen */
	marginTop:20,/*white-space between Header and Primary Image */
	marginBottom:40,/*white-space between Primary Image and other elements */
	fontSize:250,/*Size of main image */
	textAlign:"center",/*center the image */
	
},
sunImage:{/*color of the sun image */
	color:"yellow",
},
stopHandImage:{/*color of the stop riding image */
	color:"red",
},
footerStyle:{/*Style for the footer*/
	paddingTop: 5,/*add white space above content */
	paddingBottom:5,/*add white space below content */
	backgroundColor:"white",
},
cogIconStyle:{/*Style for the save icon in the footer */
	color:"navy",/*Color of the icon*/
	textAlign:"center",/*Center the icon in its row*/
},
footerTextStyle:{
	color:"black",
}
});

export default Home;