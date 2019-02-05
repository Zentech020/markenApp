/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { TabNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';



import HomeScreen from './Screens/HomeScreen';
import MapScreen from './Screens/MapScreen';
import AttractionScreen from './Screens/AttractionScreen';
import ProfileScreen from './Screens/ProfileScreen';


const HomeTab = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Attraction: {
    screen: AttractionScreen
  }
});

const App = createBottomTabNavigator({
  Home: {
    screen: HomeTab,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={30} />
      ),
      activeTintColor: '#e91e63',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: 'blue',
      },
    },
  },
  Map: {
    screen: MapScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="map" size={30} />
      )
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="person" size={30} />
      ),
    },
  },

});

export default App;

