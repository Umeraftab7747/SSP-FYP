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

export class Checkbooking extends Component {
  state = {
    data: [],
    data2: [],
  };

  componentDidMount() {
    const abc = this.props.route.params.data;
    console.log(abc);
    this.setState({data: abc}, () => {
      this.requestingData(this.state.data._id);
    });
  }

  requestingData = id => {
    const prams = {
      id: id,
    };

    axiosInstance
      .post(baseUrl + '/booking/Bookingtime', prams)
      .then(res => {
        const userData = res.data;
        if (userData) {
          this.setState({data2: userData.user}, () => {
            console.log(this.state.data2);
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
    // ASYC
  };

  // Flatlist Container
  renderItem = item => (
    <View style={styles.FlatListContainer}>
      <View style={styles.leftFlatlist}>
        <Text style={styles.text}>Day: {item.day}</Text>
      </View>

      <View style={styles.rightFlatlist}>
        <Text style={styles.text}>Time: {item.time}</Text>
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.Container}>
        <Header text={'Check Booking'} />
        <FlatList
          data={this.state.data2}
          renderItem={({item}) => this.renderItem(item)}
          keyExtractor={item => item._id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  FlatListContainer: {
    width: w('90%'),
    height: h('10%'),
    backgroundColor: 'white',
    marginTop: h('2%'),
    borderRadius: h('0.5%'),
    elevation: 7,
    flexDirection: 'row',
  },
  leftFlatlist: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    // backgroundColor: 'red',
    paddingLeft: 10,
  },
  rightFlatlist: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'green',
  },
  text: {
    color: '#8F94FB',
    fontSize: h('2%'),
    fontWeight: 'bold',
  },
});
