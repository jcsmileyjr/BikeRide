import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

//Input text field to update state with an number based on input
const CustomTextInput = (props) => {
    return(                
        <View style={styles.inputContainer}>
            <Text style={[styles.inputLabelStyle, styles.boldLabel]}>{props.labelText}</Text>
            <TextInput style={styles.textInputStyle} keyboardType="number-pad" onFocus={() => {props.updateState("")}} value={String(props.state)}  onChangeText={(minTemp)=> {props.updateState(minTemp)}} />
        </View>

    );
}

const styles = StyleSheet.create({
    textInputStyle:{/*Style for input fields */
		width: 270,
		color: 'grey',  //blue text color
		textAlign: "center",
		height: 40,
		borderColor: "grey",
		borderWidth: 1,
		fontSize: 18,
    },
    boldLabel:{
        fontWeight:"bold",
    },
    inputLabelStyle:{/*Style for labels */
        textAlign:'center',/*center the label text*/
        color:"grey",/*add color */
    },
    inputContainer:{
        display:"flex",/* center the content */
        justifyContent:"center",/* center the content */
        alignItems:"center",/* center the content */
        marginTop:20,/*white space between input fields */
    }
});

export default CustomTextInput;