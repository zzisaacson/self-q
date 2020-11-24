import React, {useState} from 'react';
import {View, Text,TouchableOpacity, TextInput, Button, StyleSheet,FlatList, Dimensions, Image, ScrollView} from 'react-native';
import firebase from 'firebase';
//import * as GoogleSignIn from 'expo-google-sign-in';




const ClassroomMain = props =>{


    return   (
    <View>
        <ScrollView>
            <View style={styles.row}>
                <View style={{margin:15}}>
                    <Button title=' Join a Class ' onPress={()=>props.setScreen(11)}/>  
                </View> 
                <View style={{margin:15}}>
                    <Button onPress={()=>props.setScreen(10)} title='Create a Class'/>
                </View>
            </View>

        </ScrollView>
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