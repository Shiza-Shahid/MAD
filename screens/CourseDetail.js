import React,{useContext} from 'react';
import {View,Text} from 'react-native';
import {AppContext} from '../context/AppContext';
import {globalStyles} from '../theme/globalStyles';
import {lightTheme,darkTheme} from '../theme/theme';

export default function CourseDetail({route}){
 const {course}=route.params;

 const {theme}=useContext(AppContext);
 const styles=globalStyles(theme==='light'?lightTheme:darkTheme);

 return(
  <View style={styles.container}>
   <Text style={styles.title}>Course Detail</Text>
   <Text style={styles.text}>Course: {course.name}</Text>
  </View>
 );
}