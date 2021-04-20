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
import AsyncStorage from '@react-native-async-storage/async-storage';

export class RateService extends Component {
  state = {
    data: [],
    Rating: '',
    star1: true,
    star2: true,
    star3: true,
    star4: true,
    star5: true,
  };

  componentDidMount() {
    const xyz = this.props.route.params.Details;
    this.setState({data: xyz});
  }

  Rated = text => {
    AsyncStorage.getItem('UserData').then(value => {
      const data = JSON.parse(value);
      if (data !== null) {
        // this.setState({Email: data});
        const params = {
          Sid: this.state.data._id,
          UserEmail: 'adasd',
          ServiceName: data,
          Rating: '',
          Message: text,
        };

        axiosInstance
          .post(baseUrl + '/booking/Completed', params)
          .then(res => {
            const userData = res.data;
            console.log(userData.user);

            if (userData.status === '200') {
              this.props.navigation.navigate('RateService', {
                Details: userData.user,
              });
            }
          })
          .catch(error => {
            if (error) {
              alert('Something Went Wrong');
            }
          });
      }
    });
  };

  StarValue = value => {
    if (value === 1) {
      this.setState({Rating: 1, star1: !this.state.star1});
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
          <View style={styles.RatingContainer}>
            {this.state.star === true ? (
              <TouchableOpacity
                onPress={() => {
                  this.StarValue(1);
                }}>
                <Icon name="star" type="ionicon" color="gold" size={40} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.StarValue(0);
                }}>
                <Icon
                  name="star-outline"
                  type="ionicon"
                  color="gold"
                  size={40}
                />
              </TouchableOpacity>
            )}
          </View>
          {/* RATING BAR */}

          {/* detils */}
        </View>
        <View style={styles.LowerContainer}>
          <Text style={styles.LoginText}>Comment</Text>
          <TextInput
            onChangeText={Message => {
              this.setState({Message});
            }}
            style={styles.TextinputStyle}
            placeholderTextColor={'#8F94FB'}
            placeholder={'Enter Reason for DisApprove'}
            multiline
          />
          <Appbtn text={'Rate Service'} />
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
