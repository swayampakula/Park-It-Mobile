import React, { Component } from 'react';
import {
  Easing,
  TouchableOpacity,
  Animated,
  Dimensions,
  FlatList,
  Text,
  View,
  StyleSheet,
  Alert
} from 'react-native';
import Seatmap from 'react-seatmap';
import Button from 'react-native-button';
import { NavigationActions } from 'react-navigation';


const { width, height } = Dimensions.get('window');

const ROWS = 5;
const COLS = 5;
const TIMING = 600;
const TEXT_HEIGHT = 20;
let seats = [];
let seatsAnimation = [];
let count = 0;

for (var i = 0; i < ROWS + COLS - 1; i++) {
  seatsAnimation.push(i);
}

Array(ROWS * COLS).join(' ').split(' ').map((_, i) => {
  const currentIndex = i % COLS + Math.floor(i / COLS) % ROWS;
  const currentItem = {
    label: i + 1 < 10 ? '0' + (i + 1) : i + 1,
    s: currentIndex,
    key: i,
    animated: new Animated.Value(1)
  };

  seats.push(currentItem);
});

export default class SeatBooking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      finished: false,
      selectedItems: [],
      selectedValue:0,
    };

    this.selectionAnimation = new Animated.Value(0);

    this.animatedValue = [];
    seatsAnimation.forEach(value => {
      this.animatedValue[value] = new Animated.Value(0);
    });
  }

  handleBooking = (navigate, x) => {
    console.log('entered handleLogin')
    console.log('entered handleLogin')
    console.log(count);
    const navigateAction = NavigationActions.navigate({
             routeName: 'SuccessCard',
             params: {'nameProp':'Aqib','phoneProp':'9108462335',"emailProp":"aqibshaik298@gmail.com","x":x},
             //action: NavigationActions.navigate({ routeName: 'SubProfileRoute'})
           })
         navigate.dispatch(navigateAction)
  }

  animate = () => {
    const animations = seatsAnimation.map(item => {
      return Animated.timing(this.animatedValue[item], {
        toValue: this.state.finished ? 0 : 1,
        duration: TIMING
      });
    });
    Animated.sequence([
      Animated.stagger(TIMING * 0.15, animations)
    ]).start(() => {
      this.setState({
        finished: !this.state.finished,
        selectedItems: []
      });

      // this.selectionAnimation.setValue(0);
      Animated.timing(this.selectionAnimation, {
        toValue: 0,
        duration: 1000,
        easing: Easing.elastic(1.3)
      }).start();
    });
  };

  renderItem = ({ item }) => {
    // console.log('items',item)
    const i = item.key;
    const scale = this.animatedValue[item.s].interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0, 1]
    });
    const { selectedItems } = this.state;
    // console.log(selectedItems,"---selectedItems--");



    const isSelected = selectedItems.includes(item.key);
    const itemPressScale = item.animated.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0, 1]
    });

    return (
      // {console.log("--**_**",this.state.selectedItems)}
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          const selected = isSelected
            ? selectedItems.filter(i => i !== item.key)
            : [...selectedItems, item.key];

          item.animated.setValue(0);
          this.setState(
            {
              selectedItems: selected
            },

          );
        }}
        >
        <Animated.View
          style={{
            transform: [
              {
                scale: item.animated
              }
            ]
          }}>
          <Animated.View
            style={[
              {
                backgroundColor: isSelected ? '#8c8c8c' : '#4d4d4d'
              },
              styles.item,
              {
                transform: [
                  {
                    scale
                  }
                ]
              }
            ]}>
            <Animated.Text style={[styles.itemText]}>
              {item.label}
            </Animated.Text>
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  listClick(x, y, z) {
    // console.log(x);
  }

  render() {
    const {navigation} = this.props
    let x = this.state.selectedItems[this.state.selectedItems.length - 1] + 1;
    console.log(x);
    return (
      <View style={styles.container}>

        <FlatList
          numColumns={5}
          data={seats}
          keyExtractor={this.listClick.bind(this)}
          style={{ flex: 0.8 }}
          renderItem={this.renderItem}
          extraData={count}
          onPress={this.listClick.bind(this, 1)}
        />

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            flex: 0.2
          }}>
          <View
            style={{
              height: TEXT_HEIGHT,
              overflow: 'hidden',
              backgroundColor: 'transparent'
            }}>
            <Animated.View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                transform: [
                  {
                    translateY: this.selectionAnimation
                  }
                ]
              }}>
              {Array(ROWS * COLS + 1).join(' ').split(' ').map((_, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      height: TEXT_HEIGHT,
                      width: TEXT_HEIGHT * 1.4,
                      marginRight: 4,
                      alignItems: 'flex-end',
                      justifyContent: 'center'
                    }}>
                    <Text style={[styles.text]}>
                      {x}
                    </Text>
                  </View>
                );
              })}
            </Animated.View>
          </View>
          <Text style={styles.text}>
            locations Selected
          </Text>

        </View>
        <Button
              onPress={()=>this.handleBooking(navigation,x)}
             containerStyle={{ height:40,width:260, backgroundColor: '#e6ac00',justifyContent:'center',marginBottom:10}}
             style={{fontSize: 18, color: 'black' ,fontFamily:'KaushanScript-Regular',alignItems:'center',justifyContent:'center'}}
             styleDisabled={{color: 'red'}} >
             BOOK!
         </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#ecf0f1'
  },
  item: {
    width: width / COLS,
    height: width / COLS,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemText: {
    color: 'white',
    fontWeight: '700'
  },
  text: { fontSize: 15, fontWeight: '500' }
});
