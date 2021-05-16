import React, {Component} from 'react';
import {TextInput, StyleSheet, View, Text, Button} from 'react-native';
import {Header, Appbtn, AppInput} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {axiosInstance, baseUrl} from '../api';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class UpdateBooking extends Component {
  state = {
    Email: '',
    id: '',

    Name: '',
    Phone: '+92',
    discription: '',

    userDetails: '',

    // datepicker 2
    isDatePickerVisible: false,
    isDatePickerVisible2: false,
    day: '',
    time: '',
  };

  componentDidMount() {
    const xyz = this.props.route.params.id;
    this.setState({id: xyz}, () => {
      this.DETAILS();
    });
  }

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
    console.warn(this.state.time);
    this.hideDatePicker2();
  };

  // datetimepicker

  // GETINS USER DETAILS
  DETAILS = () => {
    const params = {
      id: this.state.id,
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
            day: this.state.userDetails.day,
            time: this.state.userDetails.time,
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
      id: this.state.id,
      Name: this.state.Name,
      Phone: this.state.Phone,
      discription: this.state.discription,
      day: this.state.day,
      time: this.state.time,
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
