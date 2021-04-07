import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Header, Appbtn} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {Icon} from 'react-native-elements';
import {axiosInstance, baseUrl} from '../api';

export class Dashboard extends Component {
  state = {
    data: [],
    listData: [],
  };

  componentDidMount() {
    this.verifiedRequests();
  }

  verifiedRequests = () => {
    axiosInstance
      .get(baseUrl + '/users/services')
      .then(res => {
        const userData = res.data;
        console.log(userData);
        if (userData) {
          this.setState({data: userData.user});
          this.setState({listData: this.state.data});
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

  // filter data
  searching = text => {
    const newData = this.state.data.filter(item => {
      const itemData = `${item.ServiceName.toUpperCase()} `;

      const searchText = text.toUpperCase();

      return itemData.indexOf(searchText) > -1;
    });
    this.setState({listData: newData});
  };

  // Flatlist Container
  renderItem = item => (
    <View style={styles.FlatListContainer}>
      <View style={styles.leftFlatlist}>
        <Text style={styles.text}>Service: {item.ServiceName}</Text>
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
        <Header text={'DASHBOARD'} />
        {/* Searchbar */}
        <View style={styles.SearchbarContainer}>
          <View style={styles.LeftIconContainer}>
            <Icon name={'search'} type={'ionicon'} color={'#fff'} size={30} />
          </View>
          <TextInput
            onChangeText={text => this.searching(text)}
            placeholder={'Search'}
            placeholderTextColor={'#8F94FB'}
            style={styles.TextinputContainer}
          />
        </View>
        {/* Searchbar */}

        <FlatList
          data={this.state.listData}
          renderItem={({item}) => this.renderItem(item)}
          keyExtractor={item => item._id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    // backgroundColor: 'red',
    width: '100%',
    height: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  SearchbarContainer: {
    width: '90%',
    height: h('7%'),
    // backgroundColor: 'green',
    marginTop: h('2%'),
    borderColor: '#8F94FB',
    borderWidth: h('0.2%'),
    borderRadius: h('1%'),
    flexDirection: 'row',
  },
  LeftIconContainer: {
    // backgroundColor: 'orange',
    width: '17%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRightColor: '#8F94FB',
    // borderRightWidth: h('0.2%'),
    backgroundColor: '#8F94FB',
  },
  TextinputContainer: {
    // backgroundColor: 'red',
    width: '83%',
    height: '100%',
    paddingLeft: h('1%'),
    color: '#8F94FB',
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
    fontSize: h('2%'),
    fontWeight: 'bold',
  },
});
