import React, {useState} from 'react';
import {View,Dimensions, Image, Button, StyleSheet,FlatList, TouchableOpacity} from 'react-native';

import firebase from 'firebase';
const TabS = props =>{
    var img = "../assets/home.png";
    const handlePress=()=>{
      if(firebase.auth().currentUser!=null){
          props.setScreen(5);
        }
     }
    return   (
    <View style={{backgroundColor:props.colorList[props.screen], flex:1,
        alignItems:'center',
        borderColor:'grey',
        borderWidth:1}} onPress={()=> props.setScreen(props.screen)}>
        <TouchableOpacity onPress={handlePress}>
          <Image 
              source={require('../assets/settings.png')}
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

export default TabS;