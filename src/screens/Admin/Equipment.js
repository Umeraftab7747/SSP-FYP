import React, {Component} from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import {Header, Appbtn, AppInput} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {axiosInstance, baseUrl} from '../api';

export class Equipment extends Component {
  state = {
    data: '',
    Message: '',
    Name: '',
    Price: '',
    Company: '',
    discription: '',
  };

  componentDidMount() {
    const xyz = this.props.route.params.data;
    this.setState({data: xyz}, () => {
      console.log(this.state.data);
    });
  }

  Submit = () => {
    const {Name, Price, Company, discription} = this.state;
    const params = {
      EquipmentCategory: this.state.data,
      Equipmentname: Name,
      Companyname: Company,
      EquipmentPrice: Price,
      discription: discription,
    };

    // ASY
    axiosInstance
      .post(baseUrl + '/admin/Equipment', params)
      .then(res => {
        this.props.navigation.goBack();
        alert('EQUIPMENT ADDED');
      })
      .catch(error => {
        console.log(error);
      });
    // ASYC
  };

  render() {
    return (
      <View style={styles.Container}>
        <Header text={'New Equipment'} />
        <AppInput
          IconName={'add'}
          onChangeText={Name => {
            this.setState({Name});
          }}
          Placeholder={'Equipment Name'}
        />
        <AppInput
          IconName={'add'}
          onChangeText={Company => {
            this.setState({Company});
          }}
          Placeholder={'Company Name'}
        />
        <AppInput
          IconName={'add'}
          onChangeText={Price => {
            this.setState({Price});
          }}
          Placeholder={'Equipment Price'}
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
          text={'SUBMIT'}
          onPress={() => {
            this.Submit();
          }}
        />
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
