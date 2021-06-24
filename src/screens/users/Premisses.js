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

export class Premisses extends Component {
  render() {
    return (
      <View style={styles.Container}>
        <Header text={'Category'} />
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('DashboardDetails', {
              data: 'Mall Security',
            });
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>Mall Security</Text>
        </TouchableOpacity>
        {/* btn */}
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('DashboardDetails', {
              data: 'Office/Factory Security',
            });
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>Office/Factory Security</Text>
        </TouchableOpacity>
        {/* btn */}
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('DashboardDetails', {
              data: 'Housing Security',
            });
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>Housing Society Security</Text>
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
