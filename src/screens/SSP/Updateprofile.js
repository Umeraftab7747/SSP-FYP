import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Header, Appbtn, AppInput} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {axiosInstance, baseUrl} from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class Updateprofile extends Component {
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

  getData = () => {
    AsyncStorage.getItem('ServiceProviderData').then(value => {
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
      .post(baseUrl + '/service-provider/ServiceProviderData', params)
      .then(res => {
        this.setState({userDetails: res.data.user[0]}, () => {
          this.setState({
            Email: this.state.userDetails.Email,
            Name: this.state.userDetails.Firstname,
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

  // GETINS USER DETAILS
  UPDATED = () => {
    const params = {
      Email: this.state.userDetails.Email,
      Name: this.state.Name,
      Cnic: this.state.Cnic,
      Phone: this.state.Phone,
    };

    // ASY
    axiosInstance
      .post(baseUrl + '/service-provider/SSPUpdate', params)
      .then(res => {
        this.props.navigation.goBack();
      })
      .catch(error => {
        console.log(error);
      });
    // ASYC
  };

  render() {
    return (
      <View style={styles.Container}>
        <Header text={'UPDATE PROFILE'} />
        <View style={styles.EditBox}>
          {/* edit info */}
          <AppInput
            IconName={'person'}
            onChangeText={Name => {
              this.setState({Name});
            }}
            value={this.state.Name}
          />
          {/* edit info */}
          <AppInput
            IconName={'mail'}
            onChangeText={Email => {
              this.setState({Email});
            }}
            value={this.state.Email}
          />
          {/* edit info */}
          <AppInput
            IconName={'card'}
            onChangeText={Cnic => {
              this.setState({Cnic});
            }}
            value={this.state.Cnic}
          />
          {/* edit info */}
          <AppInput
            maxLength={13}
            IconName={'call'}
            onChangeText={Phone => {
              this.setState({Phone});
            }}
            value={this.state.Phone}
          />
          <Appbtn
            onPress={() => {
              this.UPDATED();
            }}
            text={'Update'}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
  },
  EditBox: {
    width: '100%',
    height: h('70%'),
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});