import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Header} from '../../Components';
import {w, h} from 'react-native-responsiveness';

export class Dashbord extends Component {
  render() {
    return (
      <View style={styles.Container}>
        <Header text={'DASHBOARD'} />
        {/* btn */}
        <TouchableOpacity style={styles.Btn}>
          <Text style={styles.BtnText}>DISPUTES</Text>
        </TouchableOpacity>
        {/* btn */}
        <TouchableOpacity style={styles.Btn}>
          <Text style={styles.BtnText}>BOOKING</Text>
        </TouchableOpacity>
        {/* btn */}
        {/* btn */}
        <TouchableOpacity style={styles.Btn}>
          <Text style={styles.BtnText}>ADD EQUIPMENTS</Text>
        </TouchableOpacity>
        {/* btn */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
  },
  Btn: {
    width: w('90%'),
    height: h('10%'),
    backgroundColor: '#8F94FB',
    marginTop: h('2%'),
    borderRadius: h('1%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  BtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: h('2.5%'),
  },
});
