import React,{useContext} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import {AppContext} from '../context/AppContext';
import {globalStyles} from '../theme/globalStyles';
import {lightTheme,darkTheme} from '../theme/theme';

export default function HomeScreen({navigation}){
 const {user,theme}=useContext(AppContext);
 const styles=globalStyles(theme==='light'?lightTheme:darkTheme);

 return(
  <View style={styles.container}>

   <Text style={styles.title}>Dashboard</Text>

   <View style={{
     backgroundColor:"#fff",
     padding:15,
     borderRadius:10,
     elevation:3,
     marginBottom:15
   }}>
     <Text>Name: {user?.name}</Text>
     <Text>SAP ID: {user?.sap}</Text>
     <Text>Semester: {user?.semester}</Text>
     <Text>GPA: {user?.gpa}</Text>
     <Text>CGPA: {user?.cgpa}</Text>
   </View>

   <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('EditProfile')}>
    <Text style={styles.buttonText}>Edit Profile</Text>
   </TouchableOpacity>

  </View>
 );
}