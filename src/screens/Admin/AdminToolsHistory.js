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

export class AdminToolsHistory extends Component {
  state = {
    data: [],
    listData: [],
    modalVisible: false,
    selectedData: '',
    isFetching: false,
    tools: [],
    filterTools: [],
    shareData: [],
  };

  componentDidMount() {
    this.getData();
  }

  // GETING LOGIN DATA
  getData = () => {
    // ASY
    axiosInstance
      .get(baseUrl + '/admin/AdminCompletedProjectEquipment')
      .then(res => {
        const userData = res.data;

        if (userData.status === 200) {
          this.setState({data: userData.user}, () => {
            this.setState({tools: this.state.data[0]}, () => {
              // console.log(this.state.tools);
            });
          });

          this.setState({listData: this.state.data}, () => {
            this.setState({isFetching: false});
          });
        } else if (userData.sucess === 404) {
          alert(userData.msg);
        }
      })
      .catch(error => {
        // alert('data not found');
      });
    // ASYC
  };

  // loading
  onRefresh() {
    this.setState({isFetching: true}, () => {
      this.componentDidMount();
      this.setState({isFetching: false});
    });
  }

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
    <TouchableOpacity
      onPress={() => {
        this.setState({modalVisible: true, shareData: item.tools[0]}, () => {
          console.log(this.state.shareData);
        });
      }}
      style={styles.FlatListContainer}>
      <View style={styles.leftFlatlist}>
        <Text style={styles.text}>Service: {item.ServiceName}</Text>
      </View>

      <View style={styles.rightFlatlist}>
        <Icon
          name={'checkmark-done-circle-sharp'}
          type={'ionicon'}
          color={'#8F94FB'}
          size={30}
        />
      </View>
    </TouchableOpacity>
  );
  render() {
    return (
      <View style={styles.Container}>
        <Header text={'History'} />
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
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
        />

        {/* modal to pick tools */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible: false});
          }}>
          <View style={styles.ModalContainer}>
            <View style={styles.ViewContainer}>
              <Text style={styles.LoginText}>Equipments</Text>
              <View style={styles.TEXTCONTAINER}>
                <FlatList
                  data={this.state.shareData}
                  renderItem={({item}) => (
                    <View style={styles.radiobutton}>
                      <Text style={styles.LoginText2}>Name:{item.name}</Text>
                      <Text style={styles.LoginText2}>Price:{item.price}</Text>
                    </View>
                  )}
                  keyExtractor={item => Math.random().toString()}
                />
                <Appbtn
                  onPress={() => {
                    this.setState({modalVisible: false});
                  }}
                  text={'CLOSE'}
                />
              </View>
            </View>
          </View>
        </Modal>
        {/* modal to pick tools */}
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
    marginTop: h('1%'),
  },
  ModalContainer: {
    flex: 1,
    backgroundColor: '#0004',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewContainer: {
    width: w('95%'),
    height: h('85%'),
    backgroundColor: 'white',
    borderRadius: h('2%'),
    alignItems: 'center',
  },
  radiobutton: {
    width: w('80%'),
    height: h('8%'),
    // backgroundColor: 'red',
    justifyContent: 'space-around',
    // alignItems: 'center',
    marginTop: h('1%'),
    // flexDirection: 'row',
  },
  TEXTCONTAINER: {
    width: '100%',
    height: '84%',
    // backgroundColor: 'red',
    paddingTop: h('2%'),
    alignItems: 'center',
  },
  LoginText2: {
    color: '#8F94FB',
    fontSize: h('2.4%'),
    fontWeight: 'bold',
  },
  LoginText: {
    color: '#8F94FB',
    fontSize: h('3%'),
    fontWeight: 'bold',
  },
});
