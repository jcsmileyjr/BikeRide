import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'native-base';

const FutureForecast = (props) => {
	return(
		<View style={styles.contentLayout}>
			<Text style={styles.textStyle}>props.date</Text>
			<Text style={styles.textStyle}>{props.outcome}</Text>

			{props.outcome ==="Good" &&
				<Icon name="md-sunny" style={styles.sunImage} />
			}

			{props.outcome ==="Bad" &&
				<Icon type="FontAwesome" name="hand-stop-o" style={styles.stopHandImage}  />
			}
		</View>
	);
}

const styles = StyleSheet.create({
	contentLayout:{/*layout of the component */
		display:"flex",
		justifyContent:"space-around",
		alignItems:"center",
		flexDirection:"row",/*make elements display horizontally */
		marginTop:10,/*white-space around forecast */
		marginBottom:10,	/*white-space around forecast */	
	},
	textStyle:{
		fontSize:40,/*Size of text */
	},
	sunImage:{/*color and size of the sun image */
		color:"yellow",
		fontSize:75,
	},
	stopHandImage:{/*color and size of the stop riding image */
		color:"red",
		fontSize:75,
	}
});

export default FutureForecast;