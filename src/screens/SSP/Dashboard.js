import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Header} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class Dashboard extends Component {
  removeData = () => {
    AsyncStorage.removeItem('ServiceProviderData', () => {
      this.props.navigation.replace('SspLogin');
    });
  };
  render() {
    return (
      <View style={styles.Container}>
        <Header text={'Dashboard'} />
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Approve');
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>APPROVE SERVICES</Text>
        </TouchableOpacity>
        {/* btn */}
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Rejected');
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>REJECTED SERVICES</Text>
        </TouchableOpacity>
        {/* btn */}
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('SSPBooking');
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>BOOKING</Text>
        </TouchableOpacity>
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.removeData();
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>LOGOUT</Text>
        </TouchableOpacity>
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
