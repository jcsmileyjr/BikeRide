import React, { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Text, Icon, H1 } from 'native-base';

import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Button from '../components/Button.js';//Navigation button to the Home Screen

const SetCriteria = ({navigation}) => {
    const [minimalTemp, setMinimalTemp] = useState(0);
    const [maximumTemp, setMaximumTemp] = useState(0);
    const [windSpeed, setWindSpeed] = useState(0);
    const [ifRained, setIfRained] = useState(false);
    return(
        <Container>
            <Header title="Today" />
            <View style={styles.contentlayout}>
                <H1 style={styles.pageTitle}>Set the Criteria for a Good Bicycle Rides</H1>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabelStyle}>Set Minimal Temperature to Ride</Text>
                    <TextInput style={styles.textInputStyle}  onChangeText={(minimalTemp)=> setMinimalTemp(minimalTemp)} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabelStyle}>Set Maximum Temperature to Ride</Text>
                    <TextInput style={styles.textInputStyle}  onChangeText={(maximumTemp)=> setMaximumTemp(maximumTemp)} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabelStyle}>Set Maximum Wind Speed to Ride</Text>
                    <TextInput style={styles.textInputStyle}  onChangeText={(windSpd)=> setWindSpeed(windSpd)} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabelStyle}>Type True or False if you want to ride if it Rained</Text>
                    <TextInput style={styles.textInputStyle}  onChangeText={(rideIfRain)=> setIfRained(rideIfRain)} />
                </View>

                <View style={styles.buttonWhiteSpace}>
                    <Button nav="Home" navigation={navigation} text="Save" />
                </View>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    contentlayout: {/*Take up all available space between the Header and Footer*/
		display: "flex",
		flex: 1,
	},
    textInputStyle:{
		width: 270,
		color: 'grey',  //blue text color
		textAlign: "center",
		height: 50,
		borderColor: "grey",
		borderWidth: 1,
		elevation: 1,
		fontSize: 18,
    },
    inputLabelStyle:{
        textAlign:'center',/*center the label text*/
        color:"grey",/*add color */
    },
    inputContainer:{
        display:"flex",/* center the content */
        justifyContent:"center",/* center the content */
        alignItems:"center",/* center the content */
        marginTop:20,/*white space between input fields */
    },
    pageTitle:{
        textAlign:"center",
        fontWeight:"bold",
    },
    buttonWhiteSpace:{
        marginTop:10,
    }
});

export default SetCriteria;