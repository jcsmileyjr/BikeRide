import {AsyncStorage } from 'react-native';
import baseRideCriteria from '../js/baseRideCriteria.js';;
import { ACCESS_KEY, API_URL } from 'react-native-dotenv';

    //Method call in the getCurrentWeather() to convert raw data from an API call into a sanitize object to be comsume 
    //on the Home screen. Certain data is extracted and placed into an object. That object is use to update the weatherData component state 
	export const sanitizeData = (apiRawData) => {
		let convertedData = {};//temp object to hold select data from API object

		convertedData.temperature = apiRawData.current.temperature;
		convertedData.windSpeed = apiRawData.current.windSpeed;
		convertedData.ifRained = apiRawData.current.precip;
		convertedData.date = apiRawData.location.localtime;

		return convertedData;
    }


    //Function used to determine if its a good day to ride based on a ride criteria and current weather data on the Home screen. 
    //Function is called to determine what icon to display.
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
    
    //API call to get the current weather forecast and update weatherData with the temperature
    //PRODUCTION CODE
    export const getCurrentWeather = (callback) => {
        return fetch(`${API_URL}current?access_key=${ACCESS_KEY}&query=Memphis&units=f`)
            .then((response) => response.json()) //extracts the JSON from the response.body and converts JSON string into a JavaScript object
            .then((data) =>{
                const convertedData = sanitizeData(data);//convert api data into a sanitize object with only needed information
                callback(convertedData);//updates weatherData with today's weather data		
            })
            .catch((error) => console.log(error));
    }