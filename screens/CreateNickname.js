import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet,FlatList, Dimensions, Image, TouchableOpacity} from 'react-native';
import firebase from 'firebase';


const CreateNickname= props =>{


    const [nickname, setNickname]= useState('');
    const [error, setError]=useState('');


   
    const handleSubmit= ()=>{
        if(!(/^[a-z0-9]+$/i.test(nickname)) || nickname.length<1){
            setError('Nicknames cannot be empty, and must be alpha-numeric.');
            return;
        }
        setError('Loading...');
        const db = firebase.database();
        db.ref('/nicknames/').once("value", function(snapshot) {
            var data=snapshot.val();
            if (data!=null && data.hasOwnProperty(nickname.toLocaleLowerCase())){
                setError('A user with this nickname already exists, please select another.');
            }
            else{
                props.setNickname(nickname);
                db.ref('/nicknames/'+nickname.toLocaleLowerCase()).set(firebase.auth().currentUser.uid);
                props.setScreen(9);
            }
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
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
            <Text style={styles.title}>Nickname / User ID Required to Use The Family Page</Text>
            <Text style = {styles.text}>Please do not use your real full name nor any identifiable information. You will need to share your nickname to interact with other users, and once selected a nickname may not be able to be changed.</Text>
            <TextInput placeholder={"Nickname"} style ={styles.input} onChangeText={setNickname}/>
            <Text style={styles.text}>{error}</Text>
            <Button style={{width:'25%'}} title="Submit" onPress ={()=>handleSubmit()}/>
        </View>
    </View>
    );
}

const {height} = Dimensions.get("screen");
const height_logo = height * 0.14*3;

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
       
  });
  

export default CreateNickname;