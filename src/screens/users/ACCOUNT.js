import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Header, Appbtn, AppInput} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {axiosInstance, baseUrl} from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class ACCOUNT extends Component {
  state = {
    Name: '',
    Email: '',
    Cnic: '',
    Phone: '+92',
    dataEmail: '',
    userDetails: '',
  };

  componentDidMount() {
    this.getData();
  }

  // GETING LOGIN DATA
  getData = () => {
    AsyncStorage.getItem('UserData').then(value => {
      const data = JSON.parse(value);
      if (data !== null) {
        this.setState({dataEmail: data});
        this.DETAILS(this.state.dataEmail);
      }
    });
  };

  // GETINS USER DETAILS
  DETAILS = value => {
    const params = {
      Email: value,
    };

    // ASY
    axiosInstance
      .post(baseUrl + '/users/User', params)
      .then(res => {
        this.setState({userDetails: res.data.user[0]}, () => {
          this.setState({
            Email: this.state.userDetails.Email,
            Name: this.state.userDetails.Name,
            Cnic: this.state.userDetails.Cnic,
            Phone: this.state.userDetails.Phone,
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
    // ASYC
  };

  render() {
    return (
      <View style={styles.container}>
        <Header text={'PROFILE'} />
        <View style={styles.EditBox}>
          <Text style={styles.text}>
            Email : {this.state.userDetails.Email}
          </Text>
          <Text style={styles.text}>Name : {this.state.userDetails.Name}</Text>
          <Text style={styles.text}>Cnic : {this.state.userDetails.Cnic}</Text>
          <Text style={styles.text}>
            Phone : {this.state.userDetails.Phone}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
  EditBox: {
    width: '100%',
    height: h('70%'),
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#8F94FB',
    fontSize: h('2.5%'),
    fontWeight: 'bold',
    marginTop: h('1%'),
  },
});
