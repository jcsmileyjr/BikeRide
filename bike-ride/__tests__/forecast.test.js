import baseRideCriteria from '../js/baseRideCriteria.js';
import {sanitizeData, applyRidingCriteria, applyBestDayCriteria} from '../js/forecastScreenFunctions.js';
describe("Data from an API call can be used", () => {
    const apiData= {
        "Days":    [
            {
                "temp_max_f":80,
                "windspd_max_mph": 12,
                "rain_total_in":0,
                "date":"03/05/2020"
            },
            {
                "temp_max_f":90,
                "windspd_max_mph": 16,
                "rain_total_in":2,
                "date":"05/05/2020"
            }
        ]
    }

    it('should convert the unknown data into a useable object and return the correct temperature', () => {
        expect((sanitizeData(apiData))[0].temperature).toBe(80);
    });
});

describe("If a weather object has a criteria applied to it it will return true or false?", () => {
    const bestDayCriteria = {
        "temperature":80,
        "rain":0,
        "windSpeed":13,
        "date":"05/06/2020"
    }
    
    const goodForecast = {
        "temperature":79,
        "windSpeed":12,
        "rain":0,
        "date":"05/03/2020"
    }

    const badForecast = {
        "temperature":50,
        "windSpeed":26,
        "rain":2,
        "date":"05/06/2020"
    }

    it("should return true if the object passes the riding criteria", () => {
        expect(applyRidingCriteria(goodForecast, baseRideCriteria)).toBeTruthy();
    });
    
    it("should return true if the object passes the riding criteria", () => {
        expect(applyRidingCriteria(badForecast, baseRideCriteria)).toBeFalsy();
    });

    it("should return true if the object passes the best day criteria", () => {
        expect(applyBestDayCriteria(goodForecast, bestDayCriteria)).toBeTruthy();
    });
    
    it("should return false if the object does not passes the best day criteria", () => {
        expect(applyBestDayCriteria(badForecast, bestDayCriteria)).toBeFalsy();
    });    
});