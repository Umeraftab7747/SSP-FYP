import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import {AdminBottomTab} from './AdminBottomTab';
import {ServiceproviderBottomtab} from './ServiceproviderBottomtab';
import {UserBottomtab} from './UserBottomtab';

// welcome for all
import {
  UserLogin,
  SspLogin,
  UserSignup,
  SspSignup,
  UserPassword,
  SspPassowrd,
  SplashScreen,
} from '../screens/welcome';
import {
  Details,
  Dispute,
  AllBooking,
  AllServices,
  AllserviceDetails,
  AllUser,
  AllUserDetails,
  AddEquipement,
  Equipment,
  UpdateEquipment,
  EquipmentDetails,
  AdminToolsHistory,
} from '../screens/Admin';
import {
  Rejected,
  EditService,
  Approve,
  SSPBooking,
  SSPServiceDetails,
  RatingScreen,
  SSPProfile,
  Updateprofile,
  SSPconfirmbooking,
  ConfirmBooking,
} from '../screens/SSP';
import {
  ServiceDeatails,
  BookingDetails,
  RateService,
  BookingHistory,
  Disputes,
  Profile,
  ACCOUNT,
  BookingService,
  UpdateBooking,
  Checkbooking,
  Suggestion,
  Suggested,
  History,
} from '../screens/users';

export const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        {/* USER */}

        <Stack.Screen
          name="UserLogin"
          component={UserLogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserBottomtab"
          component={UserBottomtab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ServiceDeatails"
          component={ServiceDeatails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BookingDetails"
          component={BookingDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RateService"
          component={RateService}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BookingHistory"
          component={BookingHistory}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Disputes"
          component={Disputes}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ACCOUNT"
          component={ACCOUNT}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BookingService"
          component={BookingService}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UpdateBooking"
          component={UpdateBooking}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Checkbooking"
          component={Checkbooking}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Suggestion"
          component={Suggestion}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Suggested"
          component={Suggested}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{headerShown: false}}
        />

        {/* USER */}

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
        <Stack.Screen
          name="Approve"
          component={Approve}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditService"
          component={EditService}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SSPBooking"
          component={SSPBooking}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SSPServiceDetails"
          component={SSPServiceDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RatingScreen"
          component={RatingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SSPProfile"
          component={SSPProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Updateprofile"
          component={Updateprofile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SSPconfirmbooking"
          component={SSPconfirmbooking}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ConfirmBooking"
          component={ConfirmBooking}
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
        <Stack.Screen
          name="AllBooking"
          component={AllBooking}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AllServices"
          component={AllServices}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AllserviceDetails"
          component={AllserviceDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AllUser"
          component={AllUser}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AllUserDetails"
          component={AllUserDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddEquipement"
          component={AddEquipement}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Equipment"
          component={Equipment}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UpdateEquipment"
          component={UpdateEquipment}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EquipmentDetails"
          component={EquipmentDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AdminToolsHistory"
          component={AdminToolsHistory}
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
