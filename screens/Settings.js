import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet,FlatList, Dimensions, Image, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
//import * as GoogleSignIn from 'expo-google-sign-in';



const Settings= props =>{

    const handleSignOut = ()=>{
        firebase.auth().signOut();
        props.setScreen(2);
    }
    
    return   (
    <View style={styles.container}>
        <View style={{ alignItems:'center', justifyContent:'center'}}>
            <Button  title="  Log Out  " onPress ={handleSignOut}/>
        </View>
    </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItem: 'center',
    justifyContent:'center'}
   
  });
  

export default Settings;