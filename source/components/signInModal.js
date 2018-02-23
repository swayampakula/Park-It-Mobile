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
  Switch,
  AsyncStorage
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome'
const Dimensions = require('Dimensions');
import Axios from 'axios'

const {height, width} = Dimensions.get('window');



const window = Dimensions.get('window');

export default  class SignInModal extends Component {
  constructor(props) {
  super(props);
  this.state = {
    modalVisible: false,
    falseSwitchIsOn : false,
    username : '',
    password : ''
  };
}
  componentDidMount() {

       // Print component dimensions to console

   }



   handleUserName =(value) =>{
     console.log(value)
     this.setState({username:value})
   }


    handlePassword = (value) =>{
      console.log(value)
      this.setState({password:value})
      console.log(this.state.password);
    }


    handleLogin = (navigate) => {
      console.log('entered handleLogin')
      // const navigateAction = NavigationActions.navigate({
      //          routeName: 'ChooseOptions',
      //          params: {'nameProp':'Aqib','phoneProp':'9108462335',"emailProp":"aqibshaik298@gmail.com"},
      //          //action: NavigationActions.navigate({ routeName: 'SubProfileRoute'})
      //        })
      //      navigate.dispatch(navigateAction)


      Axios({
        method : 'POST',
        url : 'http://192.168.1.103:8000/employee/login',
        data : {
          empID : this.state.username,
          password : this.state.password

        }
      }).then(function(response){
          console.log(response)
          let respData = response.data
            AsyncStorage.setItem('BookingCount',respData.Booking_Count)
            AsyncStorage.setItem('empEmail',respData.Employee_Email)
            AsyncStorage.setItem('empID',respData.Employee_ID)
            AsyncStorage.setItem('empName',respData.Employee_Name)
            AsyncStorage.setItem('Role',respData.Role)
            AsyncStorage.setItem('Slot_Info',respData.Slot_Info)
            AsyncStorage.setItem('Vehicle_Info',respData.Vehicle_Info)

            this.setState({showError:false})
            const navigateAction = NavigationActions.navigate({
               routeName: 'ChooseOptions',
              // params: {'empid':this.state.username},
               //action: NavigationActions.navigate({ routeName: 'SubProfileRoute'})
             })
           navigate.dispatch(navigateAction)

      }.bind(this)).catch(function(err){
        console.log(err)
            this.setState({showError:true})
      }.bind(this))
        }


  render() {
    const {modalVisible,navigation} = this.props
    const {falseSwitchIsOn,showError} = this.state
    return (


      <View style={{ flex:1, backgroundColor: 'transparent' }}>


        <ScrollView  contentContainerStyle={{flexGrow:1}}>

          <View style = {styles.headingComtainer}>
            <Text style = {styles.headingStyle}>PARK IT</Text>
          </View>
          <View style = {styles.logoContainer}>
            <Image source = {require('./../images/logo.webp')}/>
          </View>
          <View style = {styles.signInHeadingComtainer}>

            <Text style={styles.signInStyle}>Sign In as {falseSwitchIsOn?'admin':'user'}</Text>
            <Switch
          onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
          style={{marginBottom: 10}}
          value={this.state.falseSwitchIsOn} />

            <TextInput
              style={{height: 60,color:'black',fontFamily:'KaushanScript-Regular',fontSize:20 ,width:260,backgroundColor:'rgba(0,0,0,0)'}}
              placeholder =" Username"
              onChangeText={this.handleUserName}


            />
            <TextInput
              style={{height: 60,color:'black',fontFamily:'KaushanScript-Regular',fontSize:20 ,width:260,backgroundColor:'rgba(0,0,0,0)'}}
              placeholder =" Password"
              onChangeText={this.handlePassword}
              secureTextEntry={true}

            />
            <Button
                  onPress={()=>this.handleLogin(navigation)}
                 containerStyle={{ height:40,width:260, overflow:'hidden', backgroundColor: '#e6ac00',justifyContent:'center'}}
                 style={{fontSize: 18, color: 'black' ,fontFamily:'KaushanScript-Regular',alignItems:'center',justifyContent:'center'}}
                 styleDisabled={{color: 'red'}} >
                 There you go!
             </Button>
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
