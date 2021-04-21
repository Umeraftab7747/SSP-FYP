import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Header} from '../../Components';
import {w, h} from 'react-native-responsiveness';

export class Setting extends Component {
  render() {
    return (
      <>
        <Header text={'SETTING'} />
        <View style={styles.Container}>
          {/* btn */}
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Disputes');
            }}
            style={styles.Btn}>
            <Text style={styles.BtnText}>DISPUTE</Text>
          </TouchableOpacity>
          {/* btn */}
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('BookingHistory');
            }}
            style={styles.Btn}>
            <Text style={styles.BtnText}>BOOKING HISTORY</Text>
          </TouchableOpacity>
          {/* btn */}
          {/* btn */}
          <TouchableOpacity style={styles.Btn}>
            <Text style={styles.BtnText}>LOGOUT</Text>
          </TouchableOpacity>
          {/* btn */}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
