import React, {Component} from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';
import {Header, Appbtn} from '../../Components';
import {w, h} from 'react-native-responsiveness';
import {Icon} from 'react-native-elements';
import {axiosInstance, baseUrl} from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class ServiceDeatails extends Component {
  state = {
    data: [],
    Email: '',
    UserData: [],
    rating: [],
  };
  componentDidMount() {
    const abc = this.props.route.params.Alldata;
    this.setState({data: abc}, () => {
      console.log(this.state.data);
    });

    this.getData();
  }

  // GETING LOGIN DATA
  getData = () => {
    AsyncStorage.getItem('UserData').then(value => {
      const data = JSON.parse(value);
      if (data !== null) {
        this.setState({Email: data});

        this.Rating();

        const params = {
          email: this.state.Email,
        };

        axiosInstance
          .post(baseUrl + '/users/UserDetails', params)
          .then(res => {
            const userData = res.data;

            this.setState({UserData: userData.user});
          })
          .catch(error => {
            if (error) {
              alert('Something Went Wrong');
            }
          });
      }
    });
  };

  // Booking
  BookService = () => {
    this.props.navigation.navigate('BookingService', {
      Servicedata: this.state.data,
    });
  };

  // Rating
  Rating = () => {
    const params = {
      id: this.state.data._id,
    };

    axiosInstance
      .post(baseUrl + '/rating/rating', params)
      .then(res => {
        const userData = res.data;
        this.setState({rating: userData.user});
      })
      .catch(error => {
        if (error) {
          alert('Something Went Wrong');
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
          <Text style={styles.Text}>
            Service Provider: {this.state.data.ServiceProviderName}
          </Text>
          <Text style={styles.Text}>Name: {this.state.data.ServiceName} </Text>
          <Text style={styles.Text}>Type: {this.state.data.ServiceType} </Text>
          <Text style={[styles.Text]}>
            Service Price: {this.state.data.ServicePrice}
          </Text>
          <Text style={[styles.Text, {paddingTop: h('1%')}]}>
            Starting Hours: {this.state.data.Startinghour}
          </Text>
          <Text style={[styles.Text, {paddingBottom: h('2%')}]}>
            Ending Hours: {this.state.data.EndingHour}
          </Text>

          <Text
            style={[
              styles.Text,
              {
                marginTop: h('2%'),
              },
            ]}>
            Discription:
          </Text>
          <Text style={styles.Text2}> {this.state.data.discription} </Text>
          <View style={styles.ButtonContainer}>
            <Appbtn
              text={'Booking'}
              onPress={() => {
                this.BookService();
              }}
            />
            <Appbtn
              text={'CHECK BOOKING'}
              onPress={() => {
                this.props.navigation.navigate('Checkbooking', {
                  data: this.state.data,
                });
              }}
            />
          </View>
        </View>
        {/* detail Container end */}

        <View style={styles.RatingContainer}>
          <Text style={styles.Text}>RATING </Text>
        </View>

        {this.state.rating < 1 ? (
          <Text style={styles.Text3}>NO RATING YET!</Text>
        ) : (
          <FlatList
            data={this.state.rating}
            renderItem={({item}) => this.renderItem(item)}
            keyExtractor={item => item._id}
          />
        )}
        {/* flatlist */}

        {/* flatlist */}
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
    height: h('55%'),
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
  Text3: {
    color: 'rgba(0,0,0,0.5)',
    fontWeight: 'bold',
    fontSize: h('3%'),
  },
  Text2: {
    color: '#8F94FB',
    fontSize: h('2%'),
    marginTop: h('1%'),
  },
  ButtonContainer: {
    // backgroundColor: 'red',
    width: w('80%'),
    height: h('15%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  RatingContainer: {
    width: '100%',
    height: h('7%'),
    // backgroundColor: 'red',
    padding: h('2%'),
  },
  FlatListContainer: {
    backgroundColor: 'white',
    width: w('90%'),
    height: h('10%'),
    borderRadius: h('1%'),
    marginTop: 5,

    borderColor: '#8F94FB',
    borderWidth: h('0.2%'),
  },
  RightLowerContainer: {
    // backgroundColor: 'red',
    width: '100%',
    height: h('10%'),
    paddingLeft: h('1%'),
    paddingRight: h('1%'),
  },
  RightFlatList: {
    // backgroundColor: 'green',
    width: '100%',
    height: '35%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: h('1%'),
  },
  FlatlistName: {
    color: '#8F94FB',
    fontSize: h('2%'),
    fontWeight: 'bold',
  },
  FlatlistRating: {
    color: '#8F94FB',
    fontSize: h('2%'),
    marginLeft: h('0.5%'),
  },
});
