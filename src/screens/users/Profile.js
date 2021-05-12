import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import {Header, Appbtn, AppInput} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {axiosInstance, baseUrl} from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class Profile extends Component {
  state = {
    Name: 'Umer',
    Email: 'Umeraftab4422@gmail.com',
    Cnic: '',
    Phone: '+92',
  };
  render() {
    return (
      <View style={styles.Container}>
        <Header text={'UPDATE PROFILE'} />
        <View style={styles.EditBox}>
          {/* edit info */}
          <AppInput
            IconName={'person'}
            onChangeText={Name => {
              this.setState({Name});
            }}
            value={this.state.Name}
          />
          {/* edit info */}
          <AppInput
            IconName={'mail'}
            onChangeText={Email => {
              this.setState({Email});
            }}
            value={this.state.Email}
          />
          {/* edit info */}
          <AppInput
            IconName={'card'}
            onChangeText={Cnic => {
              this.setState({Cnic});
            }}
            value={this.state.Cnic}
          />
          {/* edit info */}
          <AppInput
            maxLength={13}
            IconName={'call'}
            onChangeText={Phone => {
              this.setState({Phone});
            }}
            value={this.state.Phone}
          />
          <Appbtn text={'Update'} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
  },
  EditBox: {
    width: '100%',
    height: h('70%'),
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
