import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'native-base';

const EditCriteria = (props) => {
	return(
		<View>
			<Icon style={styles.cogIconStyle} type="Entypo" name="edit" onPress={() => props.navigation.push("SetCriteria")}/>
			<Text style={styles.footerTextStyle}>Edit Ride Criteria</Text>					
		</View>		
	);
}

const styles = StyleSheet.create({
	cogIconStyle:{/*Style for the save icon in the footer */
		color:"#0C87F5",/*Color of the icon*/
		textAlign:"center",/*Center the icon in its row*/
	},
	footerTextStyle:{
		color:"black",
	}
});

export default EditCriteria;