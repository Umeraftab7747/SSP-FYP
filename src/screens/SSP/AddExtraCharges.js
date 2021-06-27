import React, {Component} from 'react';
import {Text, StyleSheet, View, TextInput, Modal, FlatList} from 'react-native';
import {Header, Appbtn, AppInput} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {axiosInstance, baseUrl} from '../api';

export class AddExtraCharges extends Component {
  state = {
    ExtraPrice: '',
    data: [],
  };

  componentDidMount() {
    const abc = this.props.route.params.data;
    this.setState({data: abc}, () => {
      //   console.log(this.state.data);
    });
  }

  submitFoam = id => {
    if (this.state.ExtraPrice !== '') {
      const params = {
        ServiceId: id,
        ExtraPrice: this.state.ExtraPrice,
      };

      axiosInstance
        .post(baseUrl + '/billing/updatebill', params)
        .then(res => {
          this.props.navigation.navigate('ServiceproviderBottomtab');
        })
        .catch(error => {
          if (error) {
            console.log('BUTTON PRESS');
            console.log(error);
          }
        });
    } else {
      alert('KINDLY ADD EXTRA CHARGES');
    }
  };

  render() {
    return (
      <View style={styles.Container}>
        <Header text={'BOOKING DETAILS'} />
        <AppInput
          IconName={'add'}
          Placeholder={'ADD EXTRA CHARGES'}
          onChangeText={ExtraPrice => {
            this.setState({ExtraPrice});
          }}
        />

        <Appbtn
          onPress={() => {
            this.submitFoam(this.state.data);
          }}
          text={'Submit'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
  },
});
