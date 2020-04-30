import React, { useState, useEffect } from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Text, Icon, H1 } from 'native-base';

import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

const SetCriteria = () => {
    return(
        <Container>
            <Header title="Today" />
            <View>
                <Text>Criteria</Text>
            </View>
            <Footer />
        </Container>
    );
}

export default SetCriteria;