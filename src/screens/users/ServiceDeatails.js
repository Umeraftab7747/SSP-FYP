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

export class ServiceDeatails extends Component {
  state = {
    data: [],
    Email: '',
  };
  componentDidMount() {
    const abc = this.props.route.params.Alldata;
    this.setState({data: abc});
    this.getData();
  }

  // GETING LOGIN DATA
  getData = () => {
    AsyncStorage.getItem('UserData')
      .then(value => {
        const data = JSON.parse(value);
        if (data !== null) {
          this.setState({Email: data});
        }
      })
      .done();
  };

  BookService = () => {
    const params = {
      UserEmail: this.state.Email,
      ServiceProviderEmail: this.state.data.Email,
      ServiceName: this.state.data.ServiceName,
      ServiceType: this.state.data.ServiceType,
    };

    axiosInstance
      .post(baseUrl + '/booking/book', params)
      .then(res => {
        const userData = res.data;

        if (userData.status === '200') {
          alert(userData.msg);
          this.props.navigation.goBack();
        }
      })
      .catch(error => {
        if (error) {
          alert('Something Went Wrong');
        }
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header text={'Service Details'} />
        {/* detail container */}
        <View style={styles.DetailContainer}>
          <Text style={styles.Text}>Name: {this.state.data.ServiceName} </Text>
          <Text style={styles.Text}>Type: {this.state.data.ServiceType} </Text>
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
              text={'Booking'}
              onPress={() => {
                this.BookService();
              }}
            />
          </View>
        </View>
        {/* detail Container end */}

        <View style={styles.RatingContainer}>
          <Text style={styles.Text}>RATING</Text>
        </View>
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
    height: h('8%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  RatingContainer: {
    width: '100%',
    height: h('100%'),
    // backgroundColor: 'red',
    padding: h('2%'),
  },
});
