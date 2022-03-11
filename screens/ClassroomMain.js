import React, {useState} from 'react';
import {View, Text,TouchableOpacity, TextInput, Button, StyleSheet,FlatList, Dimensions, Image, ScrollView} from 'react-native';
import firebase, { auth } from 'firebase';
import GoalItem from '../components/GoalItem';
//import * as GoogleSignIn from 'expo-google-sign-in';




const ClassroomMain = props =>{
    const db = firebase.database();

    // db.ref('/nicknames/').once("value", function(snapshot) {
    //     var data=snapshot.val();

    //     if(data== null ||!Object.values(data).includes(firebase.auth().currentUser.uid)){
    //         props.setScreen(24)
    //     }
    //   }, function (errorObject) {
    //     console.log("The read failed: " + errorObject.code);
    //   });
    if(props.nickname.length<1){
        props.setScreen(24);
    }

    const clickClassHandler=(name)=>{
        props.setClassName(name);
        props.setAssignTo(name.replace(props.nickname,'').replace('-',''));
        db.ref('/classes/'+name).once("value", function(snapshot) {
            var data=snapshot.val();
            //console.log(data)
            props.setClassDetails(data);
            props.setScreen(12);
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
        }; 
       

    return   (
    <ScrollView style={{padding:20}}>
         <View style={{flexDirection:'row'}}>
            <Text style = {{color: 'grey', marginTop:5 }}>Your Nickname: </Text>
            <Text style={{color: 'grey', marginTop:5, fontStyle:'italic'}}>{props.nickname}</Text>
        </View>
            <View style={styles.row}>
                <View style={{margin:15}}>
                    <Button title=' Create a Question Set ' onPress={()=>props.setScreen(13)}/> 
                     
                </View> 
                 <View style={{margin:15}}>
                 <Button title=' Sign Up New Child ' onPress={()=>props.setScreen(25)}/>  
                </View> 
            </View>
            <FlatList style={{flex:1}}data = {props.classes}
            keyExtractor={(item, index)=> item.id}
            renderItem = {itemData=><GoalItem id = {itemData.item.id} onDelete ={id=>clickClassHandler(id)}title ={itemData.item.value.replace(props.nickname,'')}/>}/>

    </ScrollView>
    );
}

const {width} = Dimensions.get("screen");
const image_width =Math.min( width * 0.45,250);
const styles = StyleSheet.create({
    
    row:{
        flexDirection:'row',
        justifyContent:'center',
        padding:15
    },
    listItem:{ 
        padding:10,
        marginVertical:10,
        backgroundColor: '#ccc',
        borderColor:'black',
        borderWidth:1
      },
      extraSpacing:{
          marginRight:image_width+15
        }
  });
  
  

export default ClassroomMain;