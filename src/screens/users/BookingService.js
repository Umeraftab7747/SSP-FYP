import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Modal,
  ToastAndroid,
} from 'react-native';
import {Header, Appbtn, AppInput} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {Icon} from 'react-native-elements';
import {axiosInstance, baseUrl} from '../api';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class BookingService extends Component {
  state = {
    Servicedata: [],
    Email: '',
    UserData: [],
    rating: [],
    modalVisible: false,
    check: false,
    Toolsdata: [],
    addedTools: [],
    modalData: [],

    address: '',
    Name: '',
    Phone: '',
    discription: '',

    // datepicker 2
    isDatePickerVisible: false,
    isDatePickerVisible2: false,
    day: '',
    time: '',
  };

  componentDidMount() {
    const abc = this.props.route.params.Servicedata;
    this.setState({Servicedata: abc}, () => {
      this.getTools();
    });
    this.getData();
  }

  getTools = () => {
    const params = {
      EquipmentCategory: this.state.Servicedata.ServiceType,
    };

    // ASY
    axiosInstance
      .post(baseUrl + '/admin/allEquipment', params)
      .then(res => {
        const userData = res.data;

        if (userData.status === 200) {
          this.setState({Toolsdata: userData.user}, () => {
            // console.log(this.state.Toolsdata);
          });
        }
      })
      .catch(error => {
        // console.log(error);
      });
    // ASYC
  };

  getData = () => {
    AsyncStorage.getItem('UserData').then(value => {
      const data = JSON.parse(value);
      if (data !== null) {
        this.setState({Email: data});

        const params = {
          email: this.state.Email,
        };
        axiosInstance
          .post(baseUrl + '/users/UserDetails', params)
          .then(res => {
            const userData = res.data;

            this.setState({UserData: userData.user});
            // console.warn(this.state.UserData);
          })
          .catch(error => {
            if (error) {
              alert('Something Went Wrong');
            }
          });
      }
    });
  };

  // datetimepicker

  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };
  showDatePicker2 = () => {
    this.setState({isDatePickerVisible2: true});
  };

  hideDatePicker2 = () => {
    this.setState({isDatePickerVisible2: false});
  };

  handleConfirm = value => {
    var time = new Date();
    var today = time.getDate();

    const day = value.getDate();

    if (day < today) {
      alert('YOU CAN NOT SELECT A PREVIOUS DAY!');
      return this.hideDatePicker();
    } else {
      this.setState({day: day});
      this.hideDatePicker();
    }
  };
  handleConfirm2 = value => {
    const time = value.toLocaleTimeString();
    this.setState({time: time});
    this.hideDatePicker2();
  };

  // datetimepicker

  AddEquipment = () => {
    const params = {
      ServiceId: this.state.modalData._id,
      UserEmail: this.state.Email,
      ServiceName: this.state.Servicedata.ServiceName,
      tools: this.state.addedTools,
      CompnayEmail: this.state.Servicedata.Email,
    };
    axiosInstance
      .post(baseUrl + '/users/EquipmentBooking', params)
      .then(res => {
        const userData = res.data;
        alert(userData.msg);
        this.setState({modalVisible: false}, () => {
          this.props.navigation.navigate('UserBottomtab');
        });
      })
      .catch(error => {
        if (error) {
          alert('Something Went Wrong');
        }
      });
  };

  // Booking
  BookService = () => {
    const {address, Phone, discription, day, time, Name} = this.state;
    if (
      Name !== '' &&
      address !== '' &&
      Phone !== '' &&
      day !== '' &&
      time !== '' &&
      discription !== ''
    ) {
      const params = {
        UserEmail: this.state.Email,
        UserName: this.state.Name,
        PhoneNo: this.state.Phone,
        discription: this.state.discription,
        address: this.state.address,
        ServiceProviderEmail: this.state.Servicedata.Email,
        ServiceName: this.state.Servicedata.ServiceName,
        ServiceType: this.state.Servicedata.ServiceType,
        ServiceId: this.state.Servicedata._id,
        day: this.state.day,
        time: this.state.time,
      };
      axiosInstance
        .post(baseUrl + '/booking/book', params)
        .then(res => {
          const userData = res.data;
          if (userData.status === '200') {
            alert('ADD TOOLS IF YOU WANT');
            // this.props.navigation.navigate('UserBottomtab');
            this.setState(
              {modalVisible: true, modalData: userData.user},
              () => {
                // console.log(this.state.modalData._id);
              },
            );
          }
        })
        .catch(error => {
          if ('Error: Request failed with status code 404') {
            alert('Service Already BOOKED');
          }
        });
    } else {
      alert('ALL FIELDS ARE REQUIRED');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header text={'BOOK SERVICE'} />

        <AppInput
          IconName={'add'}
          onChangeText={Name => {
            this.setState({Name});
          }}
          Placeholder={'Name'}
        />
        <AppInput
          IconName={'add'}
          onChangeText={address => {
            this.setState({address});
          }}
          Placeholder={'Address'}
        />

        <Text style={styles.Text}>BOOKING TIME AND DAY</Text>

        {/* WORKING HOURS */}

        {/* STart hour */}
        <Text>SELECT DAY</Text>
        <View>
          <Button
            title="SELECT DAY"
            onPress={() => {
              this.showDatePicker();
            }}
          />
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisible}
            mode="date"
            onConfirm={time => {
              this.handleConfirm(time);
            }}
            onCancel={() => {
              this.hideDatePicker();
            }}
          />
        </View>

        {/* End Hour */}
        <Text>SELECT TIME</Text>
        <View>
          <Button
            title="SELECT TIME"
            onPress={() => {
              this.showDatePicker2();
            }}
          />
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisible2}
            mode="time"
            onConfirm={time => {
              this.handleConfirm2(time);
            }}
            onCancel={() => {
              this.hideDatePicker2();
            }}
          />
        </View>
        {/* WORKING HOURS */}

        <AppInput
          IconName={'call'}
          onChangeText={Phone => {
            this.setState({Phone});
          }}
          keyboardType={'numeric'}
          Placeholder={'Phone No'}
        />

        <TextInput
          onChangeText={discription => this.setState({discription})}
          style={styles.TextinputStyle}
          value={this.state.discription}
          placeholderTextColor={'#8F94FB'}
          placeholder={'Enter Discription'}
          multiline
        />

        <Appbtn
          text={'BOOK NOW'}
          onPress={() => {
            this.BookService();
          }}
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
                {this.state.Toolsdata.map(item => (
                  <View style={styles.radiobutton}>
                    <Text style={styles.LoginText2}>
                      Name: {item.Equipmentname}
                    </Text>
                    <Text style={styles.LoginText2}>
                      Price: {item.EquipmentPrice}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState(
                          PrevState => ({
                            addedTools: [
                              ...PrevState.addedTools,
                              {
                                name: item.Equipmentname,
                                price: item.EquipmentPrice,
                              },
                            ],
                          }),
                          () => {
                            // console.log(this.state.addedTools);
                            ToastAndroid.show(
                              item.Equipmentname + ' added',
                              ToastAndroid.SHORT,
                            );
                          },
                        );
                      }}
                      style={styles.btnContainer}>
                      <Text style={styles.btnText}> ADD </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              <Appbtn
                onPress={() => {
                  this.AddEquipment();
                }}
                text={'Confirm'}
              />
            </View>
          </View>
        </Modal>
        {/* modal to pick tools */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  Text: {
    color: '#8F94FB',
    fontWeight: 'bold',
    fontSize: h('2.5%'),
  },
  ModalContainer: {
    flex: 1,
    backgroundColor: '#0004',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewContainer: {
    width: w('95%'),
    height: h('95%'),
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
    height: '84%',
    // backgroundColor: 'red',
    paddingTop: h('2%'),
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
  Checkbtn: {
    width: 30,
    height: 30,
    backgroundColor: '#8F94FB',
    borderRadius: 10,
  },
  unCheckbtn: {
    width: 30,
    height: 30,
    // backgroundColor: 'green',
    borderColor: '#8F94FB',
    borderWidth: 2,
    borderRadius: 10,
  },
  btnContainer: {
    width: w('20%'),
    height: h('5%'),
    backgroundColor: '#8F94FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: h('2%'),
    borderRadius: h('1%'),
  },
  btnText: {
    color: 'white',
    fontSize: h('2%'),
    fontWeight: 'bold',
  },
});
