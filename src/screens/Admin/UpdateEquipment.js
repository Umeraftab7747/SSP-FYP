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

export class UpdateEquipment extends Component {
  state = {
    data: [],
    listData: [],
    modalVisible: false,
    selectedData: '',
    isFetching: false,
  };

  componentDidMount() {
    this.verifiedRequests();
  }

  verifiedRequests = () => {
    axiosInstance
      .get(baseUrl + '/admin/allEquipment')
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
  // loading
  onRefresh() {
    this.setState({isFetching: true}, () => {
      this.componentDidMount();
      this.setState({isFetching: false});
    });
  }

  // delet
  delete = id => {
    // variabl
    const params = {
      ServiceId: id,
    };
    axiosInstance
      .post(baseUrl + `/admin/DeleteEquipment`, params)
      .then(res => {
        alert('Service Deleted');
        this.props.navigation.goBack();
      })
      .catch(error => {
        // console.log('error catch status');
      });
  };

  // Flatlist Container
  renderItem = item => (
    <View style={styles.FlatListContainer}>
      <View style={styles.leftFlatlist}>
        <Text style={styles.text}>Equipment Name: {item.Equipmentname}</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          this.setState({selectedData: item}, () => {
            // this.props.navigation.navigate('Equipment', {
            //   Alldata: this.state.selectedData,
            // });

            this.setState({modalVisible: true});
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
        <Header text={'Update Equipment'} />

        <FlatList
          data={this.state.listData}
          renderItem={({item}) => this.renderItem(item)}
          keyExtractor={item => item._id}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
        />

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible: false});
          }}>
          <View style={styles.ModalContainer}>
            <View style={styles.ViewContainer}>
              <Text style={styles.LoginText}>SERVICE PROVIDER DETAILS</Text>
              <View style={styles.TEXTCONTAINER}>
                <Text style={[styles.LoginText2]}>
                  NAME: {this.state.selectedData.Equipmentname}
                </Text>
                <Text style={styles.LoginText2}>
                  COMPANY: {this.state.selectedData.Companyname}
                </Text>
                <Text style={styles.LoginText2}>
                  Equipment name: {this.state.selectedData.Equipmentname}
                </Text>
                <Text style={styles.LoginText2}>
                  Price: {this.state.selectedData.EquipmentPrice}
                </Text>
                <Text style={styles.LoginText2}>
                  discription:{this.state.selectedData.discription}
                </Text>
              </View>

              <Appbtn
                onPress={() => {
                  this.props.navigation.navigate('EquipmentDetails', {
                    Alldata: this.state.selectedData,
                  });
                }}
                text={'Update'}
              />
              <Appbtn
                onPress={() => {
                  this.delete(this.state.selectedData.ServiceId);
                }}
                text={'Delete'}
              />
            </View>
          </View>
        </Modal>
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
  ModalContainer: {
    flex: 1,
    backgroundColor: '#0004',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewContainer: {
    width: w('95%'),
    height: h('50%'),
    backgroundColor: 'white',
    borderRadius: h('2%'),
    alignItems: 'center',
  },
  LoginText: {
    color: '#8F94FB',
    fontSize: h('3%'),
    fontWeight: 'bold',
    marginTop: h('1%'),
  },
  LoginText2: {
    color: '#8F94FB',
    fontSize: h('2.4%'),
    fontWeight: 'bold',
    marginTop: h('1%'),
  },
  TEXTCONTAINER: {
    width: '100%',
    height: '50%',
    // backgroundColor: 'red',
    paddingTop: h('2%'),
    paddingLeft: h('2%'),
  },
});
