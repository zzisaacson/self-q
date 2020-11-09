import React, {useState} from 'react';
import {View,Dimensions, Image, Button, StyleSheet,FlatList} from 'react-native';


const TabS = props =>{
    var img = "../assets/home.png";
    /*if(screen == 0){
        img = '../assets/home.png';
      }
      else if(screen==1){
        img = '../assets/document.png';
      }
      else if(screen==2){
        img = '../assets/classroom.png';
      }
      else {
        img = '../assets/home.png';
      }*/
    return   (
    <View style={{backgroundColor:props.colorList[props.screen], flex:1,
        alignItems:'center',
        borderColor:'grey',
        borderWidth:1}} onPress={()=> props.setScreen(props.screen)}>
        <Image 
            source={require('../assets/settings.png')}
            style={styles.logo}
            resizeMode={"stretch"}/>
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