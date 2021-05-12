import React, {Component} from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';
import {Header, Appbtn} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {Icon} from 'react-native-elements';
import {axiosInstance, baseUrl} from '../api';

export class AllUserDetails extends Component {
  state = {
    data: [],
    status: '',
  };
  componentDidMount() {
    const abc = this.props.route.params.Alldata;
    this.setState({data: abc}, () => {
      if (this.state.data.isVerified === false) {
        this.setState({status: 'BLOCKED'});
      }
      if (this.state.data.isVerified === true) {
        this.setState({status: 'AVILABLE'});
      }
    });
  }

  Delete = value => {
    const params = {
      Email: value,
    };

    // ASY
    axiosInstance
      .post(baseUrl + '/admin/delete', params)
      .then(res => {
        const userData = res.data;
        if (userData.status === 200) {
          alert('User Deleted');
          this.props.navigation.goBack();
        }
      })
      .catch(error => {
        console.log(error);
      });
    // ASYC
  };

  Block = () => {
    const params = {
      Email: this.state.data.Email,
    };
    // ASY
    axiosInstance
      .post(baseUrl + '/admin/Block', params)
      .then(res => {
        const userData = res.data;
        if (userData.status === 200) {
          alert('User Deleted');
          this.props.navigation.goBack();
        }
      })
      .catch(error => {
        console.log(error);
      });
    // ASYC
  };

  render() {
    return (
      <View style={styles.container}>
        <Header text={'USER DETAILS'} />
        {/* detail container */}
        <View style={styles.DetailContainer}>
          <Text style={styles.Text}>Name: {this.state.data.Firstname} </Text>
          <Text style={styles.Text}>
            Company name: {this.state.data.Companyname}
          </Text>
          <Text style={[styles.Text]}>Email: {this.state.data.Email} </Text>
          <Text style={[styles.Text]}>Status: {this.state.status}</Text>
          <View style={styles.ButtonContainer}>
            <Appbtn
              onPress={() => {
                this.Delete(this.state.data.Email);
              }}
              text={'DELETE'}
            />
            <Appbtn
              onPress={() => {
                this.Block();
              }}
              text={'BLOCK'}
            />
          </View>
        </View>
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
    height: h('90%'),
    // backgroundColor: 'green',
    // alignItems: 'center',
    justifyContent: 'center',
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
    height: h('20%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
