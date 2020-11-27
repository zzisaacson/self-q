import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet,FlatList, Dimensions, Image, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
//import * as GoogleSignIn from 'expo-google-sign-in';



const ClassroomCreate= props =>{
    const [name, setName]= useState('');
    const [password, setPassword]= useState('');
    const [error, setError]=useState('');

    const db= firebase.database();
   
    const handleCreate = ()=>{
        setError('Loading...');
        //console.log('HERERE mememememe');
        db.ref('/classes/'+name.toLowerCase()).once("value", function(snapshot) {
            const data=snapshot.val();
            if(data==null){
                db.ref('/classes/'+name.toLowerCase()+'/password').set(password);
                db.ref('/classes/'+name.toLowerCase()+'/members').set([firebase.auth().currentUser.uid]);
                db.ref('/classes/'+name.toLowerCase()+'/owner').set(firebase.auth().currentUser.uid);
                props.setClassName(name.toLowerCase());
                props.setClassDetails({'password':password,
                                    'members':[[firebase.auth().currentUser.uid]],
                                    'owner':firebase.auth().currentUser.uid

                })
                props.setScreen(12);
            }
            else{
                setError('Class name already exists, please choose another. ')
            }
          }, function (errorObject) {
            setError("The read failed: " + errorObject.code+' Please try again');
          });
        }; 
     
    

    return   (
    <View style={styles.container}>
        <View >
            <Text style={styles.title}>Create a Class</Text>
            <TextInput placeholder={"Class Name"} style ={styles.input} onChangeText={setName}/>
            <TextInput placeholder={"Password"} style ={styles.input} onChangeText={setPassword}/>
            <Text style={styles.text}>{error}</Text>
            <Button style={{width:'25%'}} title="Create" onPress ={handleCreate}/>
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
  

export default ClassroomCreate;