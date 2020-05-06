import React, {useState} from 'react';
import {View, Text, StyleSheet, AsyncStorage, Modal, TouchableNativeFeedback} from 'react-native';
import {Icon, Toast, H2} from 'native-base';// UI library for styling and complex components missing from the React 

import Button from '../components/Button.js';

// Displays a heart icon and functionality to saved the current weather day as a Good Day and determine the idea Good Day based on all Good Days saved
const SaveGoodDay = (props) => {
	const [isVisible, setModalVisble] = useState(false);

	// When the user press the heart icon, the current weather criteria is save to local storage
    saveData = async () => {	
		let arrayOfSavedDays = []; 
		const previousSavedGoodDays = await AsyncStorage.getItem('savedDays');// Get saved array of good days from local storage 
		if(previousSavedGoodDays !== null){// Check if the data saved to local storage is not empty 
			arrayOfSavedDays = JSON.parse(previousSavedGoodDays); 
		}
		arrayOfSavedDays.push(props.goodDay);// Push the current good day object into the array				              
		await AsyncStorage.setItem("savedDays",JSON.stringify(arrayOfSavedDays));// Save base criteria to local storage
		this.determineBestDay(arrayOfSavedDays);// Use the array of good days to determine a Good Day criteria
		setModalVisble(true);
		Toast.show({text:"Today's weather has been saved!!!", position:"bottom", type:"success", textStyle:{color:"white", textAlign:"center"}, duration:3000});
	}

	// Function to save averages of temp and windspeed to create an ideal Good Day based on array of good days saved
	determineBestDay = async (bestDays) => {
		let temperatureArray = [];
		let windSpeedArray = [];

		bestDays.forEach((day) => temperatureArray.push(day.temperature));// Create an array of temperatures
		bestDays.forEach((day) => windSpeedArray.push(day.windSpeed));// Create an array of wind speeds

		const temperatureAverage = temperatureArray.reduce((a,b) => a + b,0) / temperatureArray.length;// Get average of temperatures from all good days
		const windSpeedAverage = windSpeedArray.reduce((a,b) => a + b,0) / windSpeedArray.length;// Get average of wind speeds from all good days

		// Create an object to hold the average of temp and wind speeds to be saved to local storage
		const goodDayCriteria = {"temperature":Math.round(temperatureAverage), "windSpeed":Math.round(windSpeedAverage)};
		await AsyncStorage.setItem("bestDayCriteria",JSON.stringify(goodDayCriteria));// Save updated good day criteria to local storage
	}

	return(
		<View>
			<Icon style={styles.penIconStyle} type="FontAwesome" name="heart" onPress={()=> this.saveData()} />
			<Text style={styles.footerTextStyle}>Save Good Day</Text>
			<Modal  animationType="slide" 
                      visible={isVisible}
                      transparent={false}>
				<View style={[styles.modalContentStyle, styles.modalStyle]}>
					
					<H2 style={styles.modalText}>Track what days are "Good" days</H2>
					<Text style={styles.modalText}>The app will "Learn" and tell you the "Best" days to ride. Today's weather has been saved!!!</Text>
					<Button closeModal = {setModalVisble} text="Close" />
				</View>

			</Modal>					
		</View>		
	);
}

const styles = StyleSheet.create({
	penIconStyle:{
		color:"red",
		textAlign:"center",
	},
	footerTextStyle:{
		color:"black",
	},
	modalContentStyle:{
		marginTop:150, //help center the modal
		marginLeft:40,  //help center the modal
		backgroundColor:"white",
		height:375,
		width:"80%",
	  }, 
	  modalText:{
		color:"black",
		textAlign:"center",
	  },
	  modalStyle:{
		alignContent:"center", 
		justifyContent:"space-around",
	  },
});

export default SaveGoodDay;