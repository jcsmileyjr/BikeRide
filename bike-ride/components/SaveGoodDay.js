import React from 'react';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';
import {Icon, Toast} from 'native-base';

const SaveGoodDay = (props) => {

	//When the user press the heart icon, the current weather criteria is save to local storage
    saveData = async () => {
		//await AsyncStorage.removeItem('savedDays');//TESTING TESTING TESTING TESTING
		try{
			let arrayOfSavedDays = [];//array of weather objects
			const previousSavedGoodDays = await AsyncStorage.getItem('savedDays');//get saved array of good days from local storage 
			if(previousSavedGoodDays !== null){//check if the data saved to local storage is not empty 
				arrayOfSavedDays = JSON.parse(previousSavedGoodDays); 
			}
			arrayOfSavedDays.push(props.goodDay);//push the current good day object into the array				              
			await AsyncStorage.setItem("savedDays",JSON.stringify(arrayOfSavedDays));//Save base criteria to local storage
			this.determineBestDay(arrayOfSavedDays);
console.log(arrayOfSavedDays);//TESTING TESTING TESTING
		}catch (e){
			console.log(e);
		}	
		Toast.show({text:"Today's weather has been saved!!!", position:"top", type:"success", textStyle:{color:"white", textAlign:"center"}, duration:3000});
	}
	
	/*
		convertedData.temperature = workingArray[0].current.temperature;
		convertedData.windSpeed = workingArray[0].current.windSpeed;
		convertedData.ifRained = workingArray[0].current.precip;
		convertedData.date = workingArray[0].location.localtime;	
	*/

	determineBestDay = async (bestDays) => {
		let temperatureArray = [];
		let windSpeedArray = [];


		bestDays.forEach((day) => temperatureArray.push(day.temperature));
		bestDays.forEach((day) => windSpeedArray.push(day.windSpeed));

		const temperatureAverage = temperatureArray.reduce((a,b) => a + b,0) / temperatureArray.length;
		const windSpeedAverage = windSpeedArray.reduce((a,b) => a + b,0) / windSpeedArray.length;

		const goodDayCriteria = {"temperature":temperatureAverage, "windSpeed":windSpeedAverage};
		
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