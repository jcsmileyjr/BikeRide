import React, { useState, useEffect} from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Text, ListItem, CheckBox, H2, Toast} from 'native-base';// UI library for styling and complex components missing from the React Native

import Header from '../components/Header.js';
import Button from '../components/Button.js';
import CustomTextInput from '../components/TextInput.js';

// Screen shown when user click the cog icon in the footer. User can edit the criteria for good days while bike riding
const SetCriteria = ({navigation}) => {
    const [minimalTemp, setMinimalTemp] = useState(0);
    const [maximumTemp, setMaximumTemp] = useState(0);
    const [windSpeed, setWindSpeed] = useState(0);
    const [ifRained, setIfRained] = useState(false);

    useEffect(() => { this.getOldCriteria(); }, []);// This code runs before the screen renders

    // Get the criteria saved to local storage to be displayed to the user
    getOldCriteria = async () => {
        const savedCritera = await AsyncStorage.getItem('rideCriteria');//get saved ride criteria from local storage 
        const oldCriteria =JSON.parse(savedCritera);
        setMinimalTemp(oldCriteria.minimalTemperature);
        setMaximumTemp(oldCriteria.maximumTemperature);
        setWindSpeed(oldCriteria.windSpeedLimit);
        setIfRained(oldCriteria.ifRained);
    }

    // When user click the button, creates a new riding criteria object and save to local storage
    saveData = async () => {
        let newCriteria = {};
        newCriteria.minimalTemperature = minimalTemp;
        newCriteria.maximumTemperature= maximumTemp;
        newCriteria.ifRained = ifRained;
        newCriteria.windSpeedLimit = windSpeed;

        await AsyncStorage.setItem("rideCriteria",JSON.stringify(newCriteria));//Save new criteria to local storage
        Toast.show({text:"New Riding Criteria has been implemented", position:"bottom", type:"success", duration:5000});
    }

    return(
        <Container>
            <Header title="Today" />
            <View style={styles.contentlayout}>
                <H2 style={styles.pageTitle}>Set the Criteria for a Good Ride</H2>

                <CustomTextInput labelText="Minimum Temperature" state={minimalTemp} updateState={setMinimalTemp} />
                <CustomTextInput labelText="Maximum Temperature" state={maximumTemp} updateState={setMaximumTemp} />
                <CustomTextInput labelText="Maximum Wind Speed" state={windSpeed} updateState={setWindSpeed} />
                
                <View style={styles.inputContainer}>
                    <ListItem onPress={() => setIfRained(!ifRained)}>
                        <CheckBox checked={ifRained} onPress={() => setIfRained(!ifRained)}/>
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
    contentlayout: {// Take up all available space between the Header and Footer
		display: "flex",
        flex: 1,
        alignContent:"center",
        justifyContent:"center",
	},
    inputContainer:{
        display:"flex",// Center the content
        justifyContent:"center",// Center the content
        alignItems:"center",// Center the content
        marginTop:20,
    },
    pageTitle:{
        textAlign:"center",
        fontWeight:"bold",
        paddingBottom:50,
    },
    buttonWhiteSpace:{
        marginTop:10,
    }
});

export default SetCriteria;