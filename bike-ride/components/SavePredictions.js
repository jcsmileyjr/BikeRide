import React from 'react';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';
import {Icon, Toast} from 'native-base';// UI library for styling and complex components missing from the React Native

// Icon and text in the footer on the Forecast screen to save the current 7 day forecast to be use later if there is no internet access
const SavePredictions = (props) => {

    saveData = async () => {
		await AsyncStorage.setItem("predictions",JSON.stringify(props.forecast));// Save array of weather objects to local storage 
		Toast.show({text:"7 Day Forecast has been saved!!!", position:"bottom", type:"success", textStyle:{color:"white", textAlign:"center"}, duration:3000});
    }

	return(
		<View>
			<Icon style={styles.cogIconStyle} type="FontAwesome" name="save" onPress={()=> this.saveData()} />
			<Text style={styles.footerTextStyle}>Save Forecast</Text>					
		</View>		
	);
}

const styles = StyleSheet.create({
	cogIconStyle:{
		color:"darkgreen",
		textAlign:"center",
	},
	footerTextStyle:{
		color:"black",
	}
});

export default SavePredictions;