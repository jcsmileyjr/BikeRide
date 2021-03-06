import {AsyncStorage } from 'react-native';
import defaultRideCriteria from './baseRideCriteria.js';// 

	/**
	 * When the app loads, check if there is a riding criteria in local storage, if not then update local storage and state with base criteria
	 * @param {*} callback // function to saved the data to the component's criteria state
	 */
	export const loadRideCriteria = async (callback) => {		
		const savedCriteria = await AsyncStorage.getItem('rideCriteria');//get saved ride criteria from local storage 
		if(savedCriteria !== null){//check if the data saved to local storage is not empty                
			callback(JSON.parse(savedCriteria));
		}else{
			// If there is no saved data, then save base criteria to local storage           
			await AsyncStorage.setItem("rideCriteria",JSON.stringify(defaultRideCriteria));// Save base criteria to local storage
			callback(defaultRideCriteria);// Save base criteria to local state				
		}		
	} 
	
	/**
	 * When the app loads, check if there is a best day to ride criteria in local storage
	 * @param {*} callback // function to saved the data to the component's criteria state
	 */
	export const loadBestDayCriteria = async (callback) => {
		const savedBestDayCriteria = await AsyncStorage.getItem('bestDayCriteria');// Get saved best ride criteria from local storage
		if(savedBestDayCriteria !== null){// Check if the data saved to local storage is not empty                
			callback(JSON.parse(savedBestDayCriteria));
		}else {
			console.log("Best day Criteria not saved");
		}		 
	}