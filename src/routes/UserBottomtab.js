import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import {Icon} from 'react-native-elements';

import {Dashboard} from '../screens/users';

export const UserBottomtab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#8F94FB',
        inactiveTintColor: '#0003',
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarLabel: 'Dashbord',
          tabBarIcon: ({color, size}) => (
            <Icon name={'home'} type={'ionicon'} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
