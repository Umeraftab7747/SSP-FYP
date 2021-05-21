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
          alert('User Block');
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
          {/* detial palet */}
          <View style={styles.GridView}>
            <View style={styles.leftGridView}>
              <Text style={styles.Text}> Name: </Text>
            </View>
            <View style={styles.RightGridView}>
              <Text style={styles.Text}> {this.state.data.Firstname}</Text>
            </View>
          </View>
          {/* detial palet */}
          {/* detial palet */}
          <View style={styles.GridView}>
            <View style={styles.leftGridView}>
              <Text style={styles.Text}> Email: </Text>
            </View>
            <View style={styles.RightGridView}>
              <Text style={styles.Text}> {this.state.data.Email}</Text>
            </View>
          </View>
          {/* detial palet */}
          {/* detial palet */}
          <View style={styles.GridView}>
            <View style={styles.leftGridView}>
              <Text style={styles.Text}> Company: </Text>
            </View>
            <View style={styles.RightGridView}>
              <Text style={styles.Text}> {this.state.data.Companyname}</Text>
            </View>
          </View>
          {/* detial palet */}

          {/* detial palet */}
          <View style={styles.GridView}>
            <View style={styles.leftGridView}>
              <Text style={styles.Text}> Cnic: </Text>
            </View>
            <View style={styles.RightGridView}>
              <Text style={styles.Text}> {this.state.data.Cnic}</Text>
            </View>
          </View>
          {/* detial palet */}
          {/* detial palet */}
          <View style={styles.GridView}>
            <View style={styles.leftGridView}>
              <Text style={styles.Text}> Phone: </Text>
            </View>
            <View style={styles.RightGridView}>
              <Text style={styles.Text}> {this.state.data.Phone}</Text>
            </View>
          </View>
          {/* detial palet */}
          {/* detial palet */}
          <View style={styles.GridView}>
            <View style={styles.leftGridView}>
              <Text style={styles.Text}> Status: </Text>
            </View>
            <View style={styles.RightGridView}>
              <Text style={styles.Text}> {this.state.status}</Text>
            </View>
          </View>
          {/* detial palet */}

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
  GridView: {
    borderColor: '#8F94FB',
    borderWidth: w('1%'),
    width: w('90%'),
    height: h('7%'),
    flexDirection: 'row',
    marginTop: h('0.5%'),
  },
  leftGridView: {
    // backgroundColor: 'yellow',
    width: '30%',
    height: '100%',
    borderRightColor: '#8F94FB',
    borderRightWidth: w('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  RightGridView: {
    // backgroundColor: 'green',
    width: '70%',
    height: '100%',
    justifyContent: 'center',
  },
});
