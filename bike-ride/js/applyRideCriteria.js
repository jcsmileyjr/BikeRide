    
    

	/**
	 * Function used to determine if its a good/bad day to ride based on a ride criteria and current weather data on the Home screen. 	 * 
	 * @param {*} weatherData // Object with weather details 
	 * @param {*} rideCriteria // Method use to update the component state
	 */
	export const applyRidingCriteria  = (weatherData, rideCriteria) => {
		// If current weather temperature is less then minimal temp criteria or more then maximum temp criteria then return false
		if (weatherData.temperature < rideCriteria.minimalTemperature || weatherData.temperature > rideCriteria.maximumTemperature) {
			return false;
		}
		if(weatherData.windSpeed > rideCriteria.windSpeedLimit){return false}// If current weather windspeed is greater then criteria, return false
		if(weatherData.rain > 0 && rideCriteria.ifRained === false){return false}// If it has rained and the criteria is false (no ride), return false
		return true;
    } 

	// Return true or false based on best riding criteria temperature and wind speed by a negative or positive 2
	export const applyBestDayCriteria = (forecast, bestDayCriteria) => {
		if(bestDayCriteria === false){// Return false if there is no best day criteria saved
			return false;
		}
		// Determine a best day if the forecast temperature is 1 degress more or less then the idea best day criteria temperature
		if(forecast.temperature > (bestDayCriteria.temperature + 2) || forecast.temperature < (bestDayCriteria.temperature - 2)){
			return false
		}

		// Determine a best day if the forecast wind speed is 1 degress more or less then the idea best day criteria wind speed
		if(forecast.windSpeed >= (bestDayCriteria.windSpeed + 2) || forecast.windSpeed <= (bestDayCriteria.windSpeed - 2)){
			return false
		}		
		return true;
	}