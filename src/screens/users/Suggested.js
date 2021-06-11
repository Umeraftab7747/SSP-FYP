/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import {Header, Appbtn} from '../../Components';
import {w, h} from 'react-native-responsiveness';

export class Suggested extends Component {
  state = {
    data: [],
  };
  componentDidMount() {
    const xyz = this.props.route.params.data;
    this.setState({data: xyz}, () => {
      console.log(this.state.data);
    });
  }
  render() {
    return (
      <ScrollView style={styles.Container}>
        <Header text={'Suggest Security Plan'} />
        <View style={styles.TopContainer}>
          <Text style={styles.Question}>
            We recomend you the following Security Plans for your house:
          </Text>
          <Text style={styles.Question2}>
            1. Total {this.state.data.bodyGurad} Bodyguard on each Enternce of
            your house.
          </Text>
          <Text style={styles.Question2}>
            2. Total {this.state.data.outsideCCTV} CCTV camers, on each Enternce
            to cover outside view of house.
          </Text>
          <Text style={styles.Question2}>
            3. Total {this.state.data.insideCCTV} CCTV camers, on each Enternce
            to cover inside view of house.
          </Text>
          <Text style={styles.Question2}>
            4. Total {this.state.data.gasSensor} Gas Leakeage Detector for each.
            kitchen in house
          </Text>
          <Text style={styles.Question2}>
            5. Total {this.state.data.FireAlrm} Fire/Smoke Detector for house.
          </Text>
          <Text style={styles.Question2}>
            6. Total {this.state.data.CCTV} CCTV camers, inside house to in such
            a way that it will cover all the rooms from outside.
          </Text>
          <Text style={styles.Question2}>
            7. Total 1 CCTV camers, on the roof in such a way it will cover
            enter/exit sport of roof.
          </Text>
          <Text style={styles.Question2}>
            8. Total {this.state.data.controlRoom} Control room in house to
            monitor Everything.
          </Text>
          <Text style={styles.Question2}>
            9. Electercity failure detector in the main connection of
            electricity of house.
          </Text>
          <Text style={styles.Question2}>
            10. Electeric Fence is {this.state.data.fencingWall} around the
            house.
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: h('100%'),
  },
  TopContainer: {
    width: '100%',
    height: h('115%'),
    paddingLeft: h('3%'),
    paddingRight: h('3%'),
    paddingTop: h('2%'),
  },
  Question: {
    fontSize: h('2.5%'),
    color: '#8F94fc',
    fontWeight: 'bold',
  },
  Question2: {
    fontSize: h('2.5%'),
    color: '#8F94fc',
    fontWeight: 'bold',
    marginTop: h('4%'),
  },
});
