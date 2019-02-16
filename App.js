import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { TabNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from "redux-thunk";
import Icon from 'react-native-vector-icons/MaterialIcons';

import rootReducer from './reducer';

const store = createStore(rootReducer, applyMiddleware(thunk))


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

const Navigation = createBottomTabNavigator({
  Home: {
    screen: HomeTab,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={30} color={tintColor} />
      ),
      activeTintColor: '#e91e63',
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
        <Icon name="map" size={30} color={tintColor} />
      )
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="person" size={30} color={tintColor} />
      ),
    },
  },

});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    )
  }
}

export default App;

