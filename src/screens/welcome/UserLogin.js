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

export class UserLogin extends Component {
  state = {
    Email: '',
    Password: '',
  };

  componentDidMount() {
    this.UserLogin();
  }

  UserLogin = () => {
    AsyncStorage.getItem('UserData').then(value => {
      const data = JSON.parse(value);
      if (data !== null) {
        this.props.navigation.replace('UserBottomtab');
      }
    });

    // admin auto
    AsyncStorage.getItem('admin').then(value => {
      const data = JSON.parse(value);
      if (data !== null) {
        this.props.navigation.replace('AdminBottomTab');
      }
    });
  };

  validate = () => {
    const {Email, Password} = this.state;

    if (Email === 'admin@admin.com' && Password === '123456') {
      AsyncStorage.setItem('admin', JSON.stringify(Email), () => {
        this.props.navigation.replace('AdminBottomTab');
      });
    } else {
      if (Email !== '') {
        if (Password !== '') {
          const params = {
            email: Email,
            password: Password,
          };
          // ASY
          axiosInstance
            .post(baseUrl + '/users/signin', params)
            .then(res => {
              const userData = res.data;
              if (userData.sucess === true) {
                alert('USER LOGIN');
                AsyncStorage.setItem('UserData', JSON.stringify(Email), () => {
                  this.props.navigation.replace('UserBottomtab');
                });
              } else if (userData.sucess === false) {
                alert(userData.msg);
              }
            })
            .catch(error => {
              alert('UnAuthorzie Acess! Check if your Email is Verfied');
            });
          // ASYC
        } else {
          alert('Password Field is required');
        }
      } else {
        alert('Email Field is Required');
      }
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
            <Text style={styles.LoginText}>USER LOGIN</Text>
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
              />
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('UserPassword');
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
                this.props.navigation.navigate('UserSignup');
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
                this.props.navigation.navigate('SspLogin');
              }}>
              <Text
                style={[
                  styles.ForgotPassText,
                  {
                    marginTop: h('2%'),
                  },
                ]}>
                Login As Service Provider ?
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
    marginTop: h('25%'),
    borderRadius: h('2%'),
    elevation: h('1%'),
    alignItems: 'center',
    paddingTop: h('2%'),
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
