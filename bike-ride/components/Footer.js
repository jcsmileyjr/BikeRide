import React from 'react';
import {View, StyleSheet } from 'react-native';
import {Footer, Text } from 'native-base';

//Footer component for each screen
const Foot = (props) => {
	return (
		<Footer style={styles.footerStyle}>
			{props.children}
		</Footer>
	);
}

const styles = StyleSheet.create({
	footerStyle:{/*Style for the footer*/
		paddingTop: 5,/*add white space above content */
		paddingBottom:5,/*add white space below content */
		backgroundColor:"white",
	}
});

export default Foot;