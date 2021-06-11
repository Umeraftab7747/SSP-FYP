/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import {Header, Appbtn} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {Picker} from '@react-native-picker/picker';

export class Suggestion extends Component {
  state = {
    marla: '1-3',
    Enternceorexits: '1',
    OpenWall: 'Yes',
    Kitchen: '1',
    room: '1-3',
    root: 'open',
    controlRoom: 0,
    bodyGurad: 3,
    insideCCTV: 1,
    outsideCCTV: 1,
    CCTV: 1,
    fencingWall: 'required',
    FireAlrm: 2,
    gasSensor: 1,
  };

  SubmitFoam = () => {
    const {
      marla,
      Enternceorexits,
      OpenWall,
      Kitchen,
      room,
      root,
      controlRoom,
      bodyGurad,
      insideCCTV,
      CCTV,
      outsideCCTV,
      fencingWall,
      gasSensor,
      FireAlrm,
    } = this.state;

    if (
      marla === '1-3' ||
      Enternceorexits === '1' ||
      OpenWall === 'Yes' ||
      Kitchen === '1' ||
      room === '1-3' ||
      root === 'open'
    ) {
      const params = {
        controlRoom,
        bodyGurad,
        insideCCTV,
        CCTV,
        outsideCCTV,
        fencingWall,
        gasSensor,
        FireAlrm,
      };
      this.props.navigation.navigate('Suggested', {data: params});
    } else {
      const params = {
        controlRoom,
        bodyGurad,
        insideCCTV,
        CCTV,
        outsideCCTV,
        fencingWall,
        gasSensor,
        FireAlrm,
      };
      this.props.navigation.navigate('Suggested', {data: params});
    }
  };

