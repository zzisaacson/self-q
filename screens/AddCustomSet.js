import React, {useState} from 'react';
import {View, Text, Button, StyleSheet,FlatList, TextInput, ScrollView} from 'react-native';

import CustomGoalInput from '../components/CustomGoalInput';

const AddSet = props =>{
    const [userInput, setUserInput]= useState('');
    const [focus, setFocus]= useState('');
    const [gather, setGather]= useState('');
    const [brainstorm, setBrainstorm]= useState('');
    const [evaluate, setEvaluate]= useState('');
    const [plan, setPlan]= useState('');
    const [reflect, setReflect]= useState('');
    const addGoalHandler = goalTitle=>{
        props.setQList([...props.qList, {id: Math.random().toString(), value: goalTitle}]);
        props.setScreen(0);
      };
    return(
        <ScrollView>
            <View style={{
                padding:30,
                flex:1,
                flexDirection :'column',
                alignItems: 'center'
            }}>
                <Text style={{fontWeight:'bold'}} >Name this Question Set</Text>
                <TextInput placeholder = 'Name' style={{
            width: '80%', 
            borderColor:'black', 
            borderWidth:1, 
            padding:10,
            marginBottom: 10
        }} onChangeText ={text=>setUserInput(text)}/>
                <CustomGoalInput input = {focus} setInput={setFocus} color ='red' header='Select A Focus' question = 'Ask a focus question'/>
                <CustomGoalInput input = {gather} setInput={setGather} color ='orange' header='Gather Information' question = 'Ask a gathering information question'/>
                <CustomGoalInput input = {brainstorm} setInput={setBrainstorm} color ='yellow' header='Brainstorm' question = 'As a brainstorming question'/>
                <CustomGoalInput input = {evaluate} setInput={setEvaluate} color ='green' header='Evaluate' question = 'Ask and evaluation question'/>
                <CustomGoalInput input = {plan} setInput={setPlan} color ='blue' header='Plan and Act' question = 'Ask a plan and action question'/>
                <CustomGoalInput input = {reflect} setInput={setReflect} color ='purple' header='Reflect' question = 'Ask a reflection question'/>
                <Button style={{margin:15,width:'20%'}} title='ADD' onPress = {addGoalHandler.bind(this, userInput)}/>
            </View>
        </ScrollView>
    );
    
}

const styler = StyleSheet.create({
    screen:{
        padding:30,
        alignItems:'center'
      },
      button:{
        width:'20%' 
      },
      input:{
        width: '80%', 
        borderColor:'black', 
        borderWidth:1, 
        padding:10,
        marginBottom: 10
      }
});

export default AddSet;