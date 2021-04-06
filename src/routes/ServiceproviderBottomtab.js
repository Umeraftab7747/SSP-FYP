import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import {Icon} from 'react-native-elements';

import {Dashboard, Service} from '../screens/SSP';

export const ServiceproviderBottomtab = () => {
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
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({color, size}) => (
            <Icon name={'home'} type={'ionicon'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Service"
        component={Service}
        options={{
          headerShown: false,
          tabBarLabel: 'Service',
          tabBarIcon: ({color, size}) => (
            <Icon
              name={'add-circle'}
              type={'ionicon'}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
