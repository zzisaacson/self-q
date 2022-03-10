import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Modal, Text, TouchableOpacity} from 'react-native';

const FeedbackGoalInput = props =>{
    const [commentMode, setCommentMode] = useState(props.comment!=''); 

    return  (
      
          <View style={styles.inputContainer}>
            <Text style={{fontWeight:'bold', color :props.color}}>{props.header}</Text>
            
              <Text>{props.question}</Text>
 
            <TouchableOpacity onPress={()=>setCommentMode(true)}>
              <Text  style ={styles.italics}> {props.input}</Text>
            </TouchableOpacity>
            {commentMode&& <View style={{padding:2,width:'100%'}}>
              <TextInput value={props.comment}style={styles.input} placeholder={'Leave a comment on '+props.header} onChangeText={text=>props.setInput(text)}/>

              </View>

            }
            
          </View>
    );
}

const styles = StyleSheet.create({
    inputContainer:{
        width:'80%',
        flex:1,
        flexDirection :'column',
        alignItems: 'center',
        padding:10
  
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

export default FeedbackGoalInput;