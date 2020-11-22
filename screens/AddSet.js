import React, {useState} from 'react';
import {View, Text, Button, StyleSheet,FlatList, TextInput, ScrollView, ImagePropTypes} from 'react-native';

import GoalInput from '../components/GoalInput';
import firebase from 'firebase'

const AddSet = props =>{
    const db = firebase.database();
    const [userInput, setUserInput]= useState(props.qInfo['name']);
    const [focus, setFocus]= useState(props.qInfo['focus']['answer']);
    const [gather, setGather]= useState(props.qInfo['gather']['answer']);
    const [brainstorm, setBrainstorm]= useState(props.qInfo['brainstorm']['answer']);
    const [evaluate, setEvaluate]= useState(props.qInfo['evaluate']['answer']);
    const [plan, setPlan]= useState(props.qInfo['plan']['answer']);
    const [reflect, setReflect]= useState(props.qInfo['reflect']['answer']);
    const addGoalHandler = goalTitle=>{
        const rid =props.rid;
        if (!rid in props.qList.filter(q=>q['id'])){
            props.setQList([...props.qList, {id: rid, value: goalTitle}]);
        }
        const details = {'name': goalTitle,
                        'focus':{
                            'prompt':props.qInfo['focus']['prompt'],
                            'answer':focus
                        },
                        'gather':{
                            'prompt':props.qInfo['gather']['prompt'],
                            'answer':gather
                        },
                        'brainstorm':{
                            'prompt':props.qInfo['brainstorm']['prompt'],
                            'answer':brainstorm
                        },
                        'evaluate':{
                            'prompt':props.qInfo['evaluate']['prompt'],
                            'answer':evaluate
                        },
                        'plan':{
                            'prompt':props.qInfo['plan']['prompt'],
                            'answer':plan
                        },
                        'reflect':{
                            'prompt':props.qInfo['reflect']['prompt'],
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
                <TextInput value = {userInput} placeholder = 'Name' style={{
            width: '80%', 
            borderColor:'black', 
            borderWidth:1, 
            padding:10,
            marginBottom: 10
        }} onChangeText ={text=>setUserInput(text)}/>
                <GoalInput input = {focus} setInput={setFocus} text={props.qInfo['focus']['prompt']}color ='red' header='Select A Focus' question = {props.qInfo['focus']['prompt']}/>
                <GoalInput input = {gather} setInput={setGather} text={props.qInfo['gather']['prompt']} color ='orange' header='Gather Information' question = {props.qInfo['gather']['prompt']}/>
                <GoalInput input = {brainstorm} setInput={setBrainstorm} text={props.qInfo['brainstorm']['prompt']} color ='yellow' header='Brainstorm' question = {props.qInfo['brainstorm']['prompt']}/>
                <GoalInput input = {evaluate} setInput={setEvaluate} color ='green' text={props.qInfo['evaluate']['prompt']} header='Evaluate' question = {props.qInfo['evaluate']['prompt']}/>
                <GoalInput input = {plan} setInput={setPlan} color ='blue' text={props.qInfo['plan']['prompt']} header='Plan and Act' question = {props.qInfo['plan']['prompt']}/>
                <GoalInput input = {reflect} setInput={setReflect} text={props.qInfo['reflect']['prompt']}  color ='purple' header='Reflect' question = {props.qInfo['reflect']['prompt']}/>
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