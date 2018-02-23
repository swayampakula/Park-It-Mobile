/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
  import { StackNavigator } from 'react-navigation';
import SeatBooking from './source/components/seatBooking'
import SignInModal from './source/components/signInModal'
import ChooseOptions from './source/components/chooseOptions'
import SuccessCard from './source/components/successCard'
//import HomePage from './source/components/HomePage'


console.disableYellowBox = true;



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const App = StackNavigator({

  SeatBooking: { screen: SeatBooking },
  SignInModal : { screen : SignInModal},
  ChooseOptions : { screen : ChooseOptions},
  SuccessCard : { screen : SuccessCard}

},{
  initialRouteName: 'SignInModal',
  headerMode: 'none',
});

export default App


const styles = StyleSheet.create({

});
