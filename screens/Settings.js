import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet,FlatList, Dimensions, Image, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
//import * as GoogleSignIn from 'expo-google-sign-in';



const Settings= props =>{

    const handleSignOut = ()=>{
        firebase.auth().signOut();
        props.clearAll();
        props.setScreen(2);
    }
    
    return   (
    <View style={styles.container}>
        <View style={{ alignItems:'center', justifyContent:'center'}}>
            <Text style={{padding:10}}>Welcome to SELf-Q {props.nickname}!</Text>
            <Button  title="  Log Out  " onPress ={handleSignOut}/>
        </View>
    </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center',
    justifyContent:'center'}
   
  });
  

export default Settings;