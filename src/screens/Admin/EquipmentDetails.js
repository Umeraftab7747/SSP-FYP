import React, {Component} from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import {Header, Appbtn, AppInput} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {axiosInstance, baseUrl} from '../api';

export class EquipmentDetails extends Component {
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
      this.setState({
        Name: this.state.data.Equipmentname,
        Company: this.state.data.Companyname,
        discription: this.state.data.discription,
        Price: this.state.data.EquipmentPrice,
      });
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
      .post(baseUrl + '/admin/UpdateEquipment', params)
      .then(res => {
        this.props.navigation.goBack();
        alert('EQUIPMENT Updated');
      })
      .catch(error => {
        console.log(error);
      });
    // ASYC
  };

  render() {
    return (
      <View style={styles.Container}>
        <Header text={'Equipment'} />
        <AppInput
          IconName={'add'}
          value={this.state.Name}
          onChangeText={Name => {
            this.setState({Name});
          }}
          Placeholder={'Equipment Name'}
        />
        <AppInput
          IconName={'add'}
          value={this.state.Company}
          onChangeText={Company => {
            this.setState({Company});
          }}
          Placeholder={'Company Name'}
        />
        <AppInput
          IconName={'add'}
          value={this.state.Price}
          onChangeText={Price => {
            this.setState({Price});
          }}
          Placeholder={'Equipment Price'}
        />

        <TextInput
          value={this.state.discription}
          onChangeText={discription => this.setState({discription})}
          style={styles.TextinputStyle}
          placeholderTextColor={'#8F94FB'}
          placeholder={'Enter Discription'}
          multiline
        />

        <Appbtn
          text={'UPDATE'}
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
