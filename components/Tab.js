import React, {useState} from 'react';
import {View,Dimensions, Image, Button, StyleSheet,FlatList} from 'react-native';



const Tab = props =>{

    return   (
    <View style={styles.tab} onPress={()=> props.setScreen(props.screen)}>
        <Image 
            source={require('../assets/home.png')}
            style={styles.logo}
            resizeMode={"stretch"}/>
    </View>
    );
}
const {width} = Dimensions.get("screen");
const height_logo = width * 0.10;
const styles = StyleSheet.create({
    tab:{
        flex:1,
        alignItems:'center',
        backgroundColor:'lightgrey',
        borderColor:'grey',
        borderWidth:1
    },
    logo: {
        width: 72,
        height: 64
    }
    
});

export default Tab;