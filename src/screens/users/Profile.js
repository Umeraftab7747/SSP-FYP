import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {AppInput, Header} from '../../Components';

export class Profile extends Component {
  state = {
    Name: '',
    Email: '',
    Cnic: '',
    Phone: '',
  };
  render() {
    return (
      <View style={styles.Container}>
        <Header text={'UPDATE PROFILE'} />
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
          IconName={'id-card'}
          onChangeText={Cnic => {
            this.setState({Cnic});
          }}
          value={this.state.Cnic}
        />
        {/* edit info */}
        <AppInput
          IconName={'call'}
          onChangeText={Phone => {
            this.setState({Phone});
          }}
          value={this.state.Phone}
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
