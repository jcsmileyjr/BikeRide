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
	},
	textStyle:{
		fontSize:25,/*Size of text */
		flex: 1,
		paddingLeft:20,/*add whitespace around the text */
		color:"#4D4D4D",
	},
	goodImage:{/*color and size of the sun image */
		color:"green",
		fontSize:50,
	},
	badImage:{/*color and size of the stop riding image */
		color:"red",
		fontSize:50,
	},
	bestImage:{
		color:"navy",
		fontSize:50,
	}
});

export default FutureForecast;