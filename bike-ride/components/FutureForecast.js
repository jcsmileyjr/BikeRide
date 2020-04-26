import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'native-base';

const FutureForecast = (props) => {
	return(
		<View>
			<Text>Date</Text>
			<Text>{props.outcome}</Text>
			{props.outcome ==="Good" &&
				<Icon name="md-sunny" />
			}

			{props.outcome ==="Bad" &&
				<Icon name="md-sunny" />
			}
		</View>
	);
}

const styles = StyleSheet.create({
	contentLayout:{
		display:"flex",
		justifyContent:"center",
		alignItems:"center",
		flexDirection:"row",
	}
});

export default FutureForecast;