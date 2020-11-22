import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Modal, Text} from 'react-native';

const GoalInput = props =>{
    const [enteredGoal, setEnteredGoal] = useState(''); 

    function goalInputHandler(enteredText){
        props.setInput(enteredText);
    }
    return  (
      
          <View style={styles.inputContainer}>
            <Text style={{fontWeight:'bold', color :props.color}}>{props.header}</Text>
            <Text>{props.question}</Text>
            <TextInput text={props.text} placeholder={props.header} style ={styles.input} onChangeText = {goalInputHandler} value={props.input}/>
            
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
     }
});

export default GoalInput;