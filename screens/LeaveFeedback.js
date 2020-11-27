import React, {useState} from 'react';
import {Image, View, Text, Button, StyleSheet,FlatList, TextInput, ScrollView, ImagePropTypes, TouchableOpacity} from 'react-native';

import GoalInput from '../components/GoalInput';
import CustomGoalInput from '../components/CustomGoalInput';
import firebase from 'firebase'
import FeedbackGoalInput from '../components/FeedbackGoalInput';

const LeaveFeedback = props =>{
    const db = firebase.database();
    // console.log('here sir');
    // console.log(props.qInfo);
    const [useCustom, setUseCustom]= useState(props.qInfo['focus']['prompt']=='');

    const [userInput, setUserInput]= useState(props.qInfo['name']);
    const [focus, setFocus]= useState(props.qInfo['focus']['answer']);
    const [gather, setGather]= useState(props.qInfo['gather']['answer']);
    const [brainstorm, setBrainstorm]= useState(props.qInfo['brainstorm']['answer']);
    const [evaluate, setEvaluate]= useState(props.qInfo['evaluate']['answer']);
    const [plan, setPlan]= useState(props.qInfo['plan']['answer']);
    const [reflect, setReflect]= useState(props.qInfo['reflect']['answer']);

    const [focusP, setFocusP]= useState(props.qInfo['focus']['prompt']);
    const [gatherP, setGatherP]= useState(props.qInfo['gather']['prompt']);
    const [brainstormP, setBrainstormP]= useState(props.qInfo['brainstorm']['prompt']);
    const [evaluateP, setEvaluateP]= useState(props.qInfo['evaluate']['prompt']);
    const [planP, setPlanP]= useState(props.qInfo['plan']['prompt']);
    const [reflectP, setReflectP]= useState(props.qInfo['reflect']['prompt']);

    const [focusR, setFocusR]= useState('');
    const [gatherR, setGatherR]= useState('');
    const [brainstormR, setBrainstormR]= useState('');
    const [evaluateR, setEvaluateR]= useState('');
    const [planR, setPlanR]= useState('');
    const [reflectR, setReflectR]= useState('');
    const addGoalHandler = goalTitle=>{
        const rid =props.rid;
        // var l =[]
        // props.qList.forEach(element=>{
        //     if(element['id']!=rid){
        //         l.push(element);
        //     }
        // });
        // props.setQList([...l, {id: rid, value: goalTitle}]);
        const details = {'name': goalTitle,
                        'focus':{
                            'prompt':focusP,
                            'answer':focus
                        },
                        'gather':{
                            'prompt':gatherP,
                            'answer':gather
                        },
                        'brainstorm':{
                            'prompt':brainstormP,
                            'answer':brainstorm
                        },
                        'evaluate':{
                            'prompt':evaluateP,
                            'answer':evaluate
                        },
                        'plan':{
                            'prompt':planP,
                            'answer':plan
                        },
                        'reflect':{
                            'prompt':reflectP,
                            'answer':reflect
                        }};
        //console.log(details);
        db.ref('classes/'+props.className+'/responses/'+rid+'/'+firebase.auth().currentUser.uid).set(details);
        var classDetails = props.classDetails;
        classDetails['responses'][rid][firebase.auth().currentUser.uid]=details;
        console.log(classDetails);
        props.setClassDetails(classDetails);
        props.setScreen(12);
      };

    const responses=<React.Fragment>
    <FeedbackGoalInput input = {focus} setInput={setFocusR} color ='red' header='Select A Focus' question = {props.qInfo['focus']['prompt'] }/>
    <FeedbackGoalInput input = {gather} setInput={setGatherR}  color ='orange' header='Gather Information' question = {props.qInfo['gather']['prompt']}/>
    <FeedbackGoalInput input = {brainstorm} setInput={setBrainstormR} color ='yellow' header='Brainstorm' question = {props.qInfo['brainstorm']['prompt']}/>
    <FeedbackGoalInput input = {evaluate} setInput={setEvaluateR} color ='green'header='Evaluate' question = {props.qInfo['evaluate']['prompt']}/>
    <FeedbackGoalInput input = {plan} setInput={setPlanR} color ='blue'  header='Plan and Act' question = {props.qInfo['plan']['prompt']}/>
    <FeedbackGoalInput input = {reflect} setInput={setReflectR}  color ='purple' header='Reflect' question = {props.qInfo['reflect']['prompt']}/></React.Fragment>;



    return(
        <ScrollView>
                
            <View style={{
                padding:30,
                flex:1,
                flexDirection :'column',
                alignItems: 'center'
            }}>
                
                <Text style={{fontWeight:'bold'}} >Leave Feedback</Text>
                <Text style={{
            width: '80%', 
            borderColor:'black', 
            borderWidth:1, 
            padding:10,
            marginBottom: 10
        }} > {userInput}</Text>
                {responses}
                <Button style={{width:'20%'}} title='DONE' onPress = {addGoalHandler.bind(this, userInput)}/>
            </View>
        </ScrollView>
    );
    
}

const styles = StyleSheet.create({
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

export default LeaveFeedback;