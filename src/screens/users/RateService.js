/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import {Header, Appbtn} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {Icon} from 'react-native-elements';
import {axiosInstance, baseUrl} from '../api';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class RateService extends Component {
  state = {
    data: [],
    Rating: '1',
    Comment: '',
  };

  componentDidMount() {
    const xyz = this.props.route.params.Details;
    this.setState({data: xyz});
  }

  Rated = text => {
    if (this.state.Comment === '') {
      alert('Kindly Write the Comment to Submit');
    } else {
      AsyncStorage.getItem('UserData').then(value => {
        const data = JSON.parse(value);
        if (data !== null) {
          // this.setState({Email: data});
          const params = {
            Sid: this.state.data._id,
            UserEmail: data,
            ServiceName: this.state.data.ServiceName,
            Rating: this.state.Rating,
            Message: this.state.Comment,
          };

          axiosInstance
            .post(baseUrl + '/rating/rateService', params)
            .then(res => {
              const userData = res.data;
              console.log(userData.user);

              if (userData.status === '200') {
                this.props.navigation.navigate('UserBottomtab');
              }
            })
            .catch(error => {
              if (error) {
                alert('Something Went Wrong');
              }
            });
        }
      });
    }
  };

  render() {
    return (
      <View style={styles.Container}>
        <Header text={'BOOKING DETAILS'} />
        <View style={styles.UpperContainer}>
          <Text style={styles.LoginText}>DETAILS</Text>
          {/* detils */}
          <Text style={styles.LoginText2}>RATE THE SERVICE </Text>

          {/* RATING BAR */}
          <Picker
            selectedValue={this.state.Rating}
            style={{
              height: h('7%'),
              width: w('25%'),
              color: '#8F94FB',
            }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({Rating: itemValue})
            }>
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
          </Picker>
          {/* RATING BAR */}

          {/* detils */}
        </View>
        <View style={styles.LowerContainer}>
          <Text style={styles.LoginText}>Comment</Text>
          <TextInput
            onChangeText={Comment => {
              this.setState({Comment});
            }}
            style={styles.TextinputStyle}
            placeholderTextColor={'#8F94FB'}
            placeholder={'Enter Comment'}
            multiline
          />
          <Appbtn
            onPress={() => {
              this.Rated();
            }}
            text={'Rate Service'}
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
  UpperContainer: {
    width: w('100%'),
    height: h('30%'),
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  LowerContainer: {
    width: w('100%'),
    height: h('40%'),
    // backgroundColor: 'purple',
    alignItems: 'center',
  },
  LoginText: {
    color: '#8F94FB',
    fontSize: h('3%'),
    fontWeight: 'bold',
  },
  LoginText2: {
    color: '#8F94FB',
    fontSize: h('2.4%'),
    fontWeight: 'bold',
    marginTop: h('5%'),
  },
  DetailsContainer: {
    width: w('90%'),
    height: h('25%'),
    justifyContent: 'center',
    // backgroundColor: 'red',
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
  RatingContainer: {
    // backgroundColor: 'red',
    width: '70%',
    height: h('7%'),
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
