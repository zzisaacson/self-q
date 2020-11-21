import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet,FlatList, Dimensions, Image} from 'react-native';
import firebase from 'firebase';
//import * as GoogleSignIn from 'expo-google-sign-in';




const TypeSelect = props =>{
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');

    const handleSignIn = ()=>{
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(()=>{
            props.setScreen(0);
        })
        .catch((error)=>{
            console.log('auth failed '+error+' && email='+email);
        });
     
    }
    return   (
    <View style={styles.container}>
        <View style ={styles.header}>
            <Image 
            source={require('../assets/self-q.png')}
            style={styles.logo}
            resizeMode={"stretch"}/>
        </View>
        <View style ={styles.footer}>
            <Text style={styles.title}>Welcome to SELf-Q!</Text>
            <Text style = {styles.text}>Sign in with account</Text>
            <TextInput placeholder={"Email"} style ={styles.input} onChangeText={setEmail}/>
            <TextInput placeholder={"Password"} style ={styles.input} onChangeText={setPassword}/>
            <Button style={{width:'25%'}} title="Sign In" onPress ={handleSignIn}/>
            <View style ={{alignItems:'center'}}> 
                <Text style = {styles.clickableText}>New user? Sign up.</Text>
            </View>
        </View>
    </View>
    );
}

const {height} = Dimensions.get("screen");
const height_logo = height * 0.14;

const styles = StyleSheet.create({
    
  });
  

export default Login;