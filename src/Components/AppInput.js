import React, {Component} from 'react';
import {Text, StyleSheet, View, TextInput} from 'react-native';
import {Icon} from 'react-native-elements';
import {w, h} from 'react-native-responsiveness';

export class AppInput extends Component {
  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.LogoContainer}>
          <Icon name={this.props.IconName} type="ionicon" color="#8F94FB" />
        </View>
        <TextInput
          maxLength={this.props.maxLength}
          {...this.props}
          style={styles.TextInput}
          placeholder={this.props.Placeholder}
          placeholderTextColor={'#8F94FB'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    // backgroundColor: 'red',
    width: w('80%'),
    height: h('6%'),
    flexDirection: 'row',
    borderColor: 'rgba(78, 84, 200, 0.5)',
    borderWidth: h('0.2%'),
    borderRadius: h('1%'),
    marginTop: h('1%'),
  },
  TextInput: {
    width: '85%',
    height: '100%',
    // backgroundColor: 'green',
    color: 'rgba(78, 84, 200, 1)',
  },
  LogoContainer: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
