import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Container} from 'native-base';

import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import FutureForecast from '../components/FutureForecast.js';
import weather from '../data/weather.json';//Dummy data representing a sanitized 7 day weather forecast as a array of objects.

/*7 Day Forecast screen that makes an api call to get 7 days of weather data.
That data is then use to display if each day is a good or bad day to ride a bicycle. 
*/
const Forecast = () => {
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

			<View style={styles.contentlayout}>
				<FutureForecast outcome="Good" />
				<FutureForecast outcome="Bad" />
			</View>
			<Footer>
				<View><Text>Bottom of the screen</Text></View>
			</Footer>
		</Container>
	);
}

const styles = StyleSheet.create({
	contentlayout:{/*Take up all available space between the Header and Footer*/
		display:"flex",
		flex:1,
	},
});

export default Forecast;