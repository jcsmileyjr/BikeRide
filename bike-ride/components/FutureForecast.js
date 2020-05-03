import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'native-base';

const FutureForecast = (props) => {
	return(
		<View style={styles.contentLayout}>
			<Text style={styles.textStyle}>{props.date}</Text>
			<Text style={styles.textStyle}>{props.outcome}</Text>
			<View style={{textAlign:"right", flex:1}}>
				{props.outcome ==="Good" &&
					<Icon name="md-sunny" style={styles.sunImage} />
				}

				{props.outcome ==="Bad" &&
					<Icon type="FontAwesome" name="times-circle-o" style={styles.stopHandImage}  />
				}

				{props.outcome ==="Best" &&
					<Icon type="FontAwesome" name="bicycle" style={styles.bicycleImage}  />
				}
			</View>			
		</View>
	);
}

const styles = StyleSheet.create({
	contentLayout:{/*layout of the component */
		flex:1,
		display:"flex",
		flexDirection:"row",/*make elements display horizontally */
		marginTop:10,/*white-space around forecast */
		marginBottom:10,	/*white-space around forecast */	
	},
	textStyle:{
		fontSize:30,/*Size of text */
		flex: 1,
		marginLeft:20,/*add whitespace around the text */
	},
	sunImage:{/*color and size of the sun image */
		color:"#e8e600",
		fontSize:50,
	},
	stopHandImage:{/*color and size of the stop riding image */
		color:"red",
		fontSize:50,
	},
	bicycleImage:{
		color:"navy",
		fontSize:50,
	}
});

export default FutureForecast;