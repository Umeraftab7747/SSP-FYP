import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import {Header, Appbtn} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {Icon} from 'react-native-elements';
import {axiosInstance, baseUrl} from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
export class StaticGuard extends Component {
  render() {
    return (
      <View style={styles.Container}>
        <Header text={'Category'} />
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('DashboardDetails', {
              data: 'Armed Guard',
            });
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>Armed Guard</Text>
        </TouchableOpacity>
        {/* btn */}
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('DashboardDetails', {
              data: 'UnArmed Guard',
            });
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>UnArmed Guard</Text>
        </TouchableOpacity>
        {/* btn */}
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('DashboardDetails', {
              data: 'Body Guard',
            });
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>BodyGuard</Text>
        </TouchableOpacity>
        {/* btn */}
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('DashboardDetails', {
              data: 'Event Security',
            });
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>Celebrity Protection</Text>
        </TouchableOpacity>
        {/* btn */}
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('DashboardDetails', {
              data: 'Celebrity Protection',
            });
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>Event Guard</Text>
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
