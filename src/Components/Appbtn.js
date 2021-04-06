import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {w, h} from 'react-native-responsiveness';

export class Appbtn extends Component {
  render() {
    return (
      <TouchableOpacity {...this.props} style={styles.Container}>
        <Text style={styles.Text}> {this.props.text} </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    width: w('60%'),
    height: h('6%'),
    backgroundColor: '#8F94FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: h('2%'),
    borderRadius: h('1%'),
  },
  Text: {
    color: 'white',
    fontSize: h('2%'),
    fontWeight: 'bold',
  },
});
