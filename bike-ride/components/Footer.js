import React from 'react';
import {StyleSheet } from 'react-native';
import {Footer} from 'native-base';/*UI library for styling and complex components missing from the React Native */

//Footer component for each screen
const Foot = (props) => {
	return (
		<Footer style={styles.footerStyle}>
			{props.children}
		</Footer>
	);
}

const styles = StyleSheet.create({
	footerStyle:{
		paddingTop: 5,
		paddingBottom:5,
		backgroundColor:"white",
		display:"flex",
		justifyContent:"space-around",
		alignItems:"center",

	}
});

export default Foot;