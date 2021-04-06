import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import {Icon} from 'react-native-elements';

import {Dashbord, Services, Users} from '../screens/Admin';

export const AdminBottomTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#8F94FB',
        inactiveTintColor: '#0003',
      }}>
      <Tab.Screen
        name="Dashbord"
        component={Dashbord}
        options={{
          headerShown: false,
          tabBarLabel: 'Dashbord',
          tabBarIcon: ({color, size}) => (
            <Icon name={'home'} type={'ionicon'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Users"
        component={Users}
        options={{
          headerShown: false,
          tabBarLabel: 'Users',
          tabBarIcon: ({color, size}) => (
            <Icon name={'person'} type={'ionicon'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Services"
        component={Services}
        options={{
          headerShown: false,
          tabBarLabel: 'Services',
          tabBarIcon: ({color, size}) => (
            <Icon name={'albums'} type={'ionicon'} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
