import React,{useState,useContext} from 'react';
import {View,Text,TextInput,TouchableOpacity,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../context/AppContext';
import {globalStyles} from '../theme/globalStyles';
import {lightTheme,darkTheme} from '../theme/theme';

export default function EditProfile({navigation}){
 const {user,setUser,theme}=useContext(AppContext);
 const styles=globalStyles(theme==='light'?lightTheme:darkTheme);

 const [name,setName]=useState(user.name);
 const [semester,setSemester]=useState(user.semester);
 const [gpa,setGpa]=useState(user.gpa);
 const [cgpa,setCgpa]=useState(user.cgpa);

 const save=async()=>{
  const updated={...user,name,semester,gpa,cgpa};

  await AsyncStorage.setItem('user',JSON.stringify(updated));
  setUser(updated);

  Alert.alert("Success","Profile Updated");
  navigation.goBack();
 };

 return(
  <View style={styles.container}>

   <Text style={styles.text}>Name</Text>
   <TextInput style={styles.input} value={name} onChangeText={setName}/>

   <Text style={styles.text}>Semester</Text>
   <TextInput style={styles.input} value={semester} onChangeText={setSemester}/>

   <Text style={styles.text}>GPA</Text>
   <TextInput style={styles.input} value={gpa} onChangeText={setGpa}/>

   <Text style={styles.text}>CGPA</Text>
   <TextInput style={styles.input} value={cgpa} onChangeText={setCgpa}/>

   <TouchableOpacity style={styles.button} onPress={save}>
    <Text style={styles.buttonText}>Save</Text>
   </TouchableOpacity>

  </View>
 );
}