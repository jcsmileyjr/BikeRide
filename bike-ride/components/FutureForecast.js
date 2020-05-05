import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'native-base';// UI library for styling and complex components missing from the React Native

// Displayed on the Forecast Screen, it repersent weather for a day.
const FutureForecast = (props) => {
	return(
		<View style={styles.contentLayout}>
			<Text style={[styles.textStyle, styles.dateSection, styles.seperator]}>{props.date}</Text>
			<Text style={[styles.textStyle, styles.outcomeSection, styles.seperator]}>{props.outcome}</Text>
			<View style={[styles.imageContainer, styles.seperator]}>
				{props.outcome ==="Good" &&
					<Icon type="FontAwesome5" name="smile" style={styles.goodImage} />
				}

				{props.outcome ==="Bad" &&
					<Icon type="FontAwesome5" name="angry" style={styles.badImage}  />
				}

				{props.outcome ==="Best" &&
					<Icon type="FontAwesome5" name="grin-stars" style={styles.bestImage}  />
				}
			</View>			
		</View>
	);
}

const styles = StyleSheet.create({
	contentLayout:{
		flex:1,
		display:"flex",// Make elements display horizontally
		flexDirection:"row",// Make elements display horizontally	
		borderBottomColor:"#F2F2F2",// Style for light grey seperator between each forecast
		borderBottomWidth:1,// Style for light grey seperator between each forecast
		borderStyle:"solid",// Style for light grey seperator between each forecast
	},
	textStyle:{
		fontSize:25,
		color:"#4D4D4D",// Light grey color
	},
	goodImage:{// Color and size of the good day image
		color:"green",
		fontSize:45,
	},
	badImage:{// Color and size of the bad day image
		color:"red",
		fontSize:45,
	},
	bestImage:{/*color and size of the great day image */
		color:"navy",
		fontSize:45,
	},
	imageContainer:{/*Style for container of the image */
		flex:1,
		display:"flex",
	},
	dateSection:{/*Style for date */
		flex:2,
		paddingLeft:20,
	},
	outcomeSection:{/*Style for outcome */
		flex:1,
	}
});

export default FutureForecast;