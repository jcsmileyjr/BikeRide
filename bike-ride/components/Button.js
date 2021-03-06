import React from 'react';
import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';

//Navigation button for moving the user between the screens and saving ride criteria data if save prop is present
const Button = (props) => {
	{/*Use on the EditCriteria screen to check if the save props is used. If so, save bike ride criteria data to local storage */}
	if(props.save){
		return(
			<View style={styles.buttonContainer}>
				<TouchableNativeFeedback onPress={() => {props.navigation.goBack(); props.save()}} >
					<View style={styles.buttonStyle}>
							<Text style={styles.buttonText}>{props.text}</Text>
					</View>
				</TouchableNativeFeedback>
			</View>
		);		
	}

	{/*Used on the SaveGoodDay component to close the modeal and return user to the Home screen */}
	if(props.closeModal){
		return(
			<View style={styles.buttonContainer}>
				<TouchableNativeFeedback onPress={() => {props.closeModal(false)}} >
					<View style={styles.buttonStyle}>
							<Text style={styles.buttonText}>{props.text}</Text>
					</View>
				</TouchableNativeFeedback>
			</View>
		);		
	}

	{/*If the save props is NOT used, then navigate to other screens */}
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
	buttonStyle:{
		backgroundColor:'#0C87F5',//signature dark blue color 
		paddingTop: 8, 
		paddingBottom: 8, 
		margin: 10, 
		width: 250, 
		borderColor:'navy',
		borderRadius: 15,   
	},
	buttonContainer:{//Style for the container of the button
		alignItems:"center",
		justifyContent:"center",
		marginBottom:30,
	},
	buttonText:{
		color: "white",
		textAlign:"center",
		fontWeight:"bold", 
	}
});

export default Button;