import {sanitizeCurrentWeatherData} from '../js/sanitizeData.js';
import {applyRidingCriteria} from '../js/applyRideCriteria.js';
import {convertToCelsius} from '../js/homeScreenFunctions.js';
import baseRideCriteria from '../js/baseRideCriteria.js';

const goodForecast = {
    "temperature":80,
    "windSpeed":12,
    "ifRained":0,
    "date":"05/03/2020"
}

const badForecast = {
    "temperature":50,
    "windSpeed":26,
    "ifRained":2,
    "date":"05/06/2020"
}

describe("IF weather data from an API call is ready to be displayed?", () => {
    const testAPIData = {
        "current":{
            "temperature":80,
            "windSpeed":12,
            "precip":2
        },
        "location":"03/05/2020"
    }

    it('should convert the unknown data into a useable object and return the correct temperature', () => {
        expect((sanitizeCurrentWeatherData(testAPIData)).temperature).toBe(80);
    });

    it('should convert convert Fahrenheit to Celsius', () => {
        expect(convertToCelsius(goodForecast.temperature)).toBe(27);
    });
});

describe("If the riding criteria is applied successfully to a weather object?", () => {
    it("should return true if the object passes the criteria", () => {
        expect(applyRidingCriteria(goodForecast, baseRideCriteria)).toBeTruthy();
    });
    
    it("should return false if the object does not passes the criteria", () => {
        expect(applyRidingCriteria(badForecast, baseRideCriteria)).toBeFalsy();
    });
});

