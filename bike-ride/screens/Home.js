import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Container, Footer,Text, Icon, H1} from 'native-base';

import Header from '../components/Header.js';
import Button from '../components/Button.js';//Navigation button to the Forecast Screen
import weather from '../data/weather.json';

//First screen shown in the app that loads data for the app's operations
const Home = ({navigation}) => {


	//function that return true or false based on a criteria like temperature
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
						<H1 style={styles.contentStyle} >Do Not to Ride</H1>
					</View>					
				}								
				
				<Text style={styles.contentStyle}>The temperature is {weather.weather[0].temperature} degrees</Text>
				<Button nav="Forecast" navigation={navigation} text="7 Day Forecast" />
			</View>
			<Footer style={styles.footerStyle}>
				<View>
					<Icon style={styles.cogIconStyle} type="FontAwesome" name="cog" />
					<Text style={styles.footerTextStyle}>Edit Ride Criteria</Text>					
				</View>			
			</Footer>
		</Container>
	);
}

const styles = StyleSheet.create({
contentlayout:{
	display:"flex",
	flex:1,/*Take up all available space */
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
	textAlign:"center",
	
},
sunImage:{/*color of the sun image */
	color:"yellow",
},
stopHandImage:{
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