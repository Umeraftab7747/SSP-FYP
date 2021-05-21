import React, {Component} from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';
import {Header, Appbtn} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {Icon} from 'react-native-elements';
import {axiosInstance, baseUrl} from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class ConfirmBooking extends Component {
  state = {
    data: [],
    Email: '',
    UserData: [],
    rating: [],
  };
  componentDidMount() {
    const abc = this.props.route.params.Alldata;
    this.setState({data: abc});
  }

  ACCEPT = id => {
    const params = {
      _id: id,
    };
    // ASY
    axiosInstance
      .post(baseUrl + '/booking/AceptBooking', params)
      .then(res => {
        alert('SERVICE ACCEPTED');
        this.props.navigation.navigate('ServiceproviderBottomtab');
      })
      .catch(error => {
        alert(error);
      });

    // ASYC
  };
  REJECTED = id => {
    const params = {
      _id: id,
    };
    // ASY
    axiosInstance
      .post(baseUrl + '/booking/RejectBooking', params)
      .then(res => {
        alert('SERVICE REJECTED');
        this.props.navigation.navigate('ServiceproviderBottomtab');
      })
      .catch(error => {
        alert(error);
      });

    // ASYC
  };

  render() {
    return (
      <View style={styles.container}>
        <Header text={'Service Details'} />
        {/* detail container */}
        <View style={styles.DetailContainer}>
          <Text style={styles.Text}>Name:- {this.state.data.ServiceName} </Text>
          <Text style={styles.Text}>Type:- {this.state.data.ServiceType} </Text>
          <Text style={styles.Text}>
            Client Name:- {this.state.data.UserName}
          </Text>
          <Text style={styles.Text}>
            Client Phone:- {this.state.data.PhoneNo}
          </Text>

          <Text style={styles.Text}>
            Client Email:- {this.state.data.UserEmail}
          </Text>
          <Text style={styles.Text}>Day:- {this.state.data.day}</Text>
          <Text style={styles.Text}>Time:- {this.state.data.time}</Text>
          <Text
            style={[
              styles.Text,
              {
                marginTop: h('2%'),
              },
            ]}>
            Discription:
          </Text>
          <Text style={styles.Text2}> {this.state.data.discription} </Text>
          <View style={styles.ButtonContainer}>
            <Appbtn
              text={'ACCEPT BOOKING'}
              onPress={() => {
                this.ACCEPT(this.state.data._id);
              }}
            />
            <Appbtn
              text={'REJECT BOOKING'}
              onPress={() => {
                this.REJECTED(this.state.data._id);
              }}
            />
          </View>
        </View>
        {/* detail Container end */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  DetailContainer: {
    width: w('100%'),
    height: h('40%'),
    // backgroundColor: 'green',
    // alignItems: 'center',
    paddingTop: h('2%'),
    padding: h('4%'),
  },
  Text: {
    color: '#8F94FB',
    fontWeight: 'bold',
    fontSize: h('2.5%'),
  },
  Text2: {
    color: '#8F94FB',
    fontSize: h('2%'),
    marginTop: h('1%'),
  },
  ButtonContainer: {
    // backgroundColor: 'red',
    width: w('80%'),
    height: h('25%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  RatingContainer: {
    width: '100%',
    height: h('7%'),
    // backgroundColor: 'red',
    padding: h('2%'),
  },
  FlatListContainer: {
    backgroundColor: 'white',
    width: w('90%'),
    height: h('10%'),
    borderRadius: h('1%'),
    marginTop: 5,

    borderColor: '#8F94FB',
    borderWidth: h('0.2%'),
  },
  RightLowerContainer: {
    // backgroundColor: 'red',
    width: '100%',
    height: h('10%'),
    paddingLeft: h('1%'),
    paddingRight: h('1%'),
  },
  RightFlatList: {
    // backgroundColor: 'green',
    width: '100%',
    height: '35%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: h('1%'),
  },
  FlatlistName: {
    color: '#8F94FB',
    fontSize: h('2%'),
    fontWeight: 'bold',
  },
  FlatlistRating: {
    color: '#8F94FB',
    fontSize: h('2%'),
    marginLeft: h('0.5%'),
  },
});
