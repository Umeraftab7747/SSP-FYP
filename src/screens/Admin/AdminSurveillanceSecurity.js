import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Header} from '../../Components';
import {w, h} from 'react-native-responsiveness';

export class AdminSurveillanceSecurity extends Component {
  render() {
    return (
      <View style={styles.Container}>
        <Header text={'ADD EQUIPMENT'} />
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Equipment', {
              data: 'CCTV Desgin and Installtion',
            });
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>CCTV Design and Installion</Text>
        </TouchableOpacity>
        {/* btn */}
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Equipment', {
              data: 'Network Camera',
            });
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>Network Camera</Text>
        </TouchableOpacity>
        {/* btn */}
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Equipment', {
              data: 'Analog Camera',
            });
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>Analog Camera</Text>
        </TouchableOpacity>
        {/* btn */}
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Equipment', {
              data: 'Facial recognization Camera',
            });
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>Facial Recognization</Text>
        </TouchableOpacity>
        {/* btn */}
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Equipment', {
              data: 'Number Plate Camera',
            });
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>Number plate Camera</Text>
        </TouchableOpacity>
        {/* btn */}
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Equipment', {
              data: 'Remote Acess System',
            });
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>Remote Acess System</Text>
        </TouchableOpacity>
        {/* btn */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
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
