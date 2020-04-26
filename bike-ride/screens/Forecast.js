import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Container} from 'native-base';

import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import FutureForecast from '../components/FutureForecast.js';

const Forecast = () => {
	return(
		<Container>
			<Header title="7 Day Forecast" />
			<View style={styles.contentlayout}>
				<FutureForecast outcome="Good" />
			</View>
			<Footer>
				<View><Text>Bottom of the screen</Text></View>
			</Footer>
		</Container>
	);
}

const styles = StyleSheet.create({
	contentlayout:{/*Take up all available space between the Header and Footer*/
		display:"flex",
		flex:1,
	},
});

export default Forecast;