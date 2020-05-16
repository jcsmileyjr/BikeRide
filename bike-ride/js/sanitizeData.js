	/**
	 * Method called to convert raw data from an API call into a sanitize object to be comsume on the Home screen.  
	 * Certain data is extracted and placed into an object. That object is use to update the weatherData component state 
	 * @param {*} apiRawData 
	 */

	export const sanitizeCurrentWeatherData = (apiRawData) => {
		let convertedData = {};// Temp object to hold select data from API object

		convertedData.temperature = apiRawData.current.temperature;
		convertedData.windSpeed = apiRawData.current.wind_speed;
		convertedData.rain = apiRawData.current.precip;
		convertedData.date = apiRawData.location.localtime;

		return convertedData;
    }

    
	export const sanitizeSevenDayForecastData = (apiRawData) => {
		let convertedArray = [];
		const workingArray = [];
		workingArray.push(apiRawData);		

		// Convert key data from each weather object and push into an array
		workingArray[0].Days.map((weather) => {
			let convertedData = {};
			convertedData.temperature = weather.temp_max_f;
			convertedData.windSpeed = weather.windspd_max_mph;
			convertedData.rain = weather.rain_total_in;
			convertedData.date = rebuildDate(weather.date);

			convertedArray.push(convertedData);
		})

		return convertedArray;
    }  
    
	// Use date in old format (day/month/year),convert to updated format (month/day/year), and return day of the week name
	export const rebuildDate = (oldDate) => {
		const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
		const convertIntoArray = oldDate.split("/");
		const reconstructedDate = `${convertIntoArray[1]}/${convertIntoArray[0]}/${convertIntoArray[2]}`;
		const newDate = new Date(reconstructedDate);
		return daysOfTheWeek[newDate.getDay()];		
	}    