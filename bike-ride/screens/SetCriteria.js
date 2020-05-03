import React, { useState, useEffect} from 'react'
import { View, TextInput, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Text, ListItem, CheckBox, H2} from 'native-base';

import Header from '../components/Header.js';
import Button from '../components/Button.js';//Navigation button to the Home Screen

//Screen shown when user click the cog icon in the footer. User can edit the criteria for good days while bike riding
const SetCriteria = ({navigation}) => {
    const [minimalTemp, setMinimalTemp] = useState(0);
    const [maximumTemp, setMaximumTemp] = useState(0);
    const [windSpeed, setWindSpeed] = useState(0);
    const [ifRained, setIfRained] = useState(false);
    const [oldCriteria, setOldCriteria] = useState({});

    useEffect(() => { this.getOldCriteria(); }, []);/*This code runs before the screen renders */

    //Get the criteria saved to local storage to be displayed to the user
    getOldCriteria = async () => {
        const savedCritera = await AsyncStorage.getItem('rideCriteria');//get saved ride criteria from local storage 
        const oldCriteria =JSON.parse(savedCritera);
        setMinimalTemp(oldCriteria.minimalTemperature);
        setMaximumTemp(oldCriteria.maximumTemperature);
        setWindSpeed(oldCriteria.windSpeedLimit);
        setIfRained(oldCriteria.ifRained);
    }

    //method called when user click the button. Creates a new riding criteria object and save to local storage
    saveData = async () => {
        let newCriteria = {};
        newCriteria.minimalTemperature = minimalTemp;
        newCriteria.maximumTemperature= maximumTemp;
        newCriteria.ifRained = ifRained;
        newCriteria.windSpeedLimit = windSpeed;

        await AsyncStorage.setItem("rideCriteria",JSON.stringify(newCriteria));//Save new criteria to local storage
    }

    return(
        <Container>
            <Header title="Today" />
            <View style={styles.contentlayout}>
                <H2 style={styles.pageTitle}>Set the Criteria for a Good Ride</H2>
                <View style={styles.inputContainer}>
                    <Text style={[styles.inputLabelStyle, styles.boldLabel]}>Minimum Temperature</Text>
                    <TextInput style={styles.textInputStyle} keyboardType="number-pad" onFocus={() => setMinimalTemp("")} value={String(minimalTemp)}  onChangeText={(minTemp)=> setMinimalTemp(minTemp)} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={[styles.inputLabelStyle, styles.boldLabel]}>Maximum Temperature</Text>
                    <TextInput style={styles.textInputStyle} keyboardType="number-pad" onFocus={() => setMaximumTemp("")}  value={String(maximumTemp)}  onChangeText={(maxTemp)=> setMaximumTemp(maxTemp)} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={[styles.inputLabelStyle, styles.boldLabel]}>Maximum Wind Speed</Text>
                    <TextInput style={styles.textInputStyle} keyboardType="number-pad" onFocus={() => setWindSpeed("")} value={String(windSpeed)}  onChangeText={(windSpd)=> setWindSpeed(windSpd)} />
                </View>
                <View style={styles.inputContainer}>
                    <ListItem >
                        <CheckBox checked={ifRained} onPress={() => setIfRained(true)}/>
                        <Text> I want to ride even if in wet conditions</Text>
                    </ListItem>
                </View>

                <View style={styles.buttonWhiteSpace}>
                    <Button nav="Home" navigation={navigation} text="Save" save={saveData}/>
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
    },
    pageTitle:{/*Style for the page title */
        textAlign:"center",
        fontWeight:"bold",
    },
    buttonWhiteSpace:{/*Whitespace around the save button */
        marginTop:10,
    }
});

export default SetCriteria;