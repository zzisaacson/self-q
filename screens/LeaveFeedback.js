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

    const [focusR, setFocusR]= useState(props.fInfo['focus']);
    const [gatherR, setGatherR]= useState(props.fInfo['gather']);
    const [brainstormR, setBrainstormR]= useState(props.fInfo['brainstorm']);
    const [evaluateR, setEvaluateR]= useState(props.fInfo['evaluate']);
    const [planR, setPlanR]= useState(props.fInfo['plan']);
    const [reflectR, setReflectR]= useState(props.fInfo['reflect']);
    const [gFeedback, setGFeedback]=useState(props.fInfo['gFeedback']);
    const [grade, setGrade]=useState(props.fInfo['grade']);

    const [error, setError]=useState('');

    const handleAnswer =()=>{
      props.setScreen(16);
    }
    const handleDone = ()=>{
        if(focus.length+gather.length+brainstorm.length+evaluate.length+plan.length+reflect.length<1){
          setError("Your child must write a response before you can leave feedback.")
          return;
        }
        const rid =props.rid;
        // var l =[]
        // props.qList.forEach(element=>{
        //     if(element['id']!=rid){
        //         l.push(element);
        //     }
        // });
        // props.setQList([...l, {id: rid, value: goalTitle}]);
        const details = {//'grade': grade,
                        'gFeedback':gFeedback,
                        'focus':focusR,
                        'gather':gatherR,
                        'brainstorm':brainstormR,
                        'evaluate':evaluateR,
                        'plan':planR,
                        'reflect':reflectR};
        //console.log(details);
        db.ref('classes/'+props.className+'/responses/'+rid+'/'+props.student).set(props.qInfo);
        db.ref('classes/'+props.className+'/responses/'+rid+'/'+props.student+'/feedback').set(details);
        var classDetails = props.classDetails;
        //console.log(rid);
        //console.log(classDetails);
        classDetails['responses'][rid][props.student]=props.qInfo;
        classDetails['responses'][rid][props.student]['feedback']=details;
        //console.log(classDetails);
        props.setClassDetails(classDetails);
        props.setScreen(12);
      };

    const responses=<React.Fragment>
    <FeedbackGoalInput comment={focusR}input = {focus} setInput={setFocusR} color ='#00FFFF' header='Select A Focus' question = {props.qInfo['focus']['prompt'] }/>
    <FeedbackGoalInput comment={gatherR}input = {gather} setInput={setGatherR}  color ='#AF69EF' header='Gather Information' question = {props.qInfo['gather']['prompt']}/>
    <FeedbackGoalInput comment={brainstormR}input = {brainstorm} setInput={setBrainstormR} color ='yellow' header='Brainstorm' question = {props.qInfo['brainstorm']['prompt']}/>
    <FeedbackGoalInput comment={evaluateR}input = {evaluate} setInput={setEvaluateR} color ='green'header='Evaluate' question = {props.qInfo['evaluate']['prompt']}/>
    <FeedbackGoalInput comment={planR}input = {plan} setInput={setPlanR} color ='#ffdb58'  header='Plan and Act' question = {props.qInfo['plan']['prompt']}/>
    <FeedbackGoalInput comment={reflectR} input = {reflect} setInput={setReflectR}  color ='purple' header='Reflect' question = {props.qInfo['reflect']['prompt']}/></React.Fragment>;



    return(
        <ScrollView>
                
            <View style={{
                padding:30,
                flex:1,
                flexDirection :'column',
                alignItems: 'center'
            }}>
              <Button style={{width:'20%'}} title='Edit Answers on This Device' onPress = {handleAnswer}/>
                
                <Text style={{fontWeight:'bold'}} >Leave Feedback</Text>
                <Text style={{
            width: '80%', 
            borderColor:'black', 
            borderWidth:1, 
            padding:10,
            marginBottom: 10
        }} > {userInput}</Text>
                {responses}
                <TextInput value={gFeedback}style={styles.input} placeholder='General Feedback' onChangeText={text=>setGFeedback(text)}/>
                {/* <TextInput value={grade}  style={{
        width: '10%', 
        borderColor:'black', 
        borderWidth:1, 
        padding:10,
        marginBottom: 10
      }} placeholder='Grade' onChangeText={text=>setGrade(text)}/> */}
              <Text style={styles.text}>{error}</Text>
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
      },    text: {
        color: 'grey',
        marginTop:5
    },
});

export default LeaveFeedback;