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
    Name: '',
    BookingDay: '',
    Phone: '',
    discription: '',
  };

  componentDidMount() {
    const abc = this.props.route.params.Servicedata;
    this.setState({Servicedata: abc}, () => {});
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

  // Booking
  BookService = () => {
    const {Name, BookingDay, Phone, discription} = this.state;
    if (
      Name !== '' &&
      BookingDay !== '' &&
      Phone !== '' &&
      discription !== ''
    ) {
      const params = {
        UserEmail: this.state.Email,
        UserName: this.state.Name,
        PhoneNo: this.state.Phone,
        discription: this.state.discription,
        BookingDay: this.state.BookingDay,
        ServiceProviderEmail: this.state.Servicedata.Email,
        ServiceName: this.state.Servicedata.ServiceName,
        ServiceType: this.state.Servicedata.ServiceType,
        ServiceId: this.state.Servicedata._id,
      };
      axiosInstance
        .post(baseUrl + '/booking/book', params)
        .then(res => {
          const userData = res.data;
          if (userData.status === '200') {
            alert(userData.msg);
            this.props.navigation.navigate('UserBottomtab');
          }
        })
        .catch(error => {
          if ('Error: Request failed with status code 404') {
            alert('Service Already BOOKED');
          }
        });
    } else {
      alert('ALL FIELDS ARE REQUIRED');
    }
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
          onChangeText={BookingDay => {
            this.setState({BookingDay});
          }}
          keyboardType={'numeric'}
          Placeholder={'Booking Day'}
        />
        <AppInput
          IconName={'call'}
          onChangeText={Phone => {
            this.setState({Phone});
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
        <Appbtn
          text={'BOOK NOW'}
          onPress={() => {
            this.BookService();
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
