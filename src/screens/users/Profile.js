import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {AppInput, Header} from '../../Components';

export class Profile extends Component {
  state = {
    Name: '',
  };
  render() {
    return (
      <View style={styles.Container}>
        <Header text={'UPDATE PROFILE'} />
        {/* edit info */}
        <AppInput
          IconName={'add'}
          Placeholder={'Name of the service'}
          onChangeText={Name => {
            this.setState({Name});
          }}
          value={this.state.Name}
        />
        {/* edit info */}
        <AppInput
          IconName={'add'}
          Placeholder={'Name of the service'}
          onChangeText={Name => {
            this.setState({Name});
          }}
          value={this.state.Name}
        />
        {/* edit info */}
        <AppInput
          IconName={'add'}
          Placeholder={'Name of the service'}
          onChangeText={Name => {
            this.setState({Name});
          }}
          value={this.state.Name}
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
