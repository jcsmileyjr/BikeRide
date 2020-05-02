import React from 'react';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';
import {Icon, Toast} from 'native-base';

const SaveGoodDay = (props) => {

    saveData = async () => {
		try{
			let arrayOfSavedDays = [];//array of weather objects
			const previousSavedGoodDays = await AsyncStorage.getItem('savedDays');//get saved array of good days from local storage 
			if(previousSavedGoodDays !== null){//check if the data saved to local storage is not empty 
				arrayOfSavedDays = JSON.parse(previousSavedGoodDays); 
			}
			arrayOfSavedDays.push(props.goodDay);//push the current good day object into the array				              
			await AsyncStorage.setItem("savedDays",JSON.stringify(arrayOfSavedDays));//Save base criteria to local storage
console.log(arrayOfSavedDays);//TESTING TESTING TESTING
		}catch (e){
			console.log(e);
		}	
		Toast.show({text:"Today's weather has been saved!!!", position:"top", type:"success", textStyle:{color:"white", textAlign:"center"}, duration:3000});
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