import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Header} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class Dashbord extends Component {
  removeData = () => {
    AsyncStorage.removeItem('admin', () => {
      this.props.navigation.replace('UserLogin');
    });
  };
  render() {
    return (
      <View style={styles.Container}>
        <Header text={'ADMIN-DASHBOARD'} />
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Dispute');
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>DISPUTES</Text>
        </TouchableOpacity>
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('AllBooking');
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>ALL BOOKING</Text>
        </TouchableOpacity>
        {/* btn */}
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Category');
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>ADD EQUIPMENTS</Text>
        </TouchableOpacity>
        {/* btn */}

        {/* <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('UpdateEquipment');
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>UPDATE EQUIPMENT</Text>
        </TouchableOpacity> */}
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('AllServices');
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>ALL SERVICES</Text>
        </TouchableOpacity>
        {/* btn */}
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('AllUser');
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>ALL USERS</Text>
        </TouchableOpacity>
        {/* btn */}
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('AdminToolsHistory');
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>TOOLS HISTORY</Text>
        </TouchableOpacity>
        {/* btn */}

        <TouchableOpacity
          onPress={() => {
            this.removeData();
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>LOGOUT</Text>
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
    width: w('70%'),
    height: h('7%'),
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
