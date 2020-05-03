import React from 'react';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';
import {Icon, Toast} from 'native-base';/*UI library for styling and complex components missing from the React Native */

//Displays a heart icon and functionality to saved the current weather day as a Good Day and determine the idea Good Day based on all Good Days saved
const SaveGoodDay = (props) => {

	//When the user press the heart icon, the current weather criteria is save to local storage
    saveData = async () => {
		try{
			let arrayOfSavedDays = [];//array of weather objects
			const previousSavedGoodDays = await AsyncStorage.getItem('savedDays');//get saved array of good days from local storage 
			if(previousSavedGoodDays !== null){//check if the data saved to local storage is not empty 
				arrayOfSavedDays = JSON.parse(previousSavedGoodDays); 
			}
			arrayOfSavedDays.push(props.goodDay);//push the current good day object into the array				              
			await AsyncStorage.setItem("savedDays",JSON.stringify(arrayOfSavedDays));//Save base criteria to local storage
			this.determineBestDay(arrayOfSavedDays);//Use the array of good days to determine a Good Day criteria
		}catch (e){
			console.log(e);
		}	
		Toast.show({text:"Today's weather has been saved!!!", position:"bottom", type:"success", textStyle:{color:"white", textAlign:"center"}, duration:3000});
	}

	//Function to save averages of temp and windspeed to create an ideal Good Day based on array of good days saved
	determineBestDay = async (bestDays) => {
		let temperatureArray = [];
		let windSpeedArray = [];

		bestDays.forEach((day) => temperatureArray.push(day.temperature));//create an array of temperatures
		bestDays.forEach((day) => windSpeedArray.push(day.windSpeed));//create an array of wind speeds

		const temperatureAverage = temperatureArray.reduce((a,b) => a + b,0) / temperatureArray.length;//Get average of temperatures from all good days
		const windSpeedAverage = windSpeedArray.reduce((a,b) => a + b,0) / windSpeedArray.length;//Get average of wind speeds from all good days

		//Create an object to hold the average of temp and wind speeds to be saved to local storage
		const goodDayCriteria = {"temperature":Math.round(temperatureAverage), "windSpeed":Math.round(windSpeedAverage)};
		await AsyncStorage.setItem("bestDayCriteria",JSON.stringify(goodDayCriteria));//Save updated good day criteria to local storage
	}

	return(
		<View>
			<Icon style={styles.cogIconStyle} type="FontAwesome" name="heart" onPress={()=> this.saveData()} />
			<Text style={styles.footerTextStyle}>Save Good Day</Text>					
		</View>		
	);
}

const styles = StyleSheet.create({
	cogIconStyle:{/*Style for the save icon in the footer */
		color:"red",/*Color of the icon*/
		textAlign:"center",/*Center the icon in its row*/
	},
	footerTextStyle:{
		color:"black",
	}
});

export default SaveGoodDay;