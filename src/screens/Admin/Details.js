import React, {Component} from 'react';
import {Text, StyleSheet, View, TextInput} from 'react-native';
import {Header, Appbtn} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {axiosInstance, baseUrl} from '../api';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';

export class Details extends Component {
  state = {
    data: '',
    Message: '',
  };

  componentDidMount() {
    const xyz = this.props.route.params.otherData;
    this.setState({data: xyz});
  }

  request = (_id, isVerified, Message) => {
    const params = {
      _id: _id,
      Message: Message,
      isVerified: isVerified,
    };
    axiosInstance
      .post(baseUrl + `/service/Reject`, params)
      .then(res => {
        const userData = res.data;
        console.log(userData);
        if (userData.status === 200) {
          this.props.navigation.goBack();
        }

        if (userData.status === 404) {
          // console.log('404 status');
        }
      })
      .catch(error => {
        // console.log('error catch status');
      });
  };

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.Container}>
          <Header text={'SERVICE DETAILS'} />
          <View style={styles.UpperContainer}>
            <Text style={styles.LoginText}>DETAILS</Text>
            {/* detils */}
            <View style={styles.DetailsContainer}>
              <Text style={styles.LoginText2}>
                Service Name: {this.state.data.ServiceName}
              </Text>
              <Text style={styles.LoginText2}>
                ServiceType: {this.state.data.ServiceType}
              </Text>
              <Text style={styles.LoginText2}>
                EMAIL: {this.state.data.Email}
              </Text>
              <Text style={styles.LoginText2}>
                Discription: {this.state.data.discription}
              </Text>
            </View>
            {/* detils */}
            <Appbtn
              onPress={() => {
                let isVerified = true;

                this.request(
                  this.state.data._id,
                  isVerified,
                  this.state.Message,
                );
              }}
              text={'APPROVE'}
            />
          </View>
          <View style={styles.LowerContainer}>
            <Text style={styles.LoginText}>MESSAGE</Text>
            <TextInput
              onChangeText={Message => {
                this.setState({Message});
              }}
              style={styles.TextinputStyle}
              placeholderTextColor={'#8F94FB'}
              placeholder={'Enter Reason for DisApprove'}
              multiline
            />
            <Appbtn
              onPress={() => {
                let isVerified = false;

                this.request(
                  this.state.data._id,
                  isVerified,
                  this.state.Message,
                );
              }}
              text={'Dis-APPROVE'}
            />
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
    height: h('40%'),
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  LowerContainer: {
    width: w('100%'),
    height: h('40%'),
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
