import React from 'react';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';
import {Icon, Toast} from 'native-base';

const SaveGoodDay = (props) => {

    saveData = async () => {
		await AsyncStorage.setItem("goodDays",JSON.stringify(props.goodDay));//Save array of weather objects to local storage 
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