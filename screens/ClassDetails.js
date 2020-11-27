import React, {useState} from 'react';
import {View, Text,TouchableOpacity, TextInput, Button, StyleSheet,FlatList, Dimensions, Image, ScrollView} from 'react-native';
import firebase, { auth } from 'firebase';
import GoalItem from '../components/GoalItem';
//import * as GoogleSignIn from 'expo-google-sign-in';




const ClassroomDetails = props =>{

    const assignHandler=()=>{

    }
    var isOwned = firebase.auth().currentUser.uid==props.classDetails['owner'];

    return   (
    <View style={{padding:20}}>
            <Text style={styles.header}>{props.name}</Text>
            {isOwned&&<View style={styles.row}>
                <View style={{margin:15}}>
                    <Text>{'Password: ' +props.classDetails['password']}</Text>
                </View> 
                <View style={{margin:15}}>
                    <Button title=' Assign ' />  
                </View> 
            </View>}
            <FlatList style={{flex:1}}data = {props.assignments}
            keyExtractor={(item, index)=> item.id}
            renderItem = {itemData=><GoalItem id = {itemData.item.id} onDelete ={assignHandler}title ={itemData.item.value}/>}/>

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