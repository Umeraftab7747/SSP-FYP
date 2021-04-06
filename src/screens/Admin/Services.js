import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Header, Appbtn} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {Icon} from 'react-native-elements';
import {axiosInstance, baseUrl} from '../api';
export class Services extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    setInterval(() => {
      this.unverifiedRequests();
    }, 1000);
  }
  componentWillUnmount() {
    setInterval(() => {
      this.unverifiedRequests();
    }, 1000);
  }

  unverifiedRequests = () => {
    axiosInstance
      .get(baseUrl + '/service/alldata')
      .then(res => {
        const userData = res.data;
        console.log(userData);
        if (userData) {
          this.setState({data: userData.user});
          console.log(this.state.data);
        } else if (!userData) {
          console.log('404 status' + userData);
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
        <Text style={styles.text}>Name: {item.ServiceName}</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('Details', {
            otherData: item,
          });
        }}
        style={styles.rightFlatlist}>
        <Icon name={'eye'} type={'ionicon'} color={'#8F94FB'} size={30} />
      </TouchableOpacity>
    </View>
  );
  render() {
    return (
      <View style={styles.Container}>
        <Header text={'APPROVE SERVICES'} />
        <FlatList
          data={this.state.data}
          renderItem={({item}) => this.renderItem(item)}
          keyExtractor={item => item._id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    width: w('100%'),
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
    width: '80%',
    height: '100%',
    justifyContent: 'center',
    // backgroundColor: 'red',
    paddingLeft: 10,
  },
  rightFlatlist: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#8F94FB',
    fontSize: h('2.4%'),
    fontWeight: 'bold',
  },
});
