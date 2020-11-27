import React, {useState} from 'react';
import {View, Text,TouchableOpacity, TextInput, Button, StyleSheet,FlatList, Dimensions, Image, ScrollView} from 'react-native';
import firebase from 'firebase';
import GoalItem from '../components/GoalItem';
//import * as GoogleSignIn from 'expo-google-sign-in';




const ClassroomMain = props =>{
    const db = firebase.database();
    const clickClassHandler=(name)=>{
        props.setClassName(name);
        db.ref('/classes/'+name).once("value", function(snapshot) {
            var data=snapshot.val();
            props.setClassDetails(data);
            props.setScreen(12);
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
        }; 
       
   
     

    return   (
    <View style={{padding:20}}>
            <View style={styles.row}>
                <View style={{margin:15}}>
                    <Button title=' Join a Class ' onPress={()=>props.setScreen(11)}/>  
                </View> 
                <View style={{margin:15}}>
                    <Button onPress={()=>props.setScreen(10)} title='Create a Class'/>
                </View>
            </View>
            <FlatList style={{flex:1}}data = {props.classes}
            keyExtractor={(item, index)=> item.id}
            renderItem = {itemData=><GoalItem id = {itemData.item.id} onDelete ={id=>clickClassHandler(id)}title ={itemData.item.value}/>}/>

    </View>
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