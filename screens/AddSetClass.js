import React, {useState} from 'react';
import {Image, View, Text, Button, StyleSheet,FlatList, TextInput, ScrollView, ImagePropTypes, TouchableOpacity} from 'react-native';

import GoalInput from '../components/GoalInput';
import CustomGoalInput from '../components/CustomGoalInput';
import firebase from 'firebase'

const AddSetClass = props =>{
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
        db.ref('classes/'+props.className).on("value", function(snapshot) {
            const data=snapshot.val();
            console.log(data);
            props.setClassDetails(data);
            props.setScreen(12);
            
          }, function (errorObject) {
            setError("The read failed: " + errorObject.code+' Please try again.');
          });

      
      };

      const handleSwipeButton=()=>{
        const details = {'name': userInput,
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
        props.setQInfo(details);
          props.setScreen(17);
      }

    const regInput=<React.Fragment>
    <GoalInput input = {focus} setInput={setFocus} text={props.qInfo['focus']['prompt']}color ='red' header='Select A Focus' question = {props.qInfo['focus']['prompt'] }useCustom={setUseCustom}/>
    <GoalInput input = {gather} setInput={setGather} text={props.qInfo['gather']['prompt']} color ='orange' header='Gather Information' question = {props.qInfo['gather']['prompt']}useCustom={setUseCustom}/>
    <GoalInput input = {brainstorm} setInput={setBrainstorm} text={props.qInfo['brainstorm']['prompt']} color ='yellow' header='Brainstorm' question = {props.qInfo['brainstorm']['prompt']}useCustom={setUseCustom}/>
    <GoalInput input = {evaluate} setInput={setEvaluate} color ='green' text={props.qInfo['evaluate']['prompt']} header='Evaluate' question = {props.qInfo['evaluate']['prompt']}useCustom={setUseCustom}/>
    <GoalInput input = {plan} setInput={setPlan} color ='blue' text={props.qInfo['plan']['prompt']} header='Plan and Act' question = {props.qInfo['plan']['prompt']}useCustom={setUseCustom}/>
    <GoalInput input = {reflect} setInput={setReflect} text={props.qInfo['reflect']['prompt']}  color ='purple' header='Reflect' question = {props.qInfo['reflect']['prompt']}useCustom={setUseCustom}/></React.Fragment>;

const custInput=<React.Fragment>
<CustomGoalInput color='red' input = {focus} setInput={setFocus}  header='Select A Focus' prompt={focusP} setPrompt={setFocusP}/>
<CustomGoalInput color ='orange' input = {gather} setInput={setGather}  header='Gather Information' prompt={gatherP} setPrompt={setGatherP}/>
<CustomGoalInput color ='yellow' input = {brainstorm} setInput={setBrainstorm}  header='Brainstorm' prompt={brainstormP} setPrompt={setBrainstormP}/>
<CustomGoalInput color ='green' input = {evaluate} setInput={setEvaluate}  header='Evaluate' prompt={evaluateP} setPrompt={setEvaluateP}/>
<CustomGoalInput color ='blue' input = {plan} setInput={setPlan}  header='Plan and Act' prompt={planP} setPrompt={setPlanP}/>
<CustomGoalInput color ='purple' input = {reflect} setInput={setReflect}  header='Reflect' prompt={reflectP} setPrompt={setReflectP}/>
</React.Fragment>;
    var input=useCustom? custInput:regInput;

    return(
        <ScrollView>
            <View style={{width:'90%', flexDirection:'row-reverse'}}>
                <TouchableOpacity onPress={handleSwipeButton}>
                    <Image style={{height:50,width:50, margin:16}}
                        source={require('../assets/swipe_btn.png')}
                        resizeMode={"stretch"}/>
                </TouchableOpacity>
            </View>
                
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
                {input}
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

export default AddSetClass;