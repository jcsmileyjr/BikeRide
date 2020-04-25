import React from 'react';
import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';

//Navigation button for moving the user between the screens
const Button = (props) => {
	return(
		<View style={styles.buttonContainer}>
			<TouchableNativeFeedback onPress={() => props.navigation.navigate(props.nav)} >
				<View style={styles.buttonStyle}>
						<Text style={styles.buttonText}>{props.text}</Text>
				</View>
			</TouchableNativeFeedback>
		</View>
	);
}

const styles = StyleSheet.create({
	buttonStyle:{//style for the Navigation button
		backgroundColor:'navy',//signature dark blue color 
		paddingTop: 8, //space between button title and border
		paddingBottom: 8, //space between button title and border
		margin: 10, //whitespace between button and other elements
		width: 250, //width of button
		borderColor:'navy',//signature purple color
		borderRadius: 15, //round the corners    
	},
	buttonContainer:{/*Style for the container of the button */
		alignItems:"center",  //help center the button
		justifyContent:"center",
	},
	buttonText:{
		color: "white", //text color
		textAlign:"center", //center the text
		fontWeight:"bold",  //Bigger text
	}
});

export default Button;