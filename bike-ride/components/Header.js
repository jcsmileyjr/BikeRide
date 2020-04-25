import React from 'react';
import {View, StyleSheet } from 'react-native';
import {Header, Text } from 'native-base';

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
		backgroundColor: "navy",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop:23,/*Bug where status bar covers the header. This push the header below the status bar */
	},
	textStyle:{
		color:"white",
	}
});

export default Head;