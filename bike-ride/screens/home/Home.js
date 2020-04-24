import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Container, Footer,Text, Icon, H1, H2, H3 } from 'native-base';

import Header from '../../components/Header.js';

const Home = () => {
	return (
		<Container>
			<Header />
			<View style={styles.contentlayout}>
				<Icon style={styles.contentStyle} active name="md-sunny" />
				<H1 style={styles.contentStyle} >Hero</H1>
				<Text style={styles.contentStyle}>The temperature is 75 degrees</Text>
				<Text style={styles.contentStyle}>Button</Text>
			</View>
			<Footer>
				<Text>save button</Text>
				<Text>Ride Criteria button</Text>
			</Footer>
		</Container>
	);
}

const styles = StyleSheet.create({
contentlayout:{
	display:"flex",
	flex:1,/*Use to take up all available space */
},
contentStyle:{
	flex:1,	
	textAlign:"center",
},
textStyle:{
	flex:1,
	textAlign:"center"
},
});

export default Home;