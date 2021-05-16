import React, {Component} from 'react';
import {Text, StyleSheet, View, TextInput} from 'react-native';
import {Header, Appbtn} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {axiosInstance, baseUrl} from '../api';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';

export class BookingDetails extends Component {
  state = {
    data: [],
    disputeMessage: '',
  };

  componentDidMount() {
    const xyz = this.props.route.params.ShareData;
    this.setState({data: xyz}, () => {});
  }

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
});
