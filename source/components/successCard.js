import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Switch
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome'
const Dimensions = require('Dimensions');


const {height, width} = Dimensions.get('window');



const window = Dimensions.get('window');

export default  class SuccessCard extends Component {
  constructor(props) {
  super(props);
  this.state = {
    modalVisible: false,
    falseSwitchIsOn : false,
    username : '',
    password : ''
  };
}


  render() {
    const {modalVisible,navigation} = this.props
    const {falseSwitchIsOn,showError} = this.state
    return (


      <View style={{ flex:1, backgroundColor: 'transparent' }}>


        <ScrollView  contentContainerStyle={{flexGrow:1}}>

          <View style = {styles.headingComtainer}>
            <Text style = {styles.headingStyle}>PARKED AT</Text>
          </View>
          <View style = {styles.logoContainer}>
            <Text style = {{fontSize:50}}>
              {this.props.navigation.state.params.x}
            </Text>
          </View>
          <View style = {styles.signInHeadingComtainer}>


          <View style = {{marginBottom:20}}>
          <Button

               containerStyle={{ height:40,width:260, overflow:'hidden', backgroundColor: '#e6ac00',justifyContent:'center'}}
               style={{fontSize: 18, color: 'black' ,fontFamily:'KaushanScript-Regular',alignItems:'center',justifyContent:'center'}}
               styleDisabled={{color: 'red'}} >
               Release it
           </Button>
           </View>
           <View>
            <Button

                 containerStyle={{ height:40,width:260, overflow:'hidden', backgroundColor: '#e6ac00',justifyContent:'center'}}
                 style={{fontSize: 18, color: 'black' ,fontFamily:'KaushanScript-Regular',alignItems:'center',justifyContent:'center'}}
                 styleDisabled={{color: 'red'}} >
                 Change it
             </Button>
             </View>
             {showError?<View>
             <Text style={{padding:10,fontSize:17,color:'red'}}>

                Invalid username or password

             </Text>
             </View>:null}
             </View>

             <View style = {styles.footerComtainer}>

             </View>
            </ScrollView>
           </View>






    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer : {

    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,

  },
  mainViewContainer : {
    flex: 1,
    width: null,
    height: null,
    flexDirection : 'column',

    justifyContent: 'center',
    alignItems: 'center',
  },
  headingComtainer : {
    flex:2,
    flexDirection : 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingStyle : {
    padding:3,
    fontSize:30,
    color:'black',
    fontFamily:'Verdana'

  },
  logoContainer : {
    flex : 2,
    flexDirection:'row',
    justifyContent:'center',
    alignItems : 'center'
  },
  signInHeadingComtainer : {
    flex:3,
    flexDirection : 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInStyle : {
    padding:3,
    fontSize:20,
    color:'black',
  fontFamily:'KaushanScript-Regular'

  },
  footerComtainer : {
    flex:2,
    flexDirection : 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }


});
