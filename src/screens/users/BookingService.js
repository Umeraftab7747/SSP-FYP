import React, {Component} from 'react';
import {Text, StyleSheet, View, TextInput} from 'react-native';
import {Header, Appbtn, AppInput} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {Icon} from 'react-native-elements';
import {axiosInstance, baseUrl} from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class BookingService extends Component {
  state = {
    Servicedata: [],
    Email: '',
    UserData: [],
    rating: [],
  };

  componentDidMount() {
    const abc = this.props.route.params.Servicedata;
    this.setState({Servicedata: abc});
    this.getData();
  }

  getData = () => {
    AsyncStorage.getItem('UserData').then(value => {
      const data = JSON.parse(value);
      if (data !== null) {
        this.setState({Email: data});

        const params = {
          email: this.state.Email,
        };

        axiosInstance
          .post(baseUrl + '/users/UserDetails', params)
          .then(res => {
            const userData = res.data;

            this.setState({UserData: userData.user});
            // console.warn(this.state.UserData);
          })
          .catch(error => {
            if (error) {
              alert('Something Went Wrong');
            }
          });
      }
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Header text={'BOOK SERVICE'} />

        <AppInput
          IconName={'add'}
          onChangeText={Name => {
            this.setState({Name});
          }}
          Placeholder={'Name'}
        />
        <AppInput
          IconName={'add'}
          onChangeText={Name => {
            this.setState({Name});
          }}
          Placeholder={'Booking Time'}
          keyboardType={'numeric'}
        />

        <AppInput
          IconName={'add'}
          onChangeText={Name => {
            this.setState({Name});
          }}
          keyboardType={'numeric'}
          Placeholder={'Booking Day'}
        />
        <AppInput
          IconName={'call'}
          onChangeText={Name => {
            this.setState({Name});
          }}
          keyboardType={'numeric'}
          Placeholder={'Phone No'}
        />

        <TextInput
          onChangeText={discription => this.setState({discription})}
          style={styles.TextinputStyle}
          value={this.state.discription}
          placeholderTextColor={'#8F94FB'}
          placeholder={'Enter Discription'}
          multiline
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  TextinputStyle: {
    width: '90%',
    height: h('25%'),
    marginTop: h('2%'),
    borderRadius: h('1%'),
    borderColor: '#8F94FB',
    borderWidth: h('0.3%'),
    padding: h('2%'),
  },
});
