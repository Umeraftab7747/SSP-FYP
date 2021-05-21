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

export class SspSignup extends Component {
  state = {
    Firstname: '',
    CompanyName: '',
    Email: '',
    Password: '',
    confirmPassword: '',
    Cnic: '',
    Phone: '+92 ',
  };

  validate = () => {
    const {
      Firstname,
      CompanyName,
      Email,
      Password,
      confirmPassword,
      Cnic,
      Phone,
    } = this.state;

    if (
      Email !== '' &&
      Firstname !== '' &&
      CompanyName !== '' &&
      Cnic !== '' &&
      Phone !== ''
    ) {
      if (Password.length > 7) {
        if (Password === confirmPassword) {
          const params = {
            Firstname: Firstname,
            Companyname: CompanyName,
            Email: Email,
            Password: Password,
            Phone: Phone,
            Cnic: Cnic,
          };

          axiosInstance
            .post(baseUrl + '/service-provider/signup', params)
            .then(res => {
              const userData = res.data;

              if (userData.status === 200) {
                this.props.navigation.goBack();
                alert(userData.msg);
              }
            })
            .catch(error => {
              if (error) {
                alert('EMAIL ALREADY REGISTERED AS SERVICE PROVIDER');
              }
            });
        } else {
          alert('Both passwords must be same ');
        }
      } else {
        alert('Password must contain 8 characters.');
      }
    } else {
      alert('ALL fields Are Required');
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
            <Text style={styles.LoginText}>SERVICE PROVIDER SIGNUP</Text>
            <View style={styles.AppinputContainer}>
              <AppInput
                onChangeText={Firstname => this.setState({Firstname})}
                IconName={'person'}
                Placeholder={'Enter Name'}
              />
              <AppInput
                onChangeText={CompanyName => this.setState({CompanyName})}
                IconName={'business'}
                Placeholder={'Enter Company Name'}
              />
              <AppInput
                onChangeText={Email => this.setState({Email})}
                IconName={'mail'}
                Placeholder={'Enter Email'}
              />
              <AppInput
                onChangeText={Password => this.setState({Password})}
                IconName={'lock-closed'}
                secureTextEntry
                Placeholder={'Enter Password'}
              />
              <AppInput
                onChangeText={confirmPassword =>
                  this.setState({confirmPassword})
                }
                IconName={'lock-closed'}
                secureTextEntry
                Placeholder={'Confirm Password'}
              />
              <AppInput
                onChangeText={Phone => this.setState({Phone})}
                IconName={'call'}
                Placeholder={'Enter Phone'}
                value={this.state.Phone}
                maxLength={15}
              />
              <AppInput
                onChangeText={Cnic => this.setState({Cnic})}
                IconName={'card'}
                Placeholder={'Enter Cnic'}
                maxLength={13}
              />
            </View>
            {/* BUTTON */}
            <View style={styles.ButtonContainer}>
              <Appbtn
                onPress={() => {
                  this.validate();
                }}
                text={'SIGNUP'}
              />
            </View>
            {/* BUTTON */}
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
    height: h('68%'),
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
    height: h('50%'),
    paddingTop: h('1%'),
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
