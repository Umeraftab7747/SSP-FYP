/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {w, h} from 'react-native-responsiveness';
import {AppInput, Appbtn} from '../../Components';
import {axiosInstance, baseUrl} from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';

export class SspLogin extends Component {
  state = {
    Email: '',
    Password: '',
  };

  componentDidMount() {
    this.UserLogin();
  }

  UserLogin = () => {
    AsyncStorage.getItem('ServiceProviderData').then(value => {
      const data = JSON.parse(value);
      if (data !== null) {
        this.props.navigation.replace('ServiceproviderBottomtab');
      }
    });
  };

  validate = () => {
    const {Email, Password} = this.state;
    if (Email !== '') {
      if (Password !== '') {
        const params = {
          email: Email,
          password: Password,
        };
        // ASYC
        axiosInstance
          .post(baseUrl + '/service-provider/signin', params)
          .then(res => {
            const userData = res.data;
            console.log(userData);
            if (userData.sucess === true) {
              alert('LOGIN SUCESSFULL');

              AsyncStorage.setItem(
                'ServiceProviderData',
                JSON.stringify(Email),
                () => {
                  this.props.navigation.replace('ServiceproviderBottomtab');
                },
              );
            } else if (userData.status === 500) {
              alert('Check Email or Password Again');
            }
          })
          .catch(error => {
            alert('Check Email or Password Again');
            console.log(error);
          });
        // ASYC
      } else {
        alert('Password Field is required');
      }
    } else {
      alert('Email Field is Required');
    }
  };
  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          {/* Image Container */}
          <ImageBackground
            source={require('../../assets/bglogo.png')}
            style={styles.TopContainer}>
            <Image
              style={styles.ImageContainer}
              source={require('../../assets/log.png')}
            />
            <Text style={styles.LogoText}>Security Services Application</Text>
          </ImageBackground>
          {/* Image Container */}

          {/* Lower Container */}
          <View style={styles.LowerContainer}></View>
          {/* Lower Container */}

          {/* LoginContainer */}
          <View style={styles.LoginContainer}>
            <Text style={styles.LoginText}>SERVICE PROVIDER LOGIN</Text>
            <View style={styles.AppinputContainer}>
              <AppInput
                onChangeText={Email => this.setState({Email})}
                IconName={'mail-outline'}
                Placeholder={'Enter Email'}
              />
              <AppInput
                onChangeText={Password => this.setState({Password})}
                IconName={'lock-closed-outline'}
                Placeholder={'Enter Password'}
                secureTextEntry
              />
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('SspPassowrd');
                }}>
                <Text style={styles.ForgotPassText}>Forgot Password ?</Text>
              </TouchableOpacity>
            </View>
            {/* BUTTON */}
            <View style={styles.ButtonContainer}>
              <Appbtn
                onPress={() => {
                  this.validate();
                }}
                text={'LOGIN'}
              />
            </View>
            {/* BUTTON */}
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('SspSignup');
              }}>
              <Text
                style={[
                  styles.ForgotPassText,
                  {
                    marginTop: h('5%'),
                  },
                ]}>
                Dont Have a Account ? Signup !
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('UserLogin');
              }}>
              <Text
                style={[
                  styles.ForgotPassText,
                  {
                    marginTop: h('2%'),
                  },
                ]}>
                Login As User !
              </Text>
            </TouchableOpacity>
          </View>
          {/* LoginContainer */}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  TopContainer: {
    width: w('100%'),
    height: h('35%'),
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: h('2%'),
  },
  ImageContainer: {
    resizeMode: 'contain',
    width: w('20%'),
    height: h('12%'),
    // backgroundColor: 'red',
  },
  LogoText: {
    color: 'white',
    fontSize: h('3%'),
    fontWeight: 'bold',
    marginTop: h('2%'),
  },
  LowerContainer: {
    width: w('100%'),
    height: h('100%'),
    // backgroundColor: 'red',
  },
  LoginContainer: {
    backgroundColor: 'white',
    width: w('90%'),
    height: h('60%'),

    borderRadius: h('2%'),
    elevation: h('1%'),
    alignItems: 'center',
    paddingTop: h('2%'),
    marginTop: h('25%'),
    position: 'absolute',
    zIndex: 1,
  },
  LoginText: {
    color: '#8F94FB',
    fontSize: h('3%'),
    fontWeight: 'bold',
  },
  AppinputContainer: {
    // backgroundColor: 'red',
    width: w('80%'),
    height: h('28%'),
    paddingTop: h('5%'),
  },
  ForgotPassText: {
    color: '#8F94FB',
    fontWeight: 'bold',
    fontSize: h('2%'),
    marginLeft: h('0.8%'),
    marginTop: h('2%'),
  },
  ButtonContainer: {
    // backgroundColor: 'red',
    width: w('80%'),
    height: h('10%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
