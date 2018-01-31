import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Main from './component/Main'

const FirstApp = StackNavigator({
	Main: {
		screen: Main,
	},
})

export default FirstApp;
