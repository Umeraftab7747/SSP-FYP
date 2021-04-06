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

export class Users extends Component {
  state = {
    data: [],

    modalVisible: false,
    selectedData: '',
  };

  componentDidMount() {
    this.unverifiedusers();
  }

  unverifiedusers = () => {
    axiosInstance
      .get(baseUrl + '/admin/non-verify')
      .then(res => {
        const userData = res.data;

        if (userData.status === 200) {
          this.setState({data: userData.user});
          console.log(this.state.data);

          // console.log('200 status' + userData);
        } else if (userData.status === 404) {
          console.log('404 status' + userData);
        }
      })
      .catch(error => {
        console.log('error catch status' + error);
      });
    // ASYC
  };

  // delet
  delete = Email => {
    const params = {
      Email: Email,
    };
    axiosInstance
      .post(baseUrl + `/admin/delete`, params)
      .then(res => {
        const userData = res.data;
        console.log(userData);
        if (userData.status === 200) {
          // console.log(userData.msg);
          this.setState({modalVisible: false});
          this.unverifiedusers();
        }

        if (userData.status === 404) {
          // console.log('404 status');
        }
      })
      .catch(error => {
        // console.log('error catch status');
      });
  };

  Verify = Email => {
    const params = {
      Email: Email,
    };
    axiosInstance
      .post(baseUrl + `/admin/verify`, params)
      .then(res => {
        const userData = res.data;
        console.log(userData);
        if (userData.status === 200) {
          this.setState({modalVisible: false});
          this.unverifiedusers();
        }

        if (userData.status === 404) {
          // console.log('404 status');
        }
      })
      .catch(error => {
        // console.log('error catch status');
      });
  };

  // Flatlist Container
  renderItem = item => (
    <View style={styles.FlatListContainer}>
      <View style={styles.leftFlatlist}>
        <Text style={styles.text}>Name: {item.Firstname}</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          this.setState({selectedData: item}, () => {
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
        <Header text={'APROVE USERS'} />
        <FlatList
          data={this.state.data}
          renderItem={({item}) => this.renderItem(item)}
          keyExtractor={item => item._id}
        />

        {/* ٘MODAL*/}
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
                  NAME: {this.state.selectedData.Firstname}
                </Text>
                <Text style={styles.LoginText2}>
                  COMPANY: {this.state.selectedData.Password}
                </Text>
                <Text style={styles.LoginText2}>
                  EMAIL: {this.state.selectedData.Email}
                </Text>
                <Text style={styles.LoginText2}>
                  CNIC: {this.state.selectedData.Cnic}
                </Text>
                <Text style={styles.LoginText2}>
                  PHONE:{this.state.selectedData.Phone}
                </Text>
              </View>

              <Appbtn
                onPress={() => {
                  this.Verify(this.state.selectedData.Email);
                }}
                text={'APROVE'}
              />
              <Appbtn
                onPress={() => {
                  this.delete(this.state.selectedData.Email);
                }}
                text={'Dis-APROVE'}
              />
            </View>
          </View>
        </Modal>
        {/* ٘MODAL*/}
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
