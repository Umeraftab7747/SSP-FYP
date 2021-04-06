import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {w, h} from 'react-native-responsiveness';

export class Header extends Component {
  render() {
    return (
      <View style={styles.Containaer}>
        {/* LEFT */}
        <View style={styles.left}>{/* <Text>ICON</Text> */}</View>
        {/* LEFT */}
        {/* MIDDLE */}
        <View style={styles.middle}>
          <Text style={styles.middleText}>{this.props.text}</Text>
        </View>
        {/* MIDDLE */}
        {/* RIGHT */}
        <View style={styles.right}>{/* <Text>ICON</Text> */}</View>
        {/* RIGHT */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Containaer: {
    width: w('100%'),
    height: h('7%'),
    backgroundColor: '#8F94FB',
    flexDirection: 'row',
  },
  left: {
    width: '20%',
    height: '100%',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    width: '20%',
    height: '100%',
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    width: '60%',
    height: '100%',
    // backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: h('2.2%'),
  },
});
