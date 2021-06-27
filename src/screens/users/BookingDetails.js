import React, {Component} from 'react';
import {Text, StyleSheet, View, TextInput, Modal, FlatList} from 'react-native';
import {Header, Appbtn} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {axiosInstance, baseUrl} from '../api';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';

export class BookingDetails extends Component {
  state = {
    data: [],
    disputeMessage: '',
    modalVisible: false,
    tools: [],
    filterTools: [],
    BillData: [],
  };

  componentDidMount() {
    const xyz = this.props.route.params.ShareData;
    this.setState({data: xyz}, () => {
      // console.log(this.state.data.ServiceId);
      this.Equipments();
    });
  }

  Equipments = () => {
    const params = {
      ServiceId: this.state.data.ServiceId,
    };

    axiosInstance
      .post(baseUrl + '/billing/findbill', params)
      .then(res => {
        const userData = res.data;

        this.setState(
          {tools: userData.user[0].tools, BillData: userData.user[0]},
          () => {
            console.log(this.state.BillData);
          },
        );
      })
      .catch(error => {
        if (error) {
          console.log(error);
        }
      });
  };

  Completed = () => {
    const params = {
      id: this.state.data._id,
    };

    axiosInstance
      .post(baseUrl + '/booking/Completed', params)
      .then(res => {
        const userData = res.data;
        this.props.navigation.navigate('RateService', {
          Details: this.state.data,
        });
        if (userData.status === '200') {
          this.props.navigation.navigate('RateService', {
            Details: this.state.data,
          });
        }
      })
      .catch(error => {
        if (error) {
          alert('Something Went Wrong');
        }
      });
  };

  Disputed = () => {
    if (this.state.disputeMessage === '') {
      alert('ENTER THE DISPUTE REASON');
    } else {
      const params = {
        id: this.state.data._id,
        Disputedby: this.state.data.UserName,
        Message: this.state.disputeMessage,
      };

      axiosInstance
        .post(baseUrl + '/booking/Dispute', params)
        .then(res => {
          this.props.navigation.goBack();
        })
        .catch(error => {
          if (error) {
            alert('Something Went Wrong');
          }
        });
    }
  };

  cancel = () => {
    const params = {
      _id: this.state.data._id,
    };

    // ASY
    axiosInstance
      .post(baseUrl + '/booking/deleteBooking', params)
      .then(res => {
        const userData = res.data;
        if (userData.status === 200) {
          alert('BOOKING CANCELED');
          this.props.navigation.goBack();
        }
      })
      .catch(error => {
        console.log(error);
      });
    // ASYC
  };

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.Container}>
          <Header text={'BOOKING DETAILS'} />
          <View style={styles.UpperContainer}>
            <Text style={styles.LoginText}>DETAILS</Text>
            {/* detils */}
            <View style={styles.DetailsContainer}>
              <Text style={styles.LoginText2}>
                UserName: {this.state.data.UserName}
              </Text>
              <Text style={styles.LoginText2}>
                Service Name: {this.state.data.ServiceName}
              </Text>
              <Text style={styles.LoginText2}>
                ServiceType: {this.state.data.ServiceType}
              </Text>
              <Text style={styles.LoginText2}>
                EMAIL: {this.state.data.ServiceProviderEmail}
              </Text>
            </View>
            {/* detils */}

            <Appbtn
              onPress={() => {
                if (this.state.tools) {
                  this.setState({modalVisible: true});
                } else {
                  alert('HELLOW');
                }
              }}
              text={'BOOKING DETAILS'}
            />
            {this.state.data.ServiceproviderAprove === true ? (
              <Appbtn
                onPress={() => {
                  this.Completed();
                }}
                text={'COMPLETED'}
              />
            ) : null}

            {/* UPDATE */}

            {this.state.data.ServiceproviderAprove === false ? (
              <Appbtn
                onPress={() => {
                  this.props.navigation.navigate('UpdateBooking', {
                    id: this.state.data._id,
                  });
                }}
                text={'UPDATE BOOKING'}
              />
            ) : null}

            {/* UPDATE */}
          </View>
          <View style={styles.LowerContainer}>
            {this.state.data.ServiceproviderAprove === true ? (
              <>
                <Text style={styles.LoginText}>Dispute Reason</Text>
                <TextInput
                  onChangeText={disputeMessage => {
                    this.setState({disputeMessage});
                  }}
                  style={styles.TextinputStyle}
                  placeholderTextColor={'#8F94FB'}
                  placeholder={'Enter Reason for Dispute'}
                  multiline
                />
                <Appbtn
                  onPress={() => {
                    this.Disputed();
                  }}
                  text={'DISPUTE'}
                />
              </>
            ) : null}

            {this.state.data.ServiceproviderAprove === false ? (
              <Appbtn
                onPress={() => {
                  this.cancel();
                }}
                text={'CANCEL ORDER'}
              />
            ) : null}
          </View>
        </View>

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
              <Text style={styles.LoginText}>Equipments/Charges</Text>
              <View style={styles.TEXTCONTAINER}>
                <FlatList
                  data={this.state.BillData.tools}
                  renderItem={({item}) => (
                    <View style={styles.radiobutton}>
                      <Text style={styles.LoginText2}>Name:{item.name} </Text>
                      <Text style={styles.LoginText2}>Price:{item.price}</Text>
                    </View>
                  )}
                  keyExtractor={item => Math.random().toString()}
                />

                <Text style={styles.LoginText2}>
                  Service Price:{this.state.BillData.ServicePrice}
                </Text>
                {this.state.BillData.ExtraPrice ? (
                  <Text style={styles.LoginText2}>
                    Extra Charges:{this.state.BillData.ExtraPrice}
                  </Text>
                ) : null}

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
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
  },
  UpperContainer: {
    width: w('100%'),
    height: h('50%'),
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  LowerContainer: {
    width: w('100%'),
    height: h('50%'),
    // backgroundColor: 'purple',
    alignItems: 'center',
  },
  LoginText: {
    color: '#8F94FB',
    fontSize: h('3%'),
    fontWeight: 'bold',
  },
  LoginText2: {
    color: '#8F94FB',
    fontSize: h('2.4%'),
    fontWeight: 'bold',
  },
  DetailsContainer: {
    width: w('90%'),
    height: h('25%'),
    justifyContent: 'center',
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

  TEXTCONTAINER: {
    width: '100%',
    height: '84%',
    // backgroundColor: 'red',
    paddingTop: h('2%'),
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
});
