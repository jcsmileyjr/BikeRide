import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'native-base';

const FutureForecast = (props) => {
	return(
		<View style={styles.contentLayout}>
			<Text style={[styles.textStyle, styles.dateSection]}>{props.date}</Text>
			<Text style={[styles.textStyle, styles.outcomeSection]}>{props.outcome}</Text>
			<View style={styles.imageContainer}>
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
	contentLayout:{/*layout of the component */
		flex:1,
		display:"flex",
		flexDirection:"row",/*make elements display horizontally */
		marginTop:10,/*white-space around forecast */
		marginBottom:10,	/*white-space around forecast */
		borderBottomColor:"#F2F2F2",
		borderBottomWidth:1,
		borderStyle:"solid",
	},
	textStyle:{
		fontSize:25,/*Size of text */
		color:"#4D4D4D",
	},
	goodImage:{/*color and size of the sun image */
		color:"green",
		fontSize:45,
	},
	badImage:{/*color and size of the stop riding image */
		color:"red",
		fontSize:45,
	},
	bestImage:{
		color:"navy",
		fontSize:45,
	},
	imageContainer:{
		flex:1,
		textAlign:"right",
		display:"flex",
		justifyContent:"flex-end",
	},
	dateSection:{
		flex:2,
		paddingLeft:20,
	},
	outcomeSection:{
		flex:1,
	}
});

export default FutureForecast;