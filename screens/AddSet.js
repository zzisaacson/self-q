import React, {useState} from 'react';
import {View, Text, Button, StyleSheet,FlatList, TextInput, ScrollView, ImagePropTypes} from 'react-native';

import GoalInput from '../components/GoalInput';
import firebase from 'firebase'

const AddSet = props =>{
    const db = firebase.database();
    const [userInput, setUserInput]= useState('');
    const [focus, setFocus]= useState('');
    const [gather, setGather]= useState('');
    const [brainstorm, setBrainstorm]= useState('');
    const [evaluate, setEvaluate]= useState('');
    const [plan, setPlan]= useState('');
    const [reflect, setReflect]= useState('');
    const addGoalHandler = goalTitle=>{
        const rid =Math.random().toString().substring(2)
        props.setQList([...props.qList, {id: rid, value: goalTitle}]);
        const details = {'name': goalTitle,
                        'focus':{
                            'prompt':props.prompList[0],
                            'answer':focus
                        },
                        'gather':{
                            'prompt':props.prompList[1],
                            'answer':gather
                        },
                        'brainstorm':{
                            'prompt':props.prompList[2],
                            'answer':brainstorm
                        },
                        'evaluate':{
                            'prompt':props.prompList[3],
                            'answer':evaluate
                        },
                        'plan':{
                            'prompt':props.prompList[4],
                            'answer':plan
                        },
                        'reflect':{
                            'prompt':props.prompList[5],
                            'answer':reflect
                        }};
        db.ref(firebase.auth().currentUser.uid+'/detail-list/'+rid).set(details);
        console.log(details);
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
                <GoalInput input = {focus} setInput={setFocus} text={props.answers[0]}color ='red' header='Select A Focus' question = {props.prompList[0]}/>
                <GoalInput input = {gather} setInput={setGather} text={props.answers[1]} color ='orange' header='Gather Information' question = {props.prompList[1]}/>
                <GoalInput input = {brainstorm} setInput={setBrainstorm} text={props.answers[2]} color ='yellow' header='Brainstorm' question = {props.prompList[2]}/>
                <GoalInput input = {evaluate} setInput={setEvaluate} color ='green' text={props.answers[3]} header='Evaluate' question = {props.prompList[3]}/>
                <GoalInput input = {plan} setInput={setPlan} color ='blue' text={props.answers[4]} header='Plan and Act' question = {props.prompList[4]}/>
                <GoalInput input = {reflect} setInput={setReflect} text={props.answers[5]}  color ='purple' header='Reflect' question = {props.prompList[5]}/>
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