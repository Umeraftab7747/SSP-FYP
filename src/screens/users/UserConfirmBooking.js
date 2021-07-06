import React, {Component} from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';
import {Header, Appbtn} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {axiosInstance, baseUrl} from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class UserConfirmBooking extends Component {
  state = {
    eqData: [],
    price: '',
    data: [],
    Email: '',
  };
  componentDidMount() {
    const xyz = this.props.route.params.tools;
    const zxy = this.props.route.params.price;
    const abc = this.props.route.params.data;
    this.setState({eqData: xyz, price: zxy, data: abc}, () => {
      console.log(this.state.eqData);
      this.getData();
    });
  }

  getData = () => {
    AsyncStorage.getItem('UserData').then(value => {
      const data = JSON.parse(value);
      if (data !== null) {
        this.setState({Email: data}, () => {
          console.log(this.state.Email);
        });
      }
    });
  };

  Submit = () => {
    const params = {
      ServiceId: this.state.data._id,
      userEmail: this.state.Email,
      SSPMAil: this.state.data.Email,
      ServicePrice: this.state.price,
      tools: this.state.eqData,
    };
    // ASY
    axiosInstance
      .post(baseUrl + '/billing/', params)
      .then(res => {
        const userData = res.data;
        console.log(userData);
        this.props.navigation.navigate('UserBottomtab');
      })
      .catch(error => {
        alert(error);
      });

    // ASYC
  };

  render() {
    return (
      <View style={styles.container}>
        <Header text={'PAYMENT BILL'} />

        <FlatList
          data={this.state.eqData}
          renderItem={({item}) => (
            <View style={styles.radiobutton}>
              <Text style={styles.LoginText2}>Name: {item.name}</Text>
              <Text style={styles.LoginText2}>Price: {item.price}</Text>
            </View>
          )}
          keyExtractor={item => item._id}
        />
        <Text style={styles.LoginText3}>Service Price: {this.state.price}</Text>
        <Appbtn
          text={'GO BACK'}
          onPress={() => {
            this.Submit();
          }}
        />
        <View style={styles.bottomTab} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  radiobutton: {
    width: w('90%'),
    height: h('8%'),
    // backgroundColor: 'red',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  LoginText2: {
    color: '#8F94FB',
    fontSize: h('2.4%'),
    fontWeight: 'bold',
    marginTop: h('1%'),
  },
  LoginText3: {
    color: '#8F94FB',
    fontSize: h('3%'),
    fontWeight: 'bold',
    marginTop: h('1%'),
  },
  LoginText1: {
    color: '#8F94FB',
    fontSize: h('1.9%'),
    fontWeight: 'bold',
    marginTop: h('1%'),
    paddingLeft: h('2%'),
    paddingRight: h('2%'),
  },
  bottomTab: {
    marginBottom: h('30%'),
  },
});
