import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet,FlatList, Dimensions, Image, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
//import * as GoogleSignIn from 'expo-google-sign-in';



const Login= props =>{
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [error, setError]=useState('');

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          props.setScreen(0);
        }
     });
   
    const handleSignIn = ()=>{
        setError('Loading...');
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(()=>{
            props.setScreen(0);
        })
        .catch((error)=>{
            setError(error+ ' Please try again.');
            console.log('auth failed '+error+' && email='+email);
        });
     
    }
    const setScreenHandler=()=>{
        props.setScreen(3);
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
            <Text style={styles.text}>{error}</Text>
            <Button style={{width:'25%'}} title="Sign In" onPress ={handleSignIn}/>
            <View style ={{alignItems:'center'}}> 
                <TouchableOpacity onPress={setScreenHandler}>
                    <Text  style = {styles.clickableText}>New user? Sign up.</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    );
}

const {height} = Dimensions.get("screen");
const height_logo = height * 0.14;

const styles = StyleSheet.create({
    container: {
      flex: 2, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop:5
    },
    clickableText: {
        color: 'blue',
        fontWeight: 'bold',
        marginTop:10
    },
    smallHeader: {
        color: '#05375',
        fontWeight: 'bold',
        marginTop:10
    },
    button: {
        width:"20%",
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    },
    input:{
        width: '90%', 
         borderColor:'black', 
         borderWidth:1, 
         padding:5,
        margin: 10
       }
  });
  

export default Login;