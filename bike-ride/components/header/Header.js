import React from 'react';
import { View, Text } from 'react-native';
import './head.css';

const Header = (props) => {
	return (
		<View className="header-container">
			<Text>{prop.title}</Text>
		</View>
	);
}

export default Header;