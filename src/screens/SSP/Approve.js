import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Header, Appbtn} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {Icon} from 'react-native-elements';
import {axiosInstance, baseUrl} from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class Approve extends Component {
  state = {
    data: [],

    modalVisible: false,
    selectedData: '',
    Email: '',
  };

  componentDidMount() {
    this.unverifiedusers();
  }

  unverifiedusers = () => {
    AsyncStorage.getItem('ServiceProviderData')
      .then(value => {
        const data = JSON.parse(value);
        if (data !== null) {
          this.setState({Email: data});

          // AXIOS NOW
          axiosInstance
            .get(
              baseUrl +
                `/service-provider/verifiedservices/${this.state.Email}`,
            )
            .then(res => {
              const userData = res.data;
              console.log(userData);

              if (userData) {
                this.setState({data: userData});
              } else if (userData.status === 404) {
                console.log('404 status' + userData);
              }
            })
            .catch(error => {
              console.log('error catch status' + error);
            });
          // AXIOS END
        }
      })
      .done();
  };

  // Flatlist Container
  renderItem = item => (
    <View style={styles.FlatListContainer}>
      <View style={styles.leftFlatlist}>
        <Text style={styles.text}>Name: {item.ServiceName}</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          this.setState({selectedData: item}, () => {
            this.setState({modalVisible: true});
          });
        }}
        style={styles.rightFlatlist}>
        <Icon name={'create'} type={'ionicon'} color={'#8F94FB'} size={30} />
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={styles.Container}>
        <Header text={'Aproved Services'} />
        <FlatList
          data={this.state.data}
          renderItem={({item}) => this.renderItem(item)}
          keyExtractor={item => item._id}
        />

        {/* ٘MODAL*/}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible: false});
          }}>
          <View style={styles.ModalContainer}>
            <View style={styles.ViewContainer}>
              <Text style={styles.LoginText}>SERVICE PROVIDER DETAILS</Text>
              <View style={styles.TEXTCONTAINER}>
                <Text style={[styles.LoginText2]}>
                  ServiceName: {this.state.selectedData.ServiceName}
                </Text>
                <Text style={[styles.LoginText2]}>
                  Email:{this.state.selectedData.Email}
                </Text>
                <Text style={[styles.LoginText2]}>Discription:</Text>
                <Text style={styles.LoginText3}>
                  {this.state.selectedData.discription}
                </Text>
              </View>

              <Appbtn
                onPress={() => {
                  this.setState({modalVisible: false}, () => {
                    this.props.navigation.navigate('EditService', {
                      ShareData: this.state.selectedData,
                    });
                  });
                }}
                text={'UPDATE'}
              />
              <Appbtn
                onPress={() => {
                  this.delete(this.state.selectedData.Email);
                }}
                text={'DELETE'}
              />
            </View>
          </View>
        </Modal>
        {/* ٘MODAL*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    width: w('100%'),
    height: '100%',
    alignItems: 'center',
  },
  FlatListContainer: {
    width: w('90%'),
    height: h('10%'),
    backgroundColor: 'white',
    marginTop: h('2%'),
    borderRadius: h('0.5%'),
    elevation: 7,
    flexDirection: 'row',
  },
  leftFlatlist: {
    width: '80%',
    height: '100%',
    justifyContent: 'center',
    // backgroundColor: 'red',
    paddingLeft: 10,
  },
  rightFlatlist: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#8F94FB',
    fontSize: h('2.4%'),
    fontWeight: 'bold',
  },
  ModalContainer: {
    flex: 1,
    backgroundColor: '#0004',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewContainer: {
    width: w('95%'),
    height: h('50%'),
    backgroundColor: 'white',
    borderRadius: h('2%'),
    alignItems: 'center',
  },
  LoginText: {
    color: '#8F94FB',
    fontSize: h('3%'),
    fontWeight: 'bold',
    marginTop: h('1%'),
  },
  LoginText2: {
    color: '#8F94FB',
    fontSize: h('2.4%'),
    fontWeight: 'bold',
    marginTop: h('1%'),
  },
  LoginText3: {
    color: '#8F94FB',
    fontSize: h('2.2%'),
    // marginTop: h('1%'),
  },
  TEXTCONTAINER: {
    width: '100%',
    height: '50%',
    // backgroundColor: 'red',
    paddingTop: h('2%'),
    paddingLeft: h('2%'),
  },
});
