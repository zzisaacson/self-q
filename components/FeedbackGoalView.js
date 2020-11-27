import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Modal, Text, TouchableOpacity} from 'react-native';

const FeedbackGoalView = props =>{
  

    return  (
      
          <View style={styles.inputContainer}>
            <Text style={{fontWeight:'bold', color :props.color}}>{props.header}</Text>
            
              <Text>{props.question}</Text>
 
            <TouchableOpacity onPress={()=>setCommentMode(true)}>
              <Text> {props.input}</Text>
            </TouchableOpacity>
          <View style={{width:'100%'}}>
    <Text style={styles.italics}>{props.comment!=''?'Instructor feedback: '+props.comment:''}</Text>

              </View>

  
            
          </View>
    );
}

const styles = StyleSheet.create({
    inputContainer:{
        width:'80%',
        flex:1,
        flexDirection :'column',
        alignItems: 'center'
  
     },
     input:{
      width: '100%', 
       borderColor:'black', 
       borderWidth:1, 
       padding:10,
       marginBottom: 10
     },
     italics:{
      fontStyle:'italic',
        width: '100%', 
       padding:10,
       marginBottom: 10
     }
});

export default FeedbackGoalView;