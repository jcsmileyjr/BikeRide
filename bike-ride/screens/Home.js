import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Container, Footer,Text, Icon, H1, H2, H3 } from 'native-base';

import Header from '../components/Header.js';
import Button from '../components/Button.js';

//First screen in the app that loads data for the app's operations
const Home = ({navigation}) => {
	return (
		<Container>
			<Header title="Today" />
			<View style={styles.contentlayout}>
				<Icon style={[styles.mainImageStyle, styles.sunImage]} active name="md-sunny" />
				<H1 style={styles.contentStyle} >Good Day to Ride</H1>
				<Text style={styles.contentStyle}>The temperature is 75 degrees</Text>
				<Button nav="Forecast" navigation={navigation} text="7 Day Forecast" />
			</View>
			<Footer>
				<View>
					<Icon type="FontAwesome" name="" />save
					<Text>Ride Criteria</Text>
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
	flex:1,	/*Evenly distribute space for each component */
	textAlign:"center",
},
mainImageStyle:{/*Styles for the main two images at the top of the screen */
	marginTop:20,/*white-space between Header and Primary Image */
	marginBottom:40,/*white-space between Primary Image and other elements */
	fontSize:250,/*Size of main image */
	textAlign:"center",
	flex:2,/*Override to double area */
},
sunImage:{/*color of the sun image */
	color:"yellow",
},
});

export default Home;