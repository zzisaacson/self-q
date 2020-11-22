import React, {useState} from 'react';
import {View, Text, Button, StyleSheet,FlatList, TextInput, ScrollView, ImagePropTypes} from 'react-native';

import GoalInput from '../components/GoalInput';

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
                <GoalInput input = {focus} setInput={setFocus} color ='red' header='Select A Focus' question = {props.prompList[0]}/>
                <GoalInput input = {gather} setInput={setGather} color ='orange' header='Gather Information' question = {props.prompList[1]}/>
                <GoalInput input = {brainstorm} setInput={setBrainstorm} color ='yellow' header='Brainstorm' question = {props.prompList[2]}/>
                <GoalInput input = {evaluate} setInput={setEvaluate} color ='green' header='Evaluate' question = {props.prompList[3]}/>
                <GoalInput input = {plan} setInput={setPlan} color ='blue' header='Plan and Act' question = {props.prompList[4]}/>
                <GoalInput input = {reflect} setInput={setReflect} color ='purple' header='Reflect' question = {props.prompList[5]}/>
                <Button style={{width:'20%'}} title='ADD' onPress = {addGoalHandler.bind(this, userInput)}/>
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