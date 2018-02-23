import React, { Component } from 'react';
import { View,Button, Platform, ScrollView, StyleSheet,AppRegistry, KeyboardAvoidingView,Text,TouchableOpacity,DrawerLayoutAndroid, Image } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import ImageAndText from './ImageAndText'
import Icon from 'react-native-vector-icons/FontAwesome'
import AllComponents from './AllComponents'
import Home from './home'
import Profile from './profile'
import Publish from './publish'
import Notifications from './notifications'
import ListOfWriters from './listOfWriters'
const Dimensions = require('Dimensions');

const window = Dimensions.get('window');
import { NavigationActions } from 'react-navigation';

export default class HomePage extends Component {
  constructor(props) {
  super(props);
  this.state = {
    clickSignIn:true,
    clickRegister:true,
    flex1:2,
    flex2:5,
    flexSignIn : 1,
    flexRegister : 1,
    flex:3,
    tabName : 'home'
  };

  }



  render(){
    return(
      <View>hi</View>
    )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    flexDirection : 'row',
  },
  header : {
    flex : 1,
    width : Dimensions.get('window').width,
    flexDirection : 'row',
  },
  body : {
    flex : 7
  },
  slider :{
    flex: 2,
    backgroundColor: '#fff'
  }
});
