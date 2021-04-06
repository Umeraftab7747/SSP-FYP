import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import {AdminBottomTab} from './AdminBottomTab';
import {ServiceproviderBottomtab} from './ServiceproviderBottomtab';

// welcome for all
import {
  UserLogin,
  SspLogin,
  UserSignup,
  SspSignup,
  UserPassword,
  SspPassowrd,
} from '../screens/welcome';
import {Details, Dispute} from '../screens/Admin';
import {Rejected} from '../screens/SSP';

export const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="UserLogin"
          component={UserLogin}
          options={{headerShown: false}}
        />
        {/* Service provider */}
        <Stack.Screen
          name="ServiceproviderBottomtab"
          component={ServiceproviderBottomtab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Rejected"
          component={Rejected}
          options={{headerShown: false}}
        />
        {/* Service provider */}
        {/* ADMIN */}

        <Stack.Screen
          name="AdminBottomTab"
          component={AdminBottomTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dispute"
          component={Dispute}
          options={{headerShown: false}}
        />
        {/* ADMIN */}

        <Stack.Screen
          name="SspPassowrd"
          component={SspPassowrd}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserPassword"
          component={UserPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SspSignup"
          component={SspSignup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserSignup"
          component={UserSignup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SspLogin"
          component={SspLogin}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
