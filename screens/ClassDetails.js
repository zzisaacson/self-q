import React, {useState} from 'react';
import {View, Text,TouchableOpacity, TextInput, Button, StyleSheet,FlatList, Dimensions, Image, ScrollView} from 'react-native';
import firebase, { auth } from 'firebase';
import GoalItem from '../components/GoalItem';
//import * as GoogleSignIn from 'expo-google-sign-in';




const ClassroomDetails = props =>{
    console.log(props.classDetails)
    const assignHandler=()=>{
        props.setScreen(13);
    }
    var isOwned = firebase.auth().currentUser.uid==props.classDetails['owner'];

    var data = props.classDetails['assignments']!=null&&props.classDetails['assignments']['set-list'] !=null?props.classDetails['assignments']['set-list']:[];

    return   (
    <View style={{padding:20}}>
            <Text style={styles.header}>{props.name}</Text>
            {isOwned&&<View style={styles.row}>
                <View style={{margin:15}}>
                    <Text>{'Password: ' +props.classDetails['password']}</Text>
                </View> 
                <View style={{margin:15}}>
                    <Button title=' Assign ' onPress={assignHandler}/>  
                </View> 
            </View>}
            <FlatList style={{flex:1}}data = {data}
            keyExtractor={(item, index)=> item.id}
            renderItem = {itemData=><GoalItem id = {itemData.item.id} onDelete ={()=>5}title ={itemData.item.value}/>}/>

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
  

export default ClassroomDetails;