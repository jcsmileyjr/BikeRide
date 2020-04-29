import React from 'react';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';
import {Icon} from 'native-base';

const SavePredictions = () => {
	return(
		<View>
			<Icon style={styles.cogIconStyle} type="FontAwesome" name="save" />
			<Text style={styles.footerTextStyle}>Save</Text>					
		</View>		
	);
}

const styles = StyleSheet.create({
	cogIconStyle:{/*Style for the save icon in the footer */
		color:"darkgreen",/*Color of the icon*/
		textAlign:"center",/*Center the icon in its row*/
	},
	footerTextStyle:{
		color:"black",
	}
});

export default SavePredictions;