import React, {useState} from 'react';
import {ScrollView,TouchableOpacity, CheckBox, View, Text, TextInput, Button, StyleSheet,FlatList, Dimensions, Image} from 'react-native';
import firebase from 'firebase';
//import {  } from 'react-native-gesture-handler';
//import * as GoogleSignIn from 'expo-google-sign-in';




const SignUp = props =>{
    //console.log('HERE SIR');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [error, setError]=useState('');
    const [isSelected, setSelection] = useState(false);
    const handleSignUp = ()=>{
        if(isSelected){
            setError('Loading...');
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(()=>{
                props.setScreen(0);
            })
            .catch((error)=>{
                setError(error+' Please try again.');
            });
    }
    else{
        setError('You must agree to Privacy Policy and Parental Agreement')
    }
     
    }
    const handleBack = ()=>{
        props.setScreen(2);
     
    }
    return   (
    <ScrollView style={styles.container}>
        <View style ={styles.header}>
            <Image 
            source={require('../assets/self-q.png')}
            style={styles.logo}
            resizeMode={"stretch"}/>
        </View>
        <View style ={styles.footer}>
            <Text style={styles.title}>Welcome to SELf-Q!</Text>
            <Text style = {styles.text}>Register With A New Account</Text>
            <TextInput placeholder={"Email"} style ={styles.input} onChangeText={setEmail}/>
            <TextInput secureTextEntry={true} placeholder={"Password"} style ={styles.input} onChangeText={setPassword}/>
            
            <View style={styles.centerRow}>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={ {
                        alignSelf: "center",
                    }}/>
                <Text  style={styles.text}> I agree to the </Text>
                <TouchableOpacity onPress={()=>{props.setScreen(23)}}>
                    <Text  style = {styles.clickableText}>Privacy Policy and Parental Agreement</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.text}>{error}</Text>
            <View style={styles.centerRow}>
                <View style={styles.button}>
                    <Button style={styles.button} title="Sign Up" onPress ={()=>handleSignUp()}/>
                </View>
                <View style={styles.button}>
                    <Button style={styles.button} title="Back" onPress ={()=>handleBack()}/>
                </View>
            </View>
        </View>
    </ScrollView>
    );
}

const {height,width} = Dimensions.get("screen");
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
        flex: 2,
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
        color: '#05375a',
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
       },
    button:{
        padding:20, 
        width:'40%'
    },
    centerRow:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center'
    }
  });
  

export default SignUp;