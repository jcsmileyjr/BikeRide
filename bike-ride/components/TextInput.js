import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

// Input text field to update state with an number based on input
const CustomTextInput = (props) => {
    return(                
        <View style={styles.inputContainer}>
            <Text style={[styles.inputLabelStyle, styles.boldLabel]}>{props.labelText}</Text>
            <TextInput style={styles.textInputStyle} keyboardType="number-pad" onFocus={() => {props.updateState("")}} value={String(props.state)}  onChangeText={(minTemp)=> {props.updateState(minTemp)}} />
        </View>

    );
}

const styles = StyleSheet.create({
    textInputStyle:{
		width: 270,
		color: 'grey',  
		textAlign: "center",
		height: 40,
		borderColor: "grey",
		borderWidth: 1,
		fontSize: 18,
    },
    boldLabel:{
        fontWeight:"bold",
    },
    inputLabelStyle:{
        textAlign:'center',
        color:"grey",
    },
    inputContainer:{
        display:"flex",// Center the content
        justifyContent:"center",// Center the content
        alignItems:"center",// Center the content
        marginTop:20,
    }
});

export default CustomTextInput;