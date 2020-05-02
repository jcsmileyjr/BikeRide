import {AsyncStorage } from 'react-native';
import baseRideCriteria from '../js/baseRideCriteria.js';;


	//Method to convert data from API object into a sanitize object to be comsume by the Home screen
	export const sanitizeData = (apiData) => {
		const workingArray = [];//temp array to hold data object from weather service api call
		let convertedData = {};//temp object to hold select data from API object
		workingArray.push(apiData);//push the api data object into the temp array

		convertedData.temperature = workingArray[0].current.temperature;
		convertedData.windSpeed = workingArray[0].current.windSpeed;
		convertedData.ifRained = workingArray[0].current.precip;
		convertedData.date = workingArray[0].location.localtime;

		return convertedData;
    }


    //Return true or false based on ride criteria
	export const applyRidingCriteria  = (weatherData, rideSetting) => {
		//If current weather temperature is less then minimal temp criteria or more then maximum temp criteria then return false
		if (weatherData.temperature < rideSetting.minimalTemperature || weatherData.temperature > rideSetting.maximumTemperature) {
			return false;
		}
		if(weatherData.windSpeed > rideSetting.windSpeedLimit){return false}//If current weather windspeed is greater then criteria, return false
		if(weatherData.precip > 0 && rideSetting.ifRained === false){return false}//If it has rained and the criteria is false (no ride), return false
		return true;
    }
    
    //When the app loads, check if there is a riding criteria in local storage, if not then update local storage and state with base criteria
	export const setCriteria = async (callback) => {
		try{
			const savedCriteria = await AsyncStorage.getItem('rideCriteria');//get saved ride criteria from local storage 
			if(savedCriteria !== null){//check if the data saved to local storage is not empty                
				callback(JSON.parse(savedCriteria));
			}else{
				//If there is no saved data, then save base criteria to local storage           
				await AsyncStorage.setItem("rideCriteria",JSON.stringify(baseRideCriteria));//Save base criteria to local storage
				callback(baseRideCriteria);//save base criteria to local state				
			}
		}catch (e){
			console.log(e);
		}
		
	}