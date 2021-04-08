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
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';

export class UserPassword extends Component {
  state = {
    Email: '',
  };

  validate = () => {
    const {Email} = this.state;
    if (Email !== '') {
      const params = {
        Email: Email,
      };

      // ASYC
      axiosInstance
        .post(baseUrl + '/users/password', params)
        .then(res => {
          const userData = res.data;
          if (userData.status === 200) {
            this.props.navigation.goBack();
            alert('Passowrd reset');
          } else if (userData.status === 404) {
            alert(userData.msg);
          }
        })
        .catch(error => {
          console.log(error);
          alert('Error Email not Found');
        });
      // ASYC
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
            <Text style={styles.LoginText}>RECOVER USER PASSWORD</Text>
            <View style={styles.AppinputContainer}>
              <AppInput
                onChangeText={Email => this.setState({Email})}
                IconName={'mail-outline'}
                Placeholder={'Enter Email'}
              />
            </View>
            <Appbtn
              onPress={() => {
                this.validate();
              }}
              text={'RESET'}
            />
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
    height: h('30%'),
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
    height: h('10%'),
    justifyContent: 'center',
  },
  ForgotPassText: {
    color: '#8F94FB',
    fontWeight: 'bold',
    fontSize: h('2%'),
    marginLeft: h('0.8%'),
    marginTop: h('2%'),
  },
  ButtonContainer: {
    backgroundColor: 'red',
    width: w('80%'),
    height: h('7%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
