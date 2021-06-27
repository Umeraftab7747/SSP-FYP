import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Header} from '../../Components';
import {w, h} from 'react-native-responsiveness';

export class AdminStatiGurad extends Component {
  render() {
    return (
      <View style={styles.Container}>
        <Header text={'Sub-Category'} />
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Equipment', {
              data: 'Armed Guard',
            });
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>Armed Guard</Text>
        </TouchableOpacity>
        {/* btn */}
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Equipment', {
              data: 'UnArmed Guard',
            });
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>UnArmed Guard</Text>
        </TouchableOpacity>
        {/* btn */}
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Equipment', {
              data: 'Body Guard',
            });
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>BodyGuard</Text>
        </TouchableOpacity>
        {/* btn */}
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Equipment', {
              data: 'Celebrity Protection',
            });
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>Celebrity Protection</Text>
        </TouchableOpacity>
        {/* btn */}
        {/* btn */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Equipment', {
              data: 'Event Security',
            });
          }}
          style={styles.Btn}>
          <Text style={styles.BtnText}>Event Guard</Text>
        </TouchableOpacity>
        {/* btn */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  Btn: {
    width: w('70%'),
    height: h('7%'),
    backgroundColor: '#8F94FB',
    marginTop: h('2%'),
    borderRadius: h('1%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  BtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: h('2.5%'),
  },
});
