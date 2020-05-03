import React from 'react';
import {View, StyleSheet } from 'react-native';
import {Header, Text } from 'native-base';/*UI library for styling and complex components missing from the React Native */
import Constants from "expo-constants";/*Set the height of the Header to the status bar height */

//Header component for each screen
const Head = (props) => {
	return (
		<View>
			<Header style={styles.headerContainer}>
				<Text style={styles.textStyle}>{props.title}</Text>
			</Header>
		</View>
	);
}

const styles = StyleSheet.create({
	headerContainer: {/*Style the container that center the text */
		backgroundColor: "#0C87F5",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginBottom:10,
		paddingTop:(Constants.statusBarHeight - 100),/*Bug where status bar covers the header. This push the header below the status bar */
	},
	textStyle:{
		color:"white",
	}
});

export default Head;