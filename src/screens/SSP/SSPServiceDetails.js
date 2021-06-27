import React, {Component} from 'react';
import {Text, StyleSheet, View, FlatList, Modal} from 'react-native';
import {Header, Appbtn} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {Icon} from 'react-native-elements';
import {axiosInstance, baseUrl} from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class SSPServiceDetails extends Component {
  state = {
    data: [],
    tools: [],
    BillData: [],
    modalVisible: false,
  };
  componentDidMount() {
    const abc = this.props.route.params.Alldata;
    this.setState({data: abc}, () => {
      this.Equipments();
    });
  }

  Equipments = () => {
    const params = {
      ServiceId: this.state.data.ServiceId,
    };

    axiosInstance
      .post(baseUrl + '/billing/findbill', params)
      .then(res => {
        const userData = res.data;

        this.setState(
          {tools: userData.user[0].tools, BillData: userData.user[0]},
          () => {
            console.log(this.state.BillData);
          },
        );
      })
      .catch(error => {
        if (error) {
          console.log(error);
        }
      });
  };

  // Flatlist Container
  renderItem = item => (
    <View style={styles.FlatListContainer}>
      <View style={styles.RightFlatList}>
        <Text style={styles.FlatlistName}>NAME: {item.UserName}</Text>
        <Text
          style={[
            styles.FlatlistName,
            {
              marginLeft: h('2%'),
            },
          ]}>
          Rating:
        </Text>

        <Icon
          name="star"
          type="ionicon"
          color="#517fa4"
          size={15}
          style={{
            marginLeft: h('0.5%'),
          }}
        />
        <Text style={styles.FlatlistRating}>{item.Rating} </Text>
      </View>
      {/* lower Container */}
      <View style={styles.RightLowerContainer}>
        <Text style={styles.FlatlistRating}>{item.Message}</Text>
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <Header text={'Service Details'} />
        {/* detail container */}
        <View style={styles.DetailContainer}>
          <Text style={styles.Text}>Name: {this.state.data.ServiceName} </Text>
          <Text style={styles.Text}>Type: {this.state.data.ServiceType} </Text>
          <Text
            style={[
              styles.Text,
              {
                marginTop: h('2%'),
              },
            ]}>
            User Detail:
          </Text>
          <Text style={[styles.Text2]}>
            User Name:- {this.state.data.UserName}
          </Text>
          <Text style={[styles.Text2]}>
            UserEmail:- {this.state.data.UserEmail}
          </Text>
          <Text style={[styles.Text2]}>Date:- {this.state.data.Date}</Text>
        </View>
        {/* detail Container end */}
        <Appbtn
          onPress={() => {
            this.setState({modalVisible: true});
          }}
          text={'BOOKING DETAILS'}
        />
        {/* modal to pick tools */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible: false});
          }}>
          <View style={styles.ModalContainer}>
            <View style={styles.ViewContainer}>
              <Text style={styles.LoginText}>Equipments/Charges</Text>
              <View style={styles.TEXTCONTAINER}>
                <FlatList
                  data={this.state.BillData.tools}
                  renderItem={({item}) => (
                    <View style={styles.radiobutton}>
                      <Text style={styles.LoginText2}>Name:{item.name} </Text>
                      <Text style={styles.LoginText2}>Price:{item.price}</Text>
                    </View>
                  )}
                  keyExtractor={item => Math.random().toString()}
                />

                <Text style={styles.LoginText2}>
                  Service Price:{this.state.BillData.ServicePrice}
                </Text>
                {this.state.BillData.ExtraPrice ? (
                  <Text style={styles.LoginText2}>
                    Extra Charges:{this.state.BillData.ExtraPrice}
                  </Text>
                ) : null}

                <Appbtn
                  onPress={() => {
                    this.setState({modalVisible: false});
                  }}
                  text={'CLOSE'}
                />
                <Appbtn
                  onPress={() => {
                    this.props.navigation.navigate('AddExtraCharges', {
                      data: this.state.data.ServiceId,
                    });
                  }}
                  text={'ADD EXTRA CHARGES'}
                />
              </View>
            </View>
          </View>
        </Modal>
        {/* modal to pick tools */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  DetailContainer: {
    width: w('100%'),
    height: h('40%'),
    // backgroundColor: 'green',
    // alignItems: 'center',
    paddingTop: h('2%'),
    padding: h('4%'),
  },
  Text: {
    color: '#8F94FB',
    fontWeight: 'bold',
    fontSize: h('2.5%'),
  },
  Text2: {
    color: '#8F94FB',
    fontSize: h('2%'),
    marginTop: h('1%'),
  },
  ButtonContainer: {
    // backgroundColor: 'red',
    width: w('80%'),
    height: h('8%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalContainer: {
    flex: 1,
    backgroundColor: '#0004',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewContainer: {
    width: w('95%'),
    height: h('85%'),
    backgroundColor: 'white',
    borderRadius: h('2%'),
    alignItems: 'center',
  },

  TEXTCONTAINER: {
    width: '100%',
    height: '84%',
    // backgroundColor: 'red',
    paddingTop: h('2%'),
    alignItems: 'center',
  },
  radiobutton: {
    width: w('80%'),
    height: h('8%'),
    // backgroundColor: 'red',
    justifyContent: 'space-around',
    // alignItems: 'center',
    marginTop: h('1%'),
    // flexDirection: 'row',
  },
  LoginText: {
    color: '#8F94FB',
    fontSize: h('3%'),
    fontWeight: 'bold',
  },
  LoginText2: {
    color: '#8F94FB',
    fontSize: h('2.4%'),
    fontWeight: 'bold',
  },
});
