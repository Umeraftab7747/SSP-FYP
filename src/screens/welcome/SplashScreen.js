/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import {w, h} from 'react-native-responsiveness';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.UserLogin();
    }, 3000);
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

    // Service Provider Login
    AsyncStorage.getItem('ServiceProviderData').then(value => {
      const data = JSON.parse(value);
      if (data !== null) {
        this.props.navigation.replace('ServiceproviderBottomtab');
      } else {
        this.props.navigation.replace('UserLogin');
      }
    });
  };
  render() {
    return (
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
          <View style={styles.Activitybar}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </ImageBackground>
        {/* Image Container */}
      </View>
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
    height: h('105%'),
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: h('12%'),
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
  Activitybar: {
    marginTop: h('50%'),
  },
});
