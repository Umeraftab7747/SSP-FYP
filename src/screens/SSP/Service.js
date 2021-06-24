/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Button,
} from 'react-native';
import {Header, Appbtn, AppInput} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {Picker} from '@react-native-picker/picker';
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

    // all field for backend
    Email: '',
    Name: '',
    Price: '',
    ServiceType: 'Armed Guard',
    discription: '',
    image: '',
    test: '',

    // datepicker 2
    isDatePickerVisible: false,
    isDatePickerVisible2: false,
    StartHour: '',
    EndHour: '',
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
        this.setState({Email: data});
      }
    });
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
        };

        // ASY
        axiosInstance
          .post(baseUrl + '/service/', params)
          .then(res => {
            const userData = res.data;
            console.log(userData);
            if (userData.status === 200) {
              alert('Data Submitted for Review');
              this.setState({
                Name: '',
                ServiceType: 'Armed Guard',
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
        };

        // ASY
        axiosInstance
          .post(baseUrl + '/service/', params)
          .then(res => {
            const userData = res.data;
            console.log(userData);
            if (userData.status === 200) {
              alert('Data Submitted for Review');
              this.setState({
                Name: '',
                ServiceType: 'Armed Guard',
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
                    this.setState({check3: 'static'});
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
                    this.setState({check3: 'Survilance'});
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
                    this.setState({check3: 'Premises'});
                  }}>
                  <View style={styles.unCheckbtn} />
                </TouchableOpacity>
              )}

              <Text>Premises Security</Text>
            </View>
            {/* radio button */}
          </View>
          <Text style={styles.text}>TYPE OF SERVICE</Text>

          {/* picker */}

          {this.state.check3 === 'static' ? (
            <Picker
              selectedValue={this.state.ServiceType}
              style={{
                height: h('7%'),
                width: w('70%'),
                color: '#8F94FB',
              }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ServiceType: itemValue})
              }>
              <Picker.Item label="Armed Guard" value="Armed Guard" />
              <Picker.Item label="UnArmed Guard" value="UnArmed Guard" />
              <Picker.Item label="Body Guard" value="Body Guard" />
              <Picker.Item
                label="Celebrity Protection"
                value="Celebrity Protection"
              />
              <Picker.Item label="Event Security" value="Event Security" />
              <Picker.Item label="Event Guard" value="Event Guard" />
            </Picker>
          ) : null}
          {/* picker */}
          {this.state.check3 === 'Survilance' ? (
            <Picker
              selectedValue={this.state.ServiceType}
              style={{
                height: h('7%'),
                width: w('50%'),
                color: '#8F94FB',
              }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ServiceType: itemValue})
              }>
              <Picker.Item
                label="CCTV Desgin and Installtion"
                value="CCTV Desgin and Installtion"
              />
              <Picker.Item
                label="Number Plate Camera"
                value="Number Plate Camera"
              />
              <Picker.Item
                label="Facial recognization Camera"
                value="Facial recognization Camera"
              />
              <Picker.Item label="Network Camera" value="Network Camera" />
              <Picker.Item label="Analog Camera" value="Analog Camera" />
              <Picker.Item
                label="Remote Acess System"
                value="Remote Acess System"
              />
            </Picker>
          ) : null}
          {/* picker */}
          {/* picker */}
          {this.state.check3 === 'Premises' ? (
            <Picker
              selectedValue={this.state.ServiceType}
              style={{
                height: h('7%'),
                width: w('50%'),
                color: '#8F94FB',
              }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ServiceType: itemValue})
              }>
              <Picker.Item label="Mall Security" value="Mall Security" />
              <Picker.Item
                label="Office/Factory Security"
                value="Office/Factory Security"
              />
              <Picker.Item label="Housing Security" value="Housing Security" />
            </Picker>
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
});
