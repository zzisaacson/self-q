import React, {useState} from 'react';
import {Image, View, Text, Button, StyleSheet,FlatList, TextInput, ScrollView, ImagePropTypes, TouchableOpacity} from 'react-native';

import GoalInput from '../components/GoalInput';
import CustomGoalInput from '../components/CustomGoalInput';
import firebase from 'firebase'
import FeedbackGoalInput from '../components/FeedbackGoalInput';
import FeedbackGoalView from '../components/FeedbackGoalView';

const ViewFeedback = props =>{
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

    const [focusR, setFocusR]= useState(props.fInfo['focus']);
    const [gatherR, setGatherR]= useState(props.fInfo['gather']);
    const [brainstormR, setBrainstormR]= useState(props.fInfo['brainstorm']);
    const [evaluateR, setEvaluateR]= useState(props.fInfo['evaluate']);
    const [planR, setPlanR]= useState(props.fInfo['plan']);
    const [reflectR, setReflectR]= useState(props.fInfo['reflect']);
    const [gFeedback, setGFeedback]=useState(props.fInfo['gFeedback']);
    const [grade, setGrade]=useState(props.fInfo['grade']);
    const handleDone = ()=>{
       
        //props.setClassDetails(classDetails);
        props.setScreen(12);
      };

    const responses=<React.Fragment>
    <FeedbackGoalView comment={focusR}input = {focus} setInput={setFocusR} color ='red' header='Select A Focus' question = {props.qInfo['focus']['prompt'] }/>
    <FeedbackGoalView comment={gatherR}input = {gather} setInput={setGatherR}  color ='orange' header='Gather Information' question = {props.qInfo['gather']['prompt']}/>
    <FeedbackGoalView comment={brainstormR}input = {brainstorm} setInput={setBrainstormR} color ='yellow' header='Brainstorm' question = {props.qInfo['brainstorm']['prompt']}/>
    <FeedbackGoalView comment={evaluateR}input = {evaluate} setInput={setEvaluateR} color ='green'header='Evaluate' question = {props.qInfo['evaluate']['prompt']}/>
    <FeedbackGoalView comment={planR}input = {plan} setInput={setPlanR} color ='blue'  header='Plan and Act' question = {props.qInfo['plan']['prompt']}/>
    <FeedbackGoalView comment={reflectR} input = {reflect} setInput={setReflectR}  color ='purple' header='Reflect' question = {props.qInfo['reflect']['prompt']}/></React.Fragment>;



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
            padding:10,
            marginBottom: 10
        }} > {userInput}</Text>
                {responses}
                <Text style={{fontStyle:'italic'}}>{gFeedback!=''?'Feedback: '+gFeedback:''}</Text>
                <Text style={{fontStyle:'italic'}} >{'Grade: '+grade}</Text>
                <Button style={{width:'20%'}} title='DONE' onPress = {handleDone}/>
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

export default ViewFeedback;