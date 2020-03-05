import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from "./Navigation/HomePage.js"
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MovieScreen from './Navigation/MovieScreen.js'
import SearchForm from './Components/SearchForm.js';

// const AppNavigator = createSwitchNavigator({
//   "Home": HomePage
// })

// const AppNavigator = createStackNavigator({
//   "Home Page": {
//     screen: HomePage
//   },
//   "Movie Page":{
//     screen: MovieScreen
//   }

// })

const AppNavigator = createStackNavigator(
  {
    movie: MovieScreen,
    search: SearchForm,
  },
  {
    initialRouteName: "search",
    
  }
)

const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
