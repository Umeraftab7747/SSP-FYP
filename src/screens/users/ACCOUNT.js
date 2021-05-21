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
          {/* detial palet */}
          <View style={styles.GridView}>
            <View style={styles.leftGridView}>
              <Text style={styles.Text}> Email: </Text>
            </View>
            <View style={styles.RightGridView}>
              <Text style={styles.Text}> {this.state.userDetails.Email}</Text>
            </View>
          </View>
          {/* detial palet */}
          {/* detial palet */}
          <View style={styles.GridView}>
            <View style={styles.leftGridView}>
              <Text style={styles.Text}> Name: </Text>
            </View>
            <View style={styles.RightGridView}>
              <Text style={styles.Text}> {this.state.userDetails.Name}</Text>
            </View>
          </View>
          {/* detial palet */}
          {/* detial palet */}
          <View style={styles.GridView}>
            <View style={styles.leftGridView}>
              <Text style={styles.Text}> Cnic: </Text>
            </View>
            <View style={styles.RightGridView}>
              <Text style={styles.Text}> {this.state.userDetails.Cnic}</Text>
            </View>
          </View>
          {/* detial palet */}
          {/* detial palet */}
          <View style={styles.GridView}>
            <View style={styles.leftGridView}>
              <Text style={styles.Text}> Phone: </Text>
            </View>
            <View style={styles.RightGridView}>
              <Text style={styles.Text}> {this.state.userDetails.Phone}</Text>
            </View>
          </View>
          {/* detial palet */}
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
  GridView: {
    borderColor: '#8F94FB',
    borderWidth: w('1%'),
    width: w('90%'),
    height: h('7%'),
    flexDirection: 'row',
    marginTop: h('0.5%'),
  },
  leftGridView: {
    // backgroundColor: 'yellow',
    width: '30%',
    height: '100%',
    borderRightColor: '#8F94FB',
    borderRightWidth: w('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  RightGridView: {
    // backgroundColor: 'green',
    width: '70%',
    height: '100%',
    justifyContent: 'center',
  },
  Text: {
    color: '#8F94FB',
    fontWeight: 'bold',
    fontSize: h('2.5%'),
  },
});
