import React, {useState} from 'react';
import {View, Text,TouchableOpacity, TextInput, Button, StyleSheet,FlatList, Dimensions, Image, ScrollView} from 'react-native';
import firebase, { auth } from 'firebase';
import GoalItem from '../components/GoalItem';
//import * as GoogleSignIn from 'expo-google-sign-in';




const GradingStudList = props =>{
    
    const handleStudClick=(id)=>{
        var qInfo = props.classDetails['assignments']['details'][id];
        if (props.classDetails['responses']!=null&&props.classDetails['responses'][id]!=null&&props.classDetails['responses'][id][firebase.auth().currentUser.uid]!=null){
            qInfo = props.classDetails['responses'][id][firebase.auth().currentUser.uid];
        }
        props.setQInfo(qInfo);
        props.setScreen(16);
    };


    var data = props.classDetails['names']!=null?props.classDetails['names']:[];

    return   (
    <View style={{padding:20}}>

        <FlatList style={{flex:1}}data = {data}
        keyExtractor={(item, index)=> item.id}
        renderItem = {itemData=><GoalItem id = {itemData.item.id} onDelete ={(id)=>handleStudClick(id)}title ={itemData.item.value}/>}/>

           

    </View>
    );
}

const {width} = Dimensions.get("screen");
const image_width =Math.min( width * 0.45,250);
const styles = StyleSheet.create({
    
    row:{
        flexDirection:'row',
        justifyContent:'center',
        padding:15,
        alignItem:'center'
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
        },
    header:{
            color: '#05375a',
            fontSize: 30,
            fontWeight: 'bold'
    }
  });
  

export default GradingStudList;