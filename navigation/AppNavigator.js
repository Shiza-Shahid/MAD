import React,{useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppContext} from '../context/AppContext';

import AuthScreen from '../screens/AuthScreen';
import TabNavigator from './TabNavigator';
import EditProfile from '../screens/EditProfile';
import CourseDetail from '../screens/CourseDetail';

const Stack=createStackNavigator();

export default function AppNavigator(){
 const {user}=useContext(AppContext);

 return(
  <Stack.Navigator screenOptions={{headerShown:false}}>
   {user===null ? (
    <Stack.Screen name="Auth" component={AuthScreen}/>
   ) : (
    <>
     <Stack.Screen name="Main" component={TabNavigator}/>
     <Stack.Screen name="EditProfile" component={EditProfile}/>
     <Stack.Screen name="CourseDetail" component={CourseDetail}/>
    </>
   )}
  </Stack.Navigator>
 );
}