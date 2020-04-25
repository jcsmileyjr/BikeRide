import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Container, Footer,Text, Icon, H1, H2, H3 } from 'native-base';

import Header from '../components/Header.js';
import Button from '../components/Button.js';

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
				<Text>save button</Text>
				<Text>Ride Criteria button</Text>
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
mainImageStyle:{
	marginTop:20,
	marginBottom:40,
	fontSize:250,/*Size of main image */
	textAlign:"center",
	flex:2,/*Override to double area */
},
sunImage:{
	color:"yellow",
},
});

export default Home;