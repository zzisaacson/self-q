import React, {useState} from 'react';
import {TouchableOpacity,View,Dimensions, Image, Button, StyleSheet,FlatList} from 'react-native';

import firebase from 'firebase';
const TabG = props =>{
    var img = "../assets/home.png";

    const handlePress=()=>{
      if(firebase.auth().currentUser!=null){
          props.goClassroom();
      }
  }
    return   (
    <View style={{backgroundColor:props.colorList[props.screen], flex:1,
        alignItems:'center',
        borderColor:'grey',
        borderWidth:1}} >
        <TouchableOpacity onPress={handlePress}>
          <Image 
              source={require('../assets/classroom.png')}
              style={styles.logo}
              resizeMode={"stretch"}/>
          </TouchableOpacity>
    </View>
    );
}
  
const {width} = Dimensions.get("screen");


const styles = StyleSheet.create({
    tab:{
        flex:1,
        alignItems:'center',
        borderColor:'grey',
        borderWidth:1
    },
    logo: {
        width: 72,
        height: 64
    }
    
});

export default TabG;