/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Header, Appbtn, AppInput} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {Picker} from '@react-native-picker/picker';
import {axiosInstance, baseUrl} from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class EditService extends Component {
  state = {
    options: '',
    check: true,
    check2: false,
    check3: 'static',

    // all field for backend
    Email: '',
    Name: '',
    ServiceType: 'Armed Guard',
    discription: '',
    image: '',
    test: '',
    data: '',
  };

  componentDidMount() {
    const abc = this.props.route.params.ShareData;
    this.setState({data: abc});
    this.getData();
  }

  getData = () => {
    AsyncStorage.getItem('ServiceProviderData')
      .then(value => {
        const data = JSON.parse(value);
        if (data !== null) {
          this.setState({Email: data});
        }
      })
      .done();
  };

  update = id => {
    const {Email, Name, ServiceType, discription, image, test} = this.state;
    if (
      Email !== '' &&
      Name !== '' &&
      ServiceType !== '' &&
      discription !== ''
    ) {
      if (image === '') {
        const params = {
          _id: id,
          Email: Email,
          Name: Name,
          ServiceType: ServiceType,
          discription: discription,
          image: image,
        };

        // ASY
        axiosInstance
          .post(baseUrl + '/service/update', params)
          .then(res => {
            const userData = res.data;
            console.log(userData);
            if (userData.status === 200) {
              alert('Data Submitted for Review');
              this.props.navigation.goBack();
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
          ServiceType: ServiceType,
          discription: discription,
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
                ServiceType: '',
                discription: '',
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
        <Header text={'EDIT SERVICES'} />
        <View style={styles.TopContainer}>
          <Text style={styles.text}>ENTER THE NAME OF SERVICE</Text>
          <AppInput
            IconName={'add'}
            Placeholder={'Name of the service'}
            onChangeText={Name => {
              this.setState({Name});
            }}
            value={this.state.data.ServiceName}
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

              <Text>Survilance Guard</Text>
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
                value="english"
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
              <Picker.Item label="Mall Security" value="english" />
              <Picker.Item label="Office/Factory Security" value="urdu" />
              <Picker.Item label="Housing Security" value="urdu" />
            </Picker>
          ) : null}
          {/* picker */}

          <Text style={styles.text}>DISCRIPTION</Text>

          <TextInput
            onChangeText={discription => this.setState({discription})}
            style={styles.TextinputStyle}
            placeholderTextColor={'#8F94FB'}
            placeholder={'Enter Discription'}
            multiline
            value={this.state.data.discription}
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
                        this.setState({test: 'I WILL GIVE TEST'});
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
              text={'Image Upload'}
              onPress={() => {
                // this.selectFile();
                this.pickFromGallery();
              }}
            />
          ) : null}
          <Appbtn
            onPress={() => {
              this.update(this.state.data._id);
            }}
            text={'Update Form'}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: h('130%'),
    backgroundColor: 'white',
    // alignItems: 'center',
  },
  TopContainer: {
    // backgroundColor: 'red',
    width: '100%',
    height: h('110%'),
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
