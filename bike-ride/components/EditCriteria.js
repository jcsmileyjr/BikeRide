import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'native-base';

const EditCriteria = () => {
	return(
		<View>
			<Icon style={styles.cogIconStyle} type="FontAwesome" name="cog" />
			<Text style={styles.footerTextStyle}>Edit Ride Criteria</Text>					
		</View>		
	);
}

const styles = StyleSheet.create({
	cogIconStyle:{/*Style for the save icon in the footer */
		color:"navy",/*Color of the icon*/
		textAlign:"center",/*Center the icon in its row*/
	},
	footerTextStyle:{
		color:"black",
	}
});

export default EditCriteria;