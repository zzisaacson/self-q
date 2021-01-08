import React from 'react';
import {View, Button,TextInput, Text, Dimensions, StyleSheet} from 'react-native';

const Popup = props =>{
    console.log('popup');
    const handleClick =()=>{
        props.setLink("");
    }
    return   (
    <View style ={styles.card}>
        <Text style={{color:'blue', fontSize:20}}>Link to Share</Text>
        <TextInput style={{width:250, margin:20}}value={props.link}/>
        <Button style={{width:100, height:50}} title='Done' onPress={handleClick}/>
    </View>
    );
}

const styles = StyleSheet.create({
   card:{
       width: 300,
       height:150,
       borderColor:'black', 
       borderWidth:1, 
       padding:10,
       backgroundColor:'white',
        position: 'absolute', justifyContent: 'center', alignItems: 'center',
        left: (Dimensions.get('window').width / 2) - 175,
        top:(Dimensions.get('window').height / 2) - 125},
   
});

export default Popup;