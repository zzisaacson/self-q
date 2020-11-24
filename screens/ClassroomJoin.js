import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet,FlatList, Dimensions, Image, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
//import * as GoogleSignIn from 'expo-google-sign-in';



const ClassroomJoin= props =>{
    const [name, setName]= useState('');
    const [password, setPassword]= useState('');
    const [error, setError]=useState('');

    const db= firebase.database();
   
    const handleJoin = ()=>{
        setError('Loading...');
        db.ref('/classes/'+name.toLowerCase()).once("value", function(snapshot) {
            const data=snapshot.val();
            if(data==null){
                setError('The class are trying to join does exist. Check the spelling and try again.')
            }
            else{
                if(data['members'].includes(firebase.auth().currentUser.uid)){
                    setError('You are already in this class.');
                }
                else{
                    if(password!=data[password]){
                        setError('Incorrect Password.')
                    }
                    else{
                        db.ref('/classes/'+name.toLowerCase()+'/members').set([...data['members'], firebase.auth().currentUser.uid ]);
                        props.setScreen(9);
                    }
                }
            }
          }, function (errorObject) {
            setError("The read failed: " + errorObject.code+' Please try again.');
          });
        }; 
     
    

    return   (
    <View style={styles.container}>
        <View >
            <Text style={styles.title}>Join a Class</Text>
            <TextInput placeholder={"Class Name"} style ={styles.input} onChangeText={setName}/>
            <TextInput placeholder={"Password"} style ={styles.input} onChangeText={setPassword}/>
            <Text style={styles.text}>{error}</Text>
            <Button style={{width:'25%'}} title="Join" onPress ={handleJoin}/>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 2, 
      padding:20
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
  

export default ClassroomJoin;