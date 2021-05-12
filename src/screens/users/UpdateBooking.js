import React, {Component} from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import {Header, Appbtn, AppInput} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {axiosInstance, baseUrl} from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class UpdateBooking extends Component {
  state = {
    Email: '',

    Name: '',
    Phone: '+92',
    discription: '',
    BookingDay: '',

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
        this.setState({Email: data}, () => {
          this.DETAILS(this.state.Email);
        });
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
      .post(baseUrl + '/booking/SPEICIFEDBOOKING', params)
      .then(res => {
        this.setState({userDetails: res.data.user}, () => {
          this.setState({
            Name: this.state.userDetails.UserName,
            Phone: this.state.userDetails.PhoneNo,
            discription: this.state.userDetails.discription,
            BookingDay: this.state.userDetails.BookingDay,
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
    // ASYC
  };

  // Update DETAILS
  UPDATED = () => {
    const params = {
      Email: this.state.Email,
      Name: this.state.Name,
      Phone: this.state.Phone,
      discription: this.state.discription,
      BookingDay: this.state.BookingDay,
    };

    // ASY
    axiosInstance
      .post(baseUrl + '/booking/BookingUpdate', params)
      .then(res => {
        alert('BOOKING UPDATED');
        this.props.navigation.navigate('UserBottomtab');
      })
      .catch(error => {
        console.log(error);
      });
    // ASYC
  };

  render() {
    return (
      <View style={styles.container}>
        <Header text={'UPDATE BOOK SERVICE'} />

        <AppInput
          IconName={'add'}
          onChangeText={Name => {
            this.setState({Name});
          }}
          Placeholder={'Name'}
          value={this.state.Name}
        />

        <AppInput
          IconName={'add'}
          onChangeText={BookingDay => {
            this.setState({BookingDay});
          }}
          keyboardType={'numeric'}
          Placeholder={'Booking Day'}
          value={this.state.BookingDay}
        />
        <AppInput
          IconName={'call'}
          onChangeText={Phone => {
            this.setState({Phone});
          }}
          keyboardType={'numeric'}
          Placeholder={'Phone No'}
          value={this.state.Phone}
        />

        <TextInput
          onChangeText={discription => this.setState({discription})}
          style={styles.TextinputStyle}
          value={this.state.discription}
          placeholderTextColor={'#8F94FB'}
          placeholder={'Enter Discription'}
          multiline
        />
        <Appbtn
          text={'UPDATE NOW'}
          onPress={() => {
            this.UPDATED();
          }}
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
