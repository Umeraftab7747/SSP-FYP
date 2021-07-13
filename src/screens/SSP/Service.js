/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
  ToastAndroid,
} from 'react-native';
import {Header, Appbtn, AppInput} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {axiosInstance, baseUrl} from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export class Service extends Component {
  state = {
    options: '',
    check: true,
    check2: false,
    check3: 'static',
    modalVisible: false,

    // all field for backend
    Email: '',
    Name: '',
    Price: '',
    ServiceType: [],
    discription: '',
    image: '',
    test: '',

    // datepicker 2
    isDatePickerVisible: false,
    isDatePickerVisible2: false,
    StartHour: '',
    EndHour: '',

    // user details
    userDetails: '',
  };

  componentDidMount() {
    this.getData();
  }

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
    const time = value.toLocaleTimeString();
    this.setState({StartHour: time});

    this.hideDatePicker();
  };
  handleConfirm2 = value => {
    const time = value.toLocaleTimeString();
    this.setState({EndHour: time});

    this.hideDatePicker2();
  };

  // datetimepicker

  openCamera = () => {
    launchImageLibrary({quality: 0.5}, fileobj => {
      // end

      try {
        const uploadTask = storage()
          .ref()
          .child(`/items/${Date.now()}`)
          .putFile(fileobj.uri);

        uploadTask.on(
          'state_changed',
          snapshot => {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (progress == 100) {
              alert('uploaded');
            }
          },

          error => {
            console.log(error);
            alert('something went wrong');
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.setState({image: downloadURL});
            });
          },
        );
      } catch (error) {
        console.log(error);
      }

      // end
    });
  };

  // getLogin Data
  getData = () => {
    AsyncStorage.getItem('ServiceProviderData').then(value => {
      const data = JSON.parse(value);
      if (data !== null) {
        this.setState({Email: data}, () => {
          this.DETAILS(this.state.Email);
        });
      }
    });
  };

  // GETINS USER DETAILS
  DETAILS = value => {
    const params = {
      Email: value,
    };

    // ASY
    axiosInstance
      .post(baseUrl + '/service-provider/ServiceProviderData', params)
      .then(res => {
        this.setState({userDetails: res.data.user[0]}, () => {
          console.log(this.state.userDetails.Firstname);
        });
      })
      .catch(error => {
        console.log(error);
      });
    // ASYC
  };

  submit = () => {
    const {
      Email,
      Name,
      Price,
      ServiceType,
      discription,
      image,
      test,
      StartHour,
      EndHour,
    } = this.state;

    if (
      Email !== '' &&
      Name !== '' &&
      Price !== '' &&
      ServiceType !== '' &&
      StartHour !== '' &&
      EndHour !== '' &&
      discription !== ''
    ) {
      if (image) {
        const params = {
          Email: Email,
          Name: Name,
          Price: Price,
          ServiceType: ServiceType,
          discription: discription,
          Startinghour: StartHour,
          EndingHour: EndHour,
          image: image,
          ServiceProviderName: this.state.userDetails.Firstname,
        };

        // ASY
        axiosInstance
          .post(baseUrl + '/service/', params)
          .then(res => {
            const userData = res.data;

            if (userData.status === 200) {
              alert('Data Submitted for Review');
              this.setState({
                Name: '',
                ServiceType: '',
                Price: '',
                discription: '',
                image: '',
              });
              this.componentDidMount();
            } else if (userData.status === 400) {
              alert(userData.msg);
            }
          })
          .catch(error => {
            alert(error);
          });
      } else {
        const params = {
          Email: Email,
          Name: Name,
          Price: Price,
          ServiceType: ServiceType,
          discription: discription,
          Startinghour: StartHour,
          EndingHour: EndHour,
          test: test,
          ServiceProviderName: this.state.userDetails.Firstname,
        };

        // ASY
        axiosInstance
          .post(baseUrl + '/service/', params)
          .then(res => {
            const userData = res.data;

            if (userData.status === 200) {
              alert('Data Submitted for Review');
              this.setState({
                Name: '',
                ServiceType: '',
                discription: '',
                Price: '',
                image: '',
              });
              // this.componentDidMount();
            } else if (userData.status === 400) {
              alert(userData.msg);
            }
          })
          .catch(error => {
            alert(error);
          });
      }

      // ASYC
    } else {
      alert('ALL FIELDS ARE REQUIRED');
    }
  };

  render() {
    return (
      <ScrollView style={styles.Container}>
        <Header text={'ADD SERVICES'} />
        <View style={styles.TopContainer}>
          <Text style={styles.text}>ENTER THE NAME OF SERVICE</Text>
          <AppInput
            IconName={'add'}
            Placeholder={'Name of the service'}
            onChangeText={Name => {
              this.setState({Name});
            }}
            value={this.state.Name}
          />
          <AppInput
            IconName={'add'}
            Placeholder={'Price of the service'}
            onChangeText={Price => {
              this.setState({Price});
            }}
            keyboardType={'numeric'}
            value={this.state.Price}
          />

          <View style={styles.RadioContainer}>
            {/* radio button */}
            <View style={styles.radiobutton}>
              {this.state.check3 === 'static' ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({check3: ''});
                  }}>
                  <View style={styles.Checkbtn} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      check3: 'static',
                      ServiceType: 'Armed Guard',
                    });
                  }}>
                  <View style={styles.unCheckbtn} />
                </TouchableOpacity>
              )}

              <Text>Static Guard</Text>
            </View>
            {/* radio button */}

            {/* radio button */}
            <View style={styles.radiobutton3}>
              {this.state.check3 === 'Survilance' ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({check3: ''});
                  }}>
                  <View style={styles.Checkbtn} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      check3: 'Survilance',
                      ServiceType: 'CCTV Desgin and Installtion',
                    });
                  }}>
                  <View style={styles.unCheckbtn} />
                </TouchableOpacity>
              )}

              <Text>Survelenc security</Text>
            </View>
            {/* radio button */}
          </View>
          <View style={styles.RadioContainer}>
            {/* radio button */}
            <View style={styles.radiobutton}>
              {this.state.check3 === 'Premises' ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({check3: ''});
                  }}>
                  <View style={styles.Checkbtn} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      check3: 'Premises',
                      ServiceType: 'Mall Security',
                    });
                  }}>
                  <View style={styles.unCheckbtn} />
                </TouchableOpacity>
              )}

              <Text>Premises Security</Text>
            </View>
            {/* radio button */}
          </View>
          <Text style={styles.text}>TYPE OF SERVICE</Text>
          <TouchableOpacity
            onPress={() => {
              this.setState({modalVisible: true});
            }}
            style={styles.TextBtn2}>
            <Text style={styles.btntext}>Select Service</Text>
          </TouchableOpacity>

          {/* picker */}

          {this.state.check3 === 'static' ? (
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                this.setState({modalVisible: false});
              }}>
              <View style={styles.Modalcontainer}>
                <View style={styles.ModalMainContainer}>
                  <Text style={styles.text}>SELECT YOUR SERVICE</Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        {
                          ServiceType: 'Armed Guard',
                          modalVisible: false,
                        },
                        () => {
                          ToastAndroid.show(
                            'Armed Guard Selected',
                            ToastAndroid.SHORT,
                          );
                        },
                      );
                    }}
                    style={styles.TextBtn}>
                    <Text style={styles.btntext}>Armed Guard</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        {
                          ServiceType: 'UnArmed Guard',
                          modalVisible: false,
                        },
                        () => {
                          ToastAndroid.show(
                            'UnArmed Guard Selected',
                            ToastAndroid.SHORT,
                          );
                        },
                      );
                    }}
                    style={styles.TextBtn}>
                    <Text style={styles.btntext}>UnArmed Guard</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        {
                          ServiceType: 'Body Guard',
                          modalVisible: false,
                        },
                        () => {
                          ToastAndroid.show(
                            'Body Guard Selected',
                            ToastAndroid.SHORT,
                          );
                        },
                      );
                    }}
                    style={styles.TextBtn}>
                    <Text style={styles.btntext}>Body Guard</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        {
                          ServiceType: 'Celebrity Protection',
                          modalVisible: false,
                        },
                        () => {
                          ToastAndroid.show(
                            'Celebrity Protection Selected',
                            ToastAndroid.SHORT,
                          );
                        },
                      );
                    }}
                    style={styles.TextBtn}>
                    <Text style={styles.btntext}>Celebrity Protection</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        {
                          ServiceType: 'Event Security',
                          modalVisible: false,
                        },
                        () => {
                          ToastAndroid.show(
                            'Event Security Selected',
                            ToastAndroid.SHORT,
                          );
                        },
                      );
                    }}
                    style={styles.TextBtn}>
                    <Text style={styles.btntext}>Event Security</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        {
                          ServiceType: 'Event Guard',
                          modalVisible: false,
                        },
                        () => {
                          ToastAndroid.show(
                            'Event Guard Selected',
                            ToastAndroid.SHORT,
                          );
                        },
                      );
                    }}
                    style={styles.TextBtn}>
                    <Text style={styles.btntext}>Event Guard</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          ) : null}
          {/* picker */}
          {this.state.check3 === 'Survilance' ? (
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                this.setState({modalVisible: false});
              }}>
              <View style={styles.Modalcontainer}>
                <View style={styles.ModalMainContainer}>
                  <Text style={styles.text}>SELECT YOUR SERVICE</Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        {
                          ServiceType: 'CCTV Desgin and Installtion',
                          modalVisible: false,
                        },
                        () => {
                          ToastAndroid.show(
                            'CCTV Desgin and Installtion Selected',
                            ToastAndroid.SHORT,
                          );
                        },
                      );
                    }}
                    style={styles.TextBtn}>
                    <Text style={styles.btntext}>
                      CCTV Desgin and Installtion
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        {
                          ServiceType: 'Number Plate Camera',
                          modalVisible: false,
                        },
                        () => {
                          ToastAndroid.show(
                            'Number Plate Camera Selected',
                            ToastAndroid.SHORT,
                          );
                        },
                      );
                    }}
                    style={styles.TextBtn}>
                    <Text style={styles.btntext}>Number Plate Camera</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        {
                          ServiceType: 'Facial recognization Camera',
                          modalVisible: false,
                        },
                        () => {
                          ToastAndroid.show(
                            'Facial recognization Camera Selected',
                            ToastAndroid.SHORT,
                          );
                        },
                      );
                    }}
                    style={styles.TextBtn}>
                    <Text style={styles.btntext}>
                      Facial recognization Camera
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        {
                          ServiceType: 'Network Camera',
                          modalVisible: false,
                        },
                        () => {
                          ToastAndroid.show(
                            'Network Camera Selected',
                            ToastAndroid.SHORT,
                          );
                        },
                      );
                    }}
                    style={styles.TextBtn}>
                    <Text style={styles.btntext}>Network Camera</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        {
                          ServiceType: 'Analog Camera',
                          modalVisible: false,
                        },
                        () => {
                          ToastAndroid.show(
                            'Analog Camera Selected',
                            ToastAndroid.SHORT,
                          );
                        },
                      );
                    }}
                    style={styles.TextBtn}>
                    <Text style={styles.btntext}>Analog Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        {
                          ServiceType: 'Remote Acess System',
                          modalVisible: false,
                        },
                        () => {
                          ToastAndroid.show(
                            'Remote Acess System Selected',
                            ToastAndroid.SHORT,
                          );
                        },
                      );
                    }}
                    style={styles.TextBtn}>
                    <Text style={styles.btntext}>Remote Acess System</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          ) : null}
          {/* picker */}
          {/* picker */}
          {this.state.check3 === 'Premises' ? (
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                this.setState({modalVisible: false});
              }}>
              <View style={styles.Modalcontainer}>
                <View style={styles.ModalMainContainer}>
                  <Text style={styles.text}>SELECT YOUR SERVICE</Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        {
                          ServiceType: 'Mall Security',
                          modalVisible: false,
                        },
                        () => {
                          ToastAndroid.show(
                            'Mall Security Selected',
                            ToastAndroid.SHORT,
                          );
                        },
                      );
                    }}
                    style={styles.TextBtn}>
                    <Text style={styles.btntext}>Mall Security</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        {
                          ServiceType: 'Office/Factory Security',
                          modalVisible: false,
                        },
                        () => {
                          ToastAndroid.show(
                            'Office/Factory Security Selected',
                            ToastAndroid.SHORT,
                          );
                        },
                      );
                    }}
                    style={styles.TextBtn}>
                    <Text style={styles.btntext}>Office/Factory Security</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        {
                          ServiceType: 'Housing Security',
                          modalVisible: false,
                        },
                        () => {
                          ToastAndroid.show(
                            'Housing Security Selected',
                            ToastAndroid.SHORT,
                          );
                        },
                      );
                    }}
                    style={styles.TextBtn}>
                    <Text style={styles.btntext}>Housing Security</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          ) : null}
          {/* picker */}

          {/* WORKING HOURS */}
          <Text style={styles.text}>WORKING HOURS</Text>
          {/* STart hour */}
          <Text>START FROM</Text>
          <View>
            <Button
              title="Starting Time"
              onPress={() => {
                this.showDatePicker();
              }}
            />
            <DateTimePickerModal
              isVisible={this.state.isDatePickerVisible}
              mode="time"
              onConfirm={time => {
                this.handleConfirm(time);
              }}
              onCancel={() => {
                this.hideDatePicker();
              }}
            />
          </View>

          {/* End Hour */}
          <Text>To</Text>
          <View>
            <Button
              title="Ending Time"
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

          <Text style={styles.text}>DISCRIPTION</Text>

          <TextInput
            onChangeText={discription => this.setState({discription})}
            style={styles.TextinputStyle}
            value={this.state.discription}
            placeholderTextColor={'#8F94FB'}
            placeholder={'Enter Discription'}
            multiline
          />

          <View style={styles.RadioContainer}>
            {/* radio button */}
            <View style={styles.radiobutton}>
              {this.state.check ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({check: !this.state.check});
                  }}>
                  <View style={styles.Checkbtn} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({check: !this.state.check, check2: false});
                  }}>
                  <View style={styles.unCheckbtn} />
                </TouchableOpacity>
              )}

              <Text>UPLOAD IMAGE</Text>
            </View>
            {/* radio button */}

            {/* radio button */}
            <View style={styles.radiobutton2}>
              {this.state.check2 ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({check2: !this.state.check2}, () => {
                      this.setState({test: ''});
                    });
                  }}>
                  <View style={styles.Checkbtn} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState(
                      {check2: !this.state.check2, check: false},
                      () => {
                        this.setState({test: 'I WILL GIVE TEST'}, () => {
                          alert(
                            'Admin will contact you to give physical skill test to prove your skill',
                          );
                        });
                      },
                    );
                  }}>
                  <View style={styles.unCheckbtn} />
                </TouchableOpacity>
              )}

              <Text>TEST</Text>
            </View>
            {/* radio button */}
          </View>

          {this.state.check ? (
            <Appbtn
              text={'Take Image'}
              onPress={() => {
                // this.selectFile();
                this.openCamera();
              }}
            />
          ) : null}
          <Appbtn
            onPress={() => {
              this.submit();
            }}
            text={'Submit Form'}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: h('330%'),
    backgroundColor: 'white',
  },
  TopContainer: {
    // backgroundColor: 'red',
    width: '100%',
    height: h('150%'),
    alignItems: 'center',
    paddingTop: 40,
  },
  TextinputContainer: {
    width: '90%',
    height: h('25%'),
    backgroundColor: 'silver',
    borderRadius: 10,
    fontSize: 18,
    padding: 10,
    color: 'white',
  },
  text: {
    color: '#8F94FB',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: h('2%'),
    marginBottom: 5,
  },
  radiobutton: {
    width: w('40%'),
    height: h('6%'),
    // backgroundColor: 'red',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  radiobutton2: {
    width: w('30%'),
    height: h('6%'),
    // backgroundColor: 'red',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  radiobutton3: {
    width: w('40%'),
    height: h('6%'),
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
  RadioContainer: {
    // backgroundColor: 'red',
    width: '100%',
    height: h('7%'),
    flexDirection: 'row',
    justifyContent: 'center',
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
  Modalcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0003',
  },
  ModalMainContainer: {
    backgroundColor: 'white',
    width: '90%',
    height: '70%',
    alignItems: 'center',
    paddingTop: h('2%'),
  },
  TextBtn: {
    width: '90%',
    height: h('6%'),
    backgroundColor: '#8F94FB',
    marginTop: h('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: h('1%'),
  },
  TextBtn2: {
    width: '50%',
    height: h('6%'),
    backgroundColor: '#8F94FB',
    marginTop: h('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: h('1%'),
  },
  btntext: {
    color: 'white',
    fontSize: h('2%'),
    fontWeight: 'bold',
  },
});
