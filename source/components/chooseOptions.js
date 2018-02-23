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
import { Dropdown } from 'react-native-material-dropdown';
import Axios from 'axios'


const window = Dimensions.get('window');

export default  class ChooseOptions extends Component {
  constructor(props) {
  super(props);
  this.state = {
    modalVisible: false,
    falseSwitchIsOn : false,
    firstname : '',
    lastname : '',
    phone : '',
    email : '',
    password : '',
    asPublisher : true,
    asWriter : false,
    city : [{value:""}],
    office:[{value:""}],
    tower:[{value:""}],
    checkBookingCount : false
  };
}

async componentWillMount(){
  let bookingCount = await AsyncStorage.getItem("BookingCount")
  if(bookingCount==="0"){
    this.setState({checkBookingCount:false})
  }else if(bookingCount === "1"){
    this.setState({checkBookingCount:true})
  }

}


componentDidMount=()=>{
  Axios({
    method : 'GET',
    url : 'http://192.168.1.103:8000/lots',
  }).then(function(response){
    console.log(response,'response')
      console.log(response.data)
      this.setState({city:[{value:response.data}]})
  }.bind(this)).catch(function(err){
    console.log(err,"errr")
        this.setState({showError:true})
  }.bind(this))


}
 handleFirstName = (value) => {
   this.setState({firstname:value})
 }

 handleLastName = (value) => {
   this.setState({lastname : value})
 }

 handlePhone = (value) => {
   this.setState({phone:value})
 }

 handleEmail = (value) => {
   this.setState({email:value})
 }

 handlePassword = (value) => {
   this.setState({password:value})
 }

handleCityChange = (value)=>{
  console.log(value);
  Axios({
    method : 'GET',
    url : 'http://192.168.1.103:8000/lots/'+value,
  }).then(function(response){
    console.log(response,'response')
      console.log(response.data)

      this.setState({office:response.data.map((val)=>({value:val}))})
      this.setState({
        citySelected: value
      })
  }.bind(this)).catch(function(err){
    console.log(err,"errr")
        this.setState({showError:true})
  }.bind(this))
}

handleOfficeChange = (value)=>{
  console.log(value);
  Axios({
    method : 'GET',
    url : 'http://192.168.1.103:8000/lots/'+ this.state.citySelected +'/'+value,
  }).then(function(response){
    console.log(response,'response')
      console.log(response.data)

      this.setState({tower:response.data.map((val)=>({value:val}))})
  }.bind(this)).catch(function(err){
    console.log(err,"errr")
        this.setState({showError:true})
  }.bind(this))
}


 handleRegister = (navigate) => {

       console.log('entered handleLogin')
       console.log('entered handleLogin')
       const navigateAction = NavigationActions.navigate({
                routeName: 'SeatBooking',
                params: {'nameProp':'Aqib','phoneProp':'9108462335',"emailProp":"aqibshaik298@gmail.com"},
                //action: NavigationActions.navigate({ routeName: 'SubProfileRoute'})
              })
            navigate.dispatch(navigateAction)
       // Axios({
       //   method : 'POST',
       //   url : 'http://192.168.1.104:3000/register',
       //   data : {
       //     firstname : this.state.firstname,
       //     lastname : this.state.lastname,
       //     phone : this.state.phone,
       //     email : this.state.email,
       //     password : this.state.password,
       //     asPublisher : !this.state.falseSwitchIsOn,
       //     asWriter : this.state.falseSwitchIsOn
       //   }
       // }).then(function(response){
       //     console.log(response)
       // })
     }


  render() {
    const {modalVisible,navigation} = this.props
    const {falseSwitchIsOn,city,tower,checkBookingCount,office} = this.state
    let data = [{
      value: 'two',
    }, {
      value: 'four',
    }];
    return (



        <View  style={{ flex:1, backgroundColor: 'transparent' }}>


          <ScrollView  contentContainerStyle={{flexGrow:1}}>
            <View style = {styles.headingComtainer}>
              <Text style = {styles.headingStyle}>Where do you park!</Text>
            </View>
            <View style = {styles.signInHeadingComtainer}>



            <Dropdown
              label='City'
              data={city}
              containerStyle={{height: 60,color:'black',fontFamily:'KaushanScript-Regular',fontSize:20 ,width:260,backgroundColor:'rgba(0,0,0,0)'}}
              onChangeText = {this.handleCityChange.bind(this)}
            />
            <Dropdown
              label='Tower'
              data={office}
              onChangeText = {this.handleOfficeChange.bind(this)}
              containerStyle={{height: 60,color:'black',fontFamily:'KaushanScript-Regular',fontSize:20 ,width:260,backgroundColor:'rgba(0,0,0,0)'}}
            />
            <Dropdown
              label='Office'
              data={tower}
              containerStyle={{height: 60,color:'black',fontFamily:'KaushanScript-Regular',fontSize:20 ,width:260,backgroundColor:'rgba(0,0,0,0)'}}
            />
            <Dropdown
              label='Vehicle Type'
              data={data}
              containerStyle={{height: 60,color:'black',fontFamily:'KaushanScript-Regular',fontSize:20 ,width:260,backgroundColor:'rgba(0,0,0,0)',marginBottom:30}}
            />
            <TextInput
              style={{color:'black',fontFamily:'KaushanScript-Regular',fontSize:15 ,width:260,backgroundColor:'rgba(0,0,0,0)',marginBottom:50,borderRadius:20,underlineColorAndroid :'rgba(0,0,0,0)'}}
              placeholder ="Vehicle Number"


            />
            {checkBookingCount?<View><View style = {{marginBottom:20}}>
            <Button
                onPress = {()=>this.handleRegister(navigation)}
                 containerStyle={{ height:40,width:260, overflow:'hidden', backgroundColor: '#e6ac00',justifyContent:'center'}}
                 style={{fontSize: 18, color: 'black' ,fontFamily : 'Verdana',alignItems:'center',justifyContent:'center'}}
                 styleDisabled={{color: 'red'}} >
                 Change
             </Button>
             </View>
             <View style = {{marginBottom:20}}>
              <Button
                  onPress = {()=>this.handleRegister(navigation)}
                   containerStyle={{ height:40,width:260, overflow:'hidden', backgroundColor: '#e6ac00',justifyContent:'center'}}
                   style={{fontSize: 18, color: 'black' ,fontFamily : 'Verdana',alignItems:'center',justifyContent:'center'}}
                   styleDisabled={{color: 'red'}} >
                  Release
               </Button>
               </View></View>:<View style = {{marginBottom:20}}>
                <Button
                    onPress = {()=>this.handleRegister(navigation)}
                     containerStyle={{ height:40,width:260, overflow:'hidden', backgroundColor: '#e6ac00',justifyContent:'center'}}
                     style={{fontSize: 18, color: 'black' ,fontFamily : 'Verdana',alignItems:'center',justifyContent:'center'}}
                     styleDisabled={{color: 'red'}} >
                    Choose slot
                 </Button>
                 </View>}


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
    flex:1,
    flexDirection : 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingStyle : {
    padding:3,
    fontSize:30,
    color:'black',
    fontFamily:'Verdana',
    paddingTop:20

  },
  signInHeadingComtainer : {
    flex:5,
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
    flex:1,
    flexDirection : 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }


});
