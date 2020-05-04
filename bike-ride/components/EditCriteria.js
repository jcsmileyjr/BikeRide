import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'native-base';

//Icon and text that appear in the footer to navigate the user to the Edit Criteria screen
const EditCriteria = (props) => {
	return(
		<View>
			<Icon style={styles.cogIconStyle} type="Entypo" name="edit" onPress={() => props.navigation.push("SetCriteria")}/>
			<Text style={styles.footerTextStyle}>Edit Ride Criteria</Text>					
		</View>		
	);
}

const styles = StyleSheet.create({
	cogIconStyle:{
		color:"#0C87F5",
		textAlign:"center",
	},
	footerTextStyle:{
		color:"black",
	}
});

export default EditCriteria;