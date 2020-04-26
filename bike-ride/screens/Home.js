import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Container, Footer,Text, Icon, H1} from 'native-base';

import Header from '../components/Header.js';
import Button from '../components/Button.js';//Navigation button to the Forcast Screen

//First screen shown in the app that loads data for the app's operations
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
			<Footer style={styles.footerStyle}>
				<View>
					<Icon style={styles.saveIconStyle} type="FontAwesome" name="save" />
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
	flex:1,	/*Evenly distribute space for each component in the content-layout section*/
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
footerStyle:{/*Style for the footer*/
	paddingTop: 5,/*add white space above content */
	paddingBottom:5,/*add white space below content */
},
saveIconStyle:{/*Style for the save icon in the footer */
	color:"black",/*Color of the icon*/
	textAlign:"center",/*Center the icon in its row*/
}
});

export default Home;