  render() {
    return (
      <ScrollView style={styles.Container}>
        <Header text={'SUGGESTION'} />

        <View style={styles.TopContainer}>
          <Text style={styles.HeaderText}>HOUSE SECURTIY PLAN</Text>

          <Text style={styles.MarlaHouseText}>No. of Marla of your house </Text>

          {/* MARLA CONTINAER */}
          <Picker
            selectedValue={this.state.marla}
            style={{
              height: h('7%'),
              width: w('40%'),
              color: '#8F94FB',
            }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({marla: itemValue}, () => {
                if (this.state.marla === '1-3') {
                  this.setState({controlRoom: 0});
                } else if (this.state.marla === '4-7') {
                  this.setState({controlRoom: 0});
                } else if (this.state.marla === '8-10') {
                  this.setState({controlRoom: 1});
                }
              })
            }>
            <Picker.Item label="1-3" value="1-3" />
            <Picker.Item label="4-7" value="4-7" />
            <Picker.Item label="8-10" value="8-10" />
          </Picker>

          {/* CONTINAER */}

          <Text style={styles.MarlaHouseText}>
            No. of Enternce/exist in the house
          </Text>
          {/* Enternceorexits CONTINAER */}
          <Picker
            selectedValue={this.state.Enternceorexits}
            style={{
              height: h('7%'),
              width: w('35%'),
              color: '#8F94FB',
            }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({Enternceorexits: itemValue}, () => {
                if (this.state.Enternceorexits === '1') {
                  this.setState({
                    bodyGurad: 1,
                    insideCCTV: 1,
                    outsideCCTV: 1,
                  });
                } else if (this.state.Enternceorexits === '2') {
                  this.setState({
                    bodyGurad: 2,
                    insideCCTV: 2,
                    outsideCCTV: 2,
                  });
                } else if (this.state.Enternceorexits === '3') {
                  this.setState({
                    bodyGurad: 3,
                    insideCCTV: 3,
                    outsideCCTV: 4,
                  });
                }
              })
            }>
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
          </Picker>

          {/* CONTINAER */}

          <Text style={styles.MarlaHouseText}>
            Is there any open wall in your home ?
          </Text>
          {/* OpenWall CONTINAER */}
          <Picker
            selectedValue={this.state.OpenWall}
            style={{
              height: h('7%'),
              width: w('35%'),
              color: '#8F94FB',
            }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({OpenWall: itemValue}, () => {
                if (this.state.OpenWall === 'Yes') {
                  this.setState({fencingWall: 'required'});
                } else if (this.state.OpenWall === 'No') {
                  this.setState({fencingWall: 'Not required'});
                }
              })
            }>
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>

          {/* CONTINAER */}

          <Text style={styles.MarlaHouseText}>No of Kitchen in your home?</Text>
          {/* Kitchen CONTINAER */}
          <Picker
            selectedValue={this.state.Kitchen}
            style={{
              height: h('7%'),
              width: w('35%'),
              color: '#8F94FB',
            }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({Kitchen: itemValue}, () => {
                if (this.state.Kitchen === '1') {
                  this.setState({
                    FireAlrm: 2,
                    gasSensor: 1,
                  });
                } else if (this.state.Kitchen === '2') {
                  this.setState({
                    FireAlrm: 2,
                    gasSensor: 2,
                  });
                } else if (this.state.Kitchen === '3') {
                  this.setState({
                    FireAlrm: 6,
                    gasSensor: 3,
                  });
                }
              })
            }>
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
          </Picker>

          {/* CONTINAER */}

          <Text style={styles.MarlaHouseText}>No of room in your house?</Text>
          {/* room CONTINAER */}
          <Picker
            selectedValue={this.state.room}
            style={{
              height: h('7%'),
              width: w('35%'),
              color: '#8F94FB',
            }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({room: itemValue}, () => {
                if (this.state.room === '1-3') {
                  this.setState({
                    CCTV: 1,
                  });
                } else if (this.state.room === '4-7') {
                  this.setState({
                    CCTV: 3,
                  });
                } else if (this.state.room === '8-11') {
                  this.setState({
                    CCTV: 5,
                  });
                } else if (this.state.room === '12-15') {
                  this.setState({
                    CCTV: 7,
                  });
                }
              })
            }>
            <Picker.Item label="1-3" value="1-3" />
            <Picker.Item label="4-7" value="4-7" />
            <Picker.Item label="8-11" value="8-11" />
            <Picker.Item label="12-15" value="12-15" />
          </Picker>

          {/* CONTINAER */}

          <Text style={styles.MarlaHouseText}>
            Which type of root your house has?
          </Text>
          {/* root CONTINAER */}
          <Picker
            selectedValue={this.state.root}
            style={{
              height: h('7%'),
              width: w('35%'),
              color: '#8F94FB',
            }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({root: itemValue}, () => {
                if (this.state.root === 'open') {
                  this.setState({fencingWall: 'required'});
                } else if (this.state.root === 'close') {
                  this.setState({fencingWall: 'Not required'});
                }
              })
            }>
            <Picker.Item label="open" value="open" />
            <Picker.Item label="close" value="close" />
          </Picker>

          {/* CONTINAER */}

          <Appbtn text={'SUBMIT'} onPress={() => this.SubmitFoam()} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: h('130%'),
  },
  TopContainer: {
    width: '100%',
    height: h('130%'),
    alignItems: 'center',
  },
  radiobutton: {
    width: w('40%'),
    height: h('6%'),
    // backgroundColor: 'red',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  radiobutton2: {
    width: w('30%'),
    height: h('6%'),
    // backgroundColor: 'red',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  radiobutton3: {
    width: w('40%'),
    height: h('6%'),
    // backgroundColor: 'red',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  Checkbtn: {
    width: 30,
    height: 30,
    backgroundColor: '#8F94FB',
    borderRadius: 10,
  },
  unCheckbtn: {
    width: 30,
    height: 30,
    // backgroundColor: 'green',
    borderColor: '#8F94FB',
    borderWidth: 2,
    borderRadius: 10,
  },
  HeaderText: {
    color: '#8F94FB',
    fontSize: h('3%'),
    fontWeight: 'bold',
    marginTop: h('2%'),
    paddingBottom: h('3%'),
  },

  MarlaHouseText: {
    color: '#8F94FB',
    fontSize: h('2.5%'),
    paddingTop: h('5%'),
  },
});
