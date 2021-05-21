import React, {Component} from 'react';
import {Text, StyleSheet, View, TextInput, Button} from 'react-native';
import {Header, Appbtn, AppInput} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {Icon} from 'react-native-elements';
import {axiosInstance, baseUrl} from '../api';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
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

    // datepicker 2
    isDatePickerVisible: false,
    isDatePickerVisible2: false,
    day: '',
    time: '',
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

  // datetimepicker

  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };
  showDatePicker2 = () => {
    this.setState({isDatePickerVisible2: true});
  };

  hideDatePicker2 = () => {
    this.setState({isDatePickerVisible2: false});
  };

  handleConfirm = value => {
    const day = value.toDateString();
    this.setState({day: day});
    this.hideDatePicker();
  };
  handleConfirm2 = value => {
    const time = value.toLocaleTimeString();
    this.setState({time: time});
    this.hideDatePicker2();
  };

  // datetimepicker

  // Booking
  BookService = () => {
    const {Name, Phone, discription, day, time} = this.state;
    if (
      Name !== '' &&
      Phone !== '' &&
      day !== '' &&
      time !== '' &&
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
        day: this.state.day,
        time: this.state.time,
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

        <Text style={styles.Text}>BOOKING TIME AND DAY</Text>

        {/* WORKING HOURS */}

        {/* STart hour */}
        <Text>SELECT DAY</Text>
        <View>
          <Button
            title="SELECT DAY"
            onPress={() => {
              this.showDatePicker();
            }}
          />
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisible}
            mode="date"
            onConfirm={time => {
              this.handleConfirm(time);
            }}
            onCancel={() => {
              this.hideDatePicker();
            }}
          />
        </View>

        {/* End Hour */}
        <Text>SELECT TIME</Text>
        <View>
          <Button
            title="SELECT TIME"
            onPress={() => {
              this.showDatePicker2();
            }}
          />
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisible2}
            mode="time"
            onConfirm={time => {
              this.handleConfirm2(time);
            }}
            onCancel={() => {
              this.hideDatePicker2();
            }}
          />
        </View>
        {/* WORKING HOURS */}

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
  Text: {
    color: '#8F94FB',
    fontWeight: 'bold',
    fontSize: h('2.5%'),
  },
});
