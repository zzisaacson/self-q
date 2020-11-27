import React, {useState} from 'react';
import {Image,View, Platform,Dimensions, Text, Button, StyleSheet,FlatList, TextInput, ScrollView, ImagePropTypes, TouchableOpacity} from 'react-native';

import GoalInput from '../components/GoalInput';
import CustomGoalInput from '../components/CustomGoalInput';
import firebase from 'firebase'

const SwipeAddSetClass = props =>{
    const db = firebase.database();
    const [currQ, setCurrQ]= useState(0);
    const [useCustom, setUseCustom]= useState(false);

    const [userInput, setUserInput]= useState(props.qInfo['name']);
    console.log(userInput);
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
        console.log(details);
        db.ref('classes/'+props.className+'/responses/'+rid+'/'+firebase.auth().currentUser.uid).set(details);
        var classDetails = props.classDetails;
        classDetails['responses'][rid][firebase.auth().currentUser.uid]=details;
        console.log(classDetails);
        props.setClassDetails(classDetails);
        props.setScreen(12);
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
        props.setScreen(16);
    }

    const namePage=<React.Fragment>
      <View style={{flex:1}}>
      <View style={{width:'90%', flexDirection:'row-reverse'}}>
                <TouchableOpacity onPress={handleSwipeButton}>
                    <Image style={{height:50,width:50, margin:16}}
                        source={require('../assets/row_btn.png')}
                        resizeMode={"stretch"}/>
                </TouchableOpacity>
            </View>
          <View style={{
                  flex:1,
                  flexDirection :'column',
                  alignItems: 'center',
                  padding:20
              }}>
                  <TextInput value={userInput} onChangeText={setUserInput} style={{backgroundColor:'white',width: '100%', borderColor:'black', borderWidth:1, padding:10,margin: 20}} placeholder='Name this question set'></TextInput>
                  <View style={{height:'15%',width:'100%',flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                          <Button onPress={(userInput)=>addGoalHandler(userInput)} title={' DONE '}/>
                          
                  </View>
                  <View style={{height:'70%',flexDirection:'column-reverse'}}>
                  <View style={{height:'15%',width:'100%',flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <TouchableOpacity style={{height:120,width:120}} onPress={()=>setCurrQ((currQ+6)%7)}>
                                <Image 
                                source={require('../assets/left_arrow.png')}
                                style={{height:'100%',width:'100%'}}
                                resizeMode={"stretch"}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{height:120,width:120}} onPress={()=>setCurrQ((currQ+1)%7)}>
                                <Image 
                                source={require('../assets/right_arrow.png')}
                                style={{height:'100%',width:'100%'}}
                                resizeMode={"stretch"}/>
                            </TouchableOpacity>
                            
                    </View>
                    </View>
          </View>
      </View>
  </React.Fragment>;

    const focusPage=<React.Fragment>
        <View style={{flex:1}}>
            <View style={{
                    flex:1,
                    flexDirection :'column',
                    alignItems: 'center',
                    backgroundColor:'red',
                    padding:20
                }}>
                    <TextInput value={focusP} onChangeText={setFocusP} style={{backgroundColor:'white',width: '100%', borderColor:'black', borderWidth:1, padding:10,margin: 20}} placeholder='Ask a focus question'></TextInput>
                    <TextInput value={focus} onChangeText={setFocus} multiline={true} style={{backgroundColor:'white',width: '100%', height:'70%',borderColor:'black', borderWidth:1, padding:10,margin: 20}} placeholder='Answer the focus question'></TextInput>
                    <View style={{height:'15%',width:'100%',flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <TouchableOpacity style={{height:120,width:120}} onPress={()=>setCurrQ((currQ+6)%7)}>
                                <Image 
                                source={require('../assets/left_arrow.png')}
                                style={{height:'100%',width:'100%'}}
                                resizeMode={"stretch"}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{height:120,width:120}} onPress={()=>setCurrQ((currQ+1)%7)}>
                                <Image 
                                source={require('../assets/right_arrow.png')}
                                style={{height:'100%',width:'100%'}}
                                resizeMode={"stretch"}/>
                            </TouchableOpacity>
                            
                    </View>
            </View>
        </View>
    </React.Fragment>;

const gatherPage=<React.Fragment>
<View style={{flex:1}}>
    <View style={{
            flex:1,
            flexDirection :'column',
            alignItems: 'center',
            backgroundColor:'orange',
            padding:20
        }}>
            <TextInput value={gatherP} onChangeText={setGatherP} style={{backgroundColor:'white',width: '100%', borderColor:'black', borderWidth:1, padding:10,margin: 20}} placeholder='Ask a gathering information question'></TextInput>
            <TextInput value={gather} onChangeText={setGather} multiline={true} style={{backgroundColor:'white',width: '100%', height:'70%',borderColor:'black', borderWidth:1, padding:10,margin: 20}} placeholder='Answer the gathering information question'></TextInput>
            <View style={{height:'15%',width:'100%',flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <TouchableOpacity style={{height:120,width:120}} onPress={()=>setCurrQ((currQ+6)%7)}>
                        <Image 
                        source={require('../assets/left_arrow.png')}
                        style={{height:'100%',width:'100%'}}
                        resizeMode={"stretch"}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{height:120,width:120}} onPress={()=>setCurrQ((currQ+1)%7)}>
                        <Image 
                        source={require('../assets/right_arrow.png')}
                        style={{height:'100%',width:'100%'}}
                        resizeMode={"stretch"}/>
                    </TouchableOpacity>
                    
            </View>
    </View>
</View>
</React.Fragment>;

const brainstormPage=<React.Fragment>
<View style={{flex:1}}>
    <View style={{
            flex:1,
            flexDirection :'column',
            alignItems: 'center',
            backgroundColor:'yellow',
            padding:20
        }}>
            <TextInput value={brainstormP} onChangeText={setBrainstormP} style={{backgroundColor:'white',width: '100%', borderColor:'black', borderWidth:1, padding:10,margin: 20}} placeholder='Ask a brainstorming question'></TextInput>
            <TextInput value={brainstorm} onChangeText={setBrainstorm} multiline={true} style={{backgroundColor:'white',width: '100%', height:'70%',borderColor:'black', borderWidth:1, padding:10,margin: 20}} placeholder='Answer the brainstorming question'></TextInput>
            <View style={{height:'15%',width:'100%',flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <TouchableOpacity style={{height:120,width:120}} onPress={()=>setCurrQ((currQ+6)%7)}>
                        <Image 
                        source={require('../assets/left_arrow.png')}
                        style={{height:'100%',width:'100%'}}
                        resizeMode={"stretch"}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{height:120,width:120}} onPress={()=>setCurrQ((currQ+1)%7)}>
                        <Image 
                        source={require('../assets/right_arrow.png')}
                        style={{height:'100%',width:'100%'}}
                        resizeMode={"stretch"}/>
                    </TouchableOpacity>
                    
            </View>
    </View>
</View>
</React.Fragment>;

const evaluatePage=<React.Fragment>
<View style={{flex:1}}>
    <View style={{
            flex:1,
            flexDirection :'column',
            alignItems: 'center',
            backgroundColor:'green',
            padding:20
        }}>
            <TextInput value={evaluateP} onChangeText={setEvaluateP} style={{backgroundColor:'white',width: '100%', borderColor:'black', borderWidth:1, padding:10,margin: 20}} placeholder='Ask an evaluation question'></TextInput>
            <TextInput value={evaluate} onChangeText={setEvaluate} multiline={true} style={{backgroundColor:'white',width: '100%', height:'70%',borderColor:'black', borderWidth:1, padding:10,margin: 20}} placeholder='Answer the evaluation question'></TextInput>
            <View style={{height:'15%',width:'100%',flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <TouchableOpacity style={{height:120,width:120}} onPress={()=>setCurrQ((currQ+6)%7)}>
                        <Image 
                        source={require('../assets/left_arrow.png')}
                        style={{height:'100%',width:'100%'}}
                        resizeMode={"stretch"}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{height:120,width:120}} onPress={()=>setCurrQ((currQ+1)%7)}>
                        <Image 
                        source={require('../assets/right_arrow.png')}
                        style={{height:'100%',width:'100%'}}
                        resizeMode={"stretch"}/>
                    </TouchableOpacity>
                    
            </View>
    </View>
</View>
</React.Fragment>;

const planPage=<React.Fragment>
<View style={{flex:1}}>
    <View style={{
            flex:1,
            flexDirection :'column',
            alignItems: 'center',
            backgroundColor:'blue',
            padding:20
        }}>
            <TextInput value={planP} onChangeText={setPlanP} style={{backgroundColor:'white',width: '100%', borderColor:'black', borderWidth:1, padding:10,margin: 20}} placeholder='Ask a plan and action question'></TextInput>
            <TextInput value={plan} onChangeText={setPlan} multiline={true} style={{backgroundColor:'white',width: '100%', height:'70%',borderColor:'black', borderWidth:1, padding:10,margin: 20}} placeholder='Answer the plan and action question'></TextInput>
            <View style={{height:'15%',width:'100%',flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <TouchableOpacity style={{height:120,width:120}} onPress={()=>setCurrQ((currQ+6)%7)}>
                        <Image 
                        source={require('../assets/left_arrow.png')}
                        style={{height:'100%',width:'100%'}}
                        resizeMode={"stretch"}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{height:120,width:120}} onPress={()=>setCurrQ((currQ+1)%7)}>
                        <Image 
                        source={require('../assets/right_arrow.png')}
                        style={{height:'100%',width:'100%'}}
                        resizeMode={"stretch"}/>
                    </TouchableOpacity>
                    
            </View>
    </View>
</View>
</React.Fragment>;

const reflectPage=<React.Fragment>
<View style={{flex:1}}>
    <View style={{
            flex:1,
            flexDirection :'column',
            alignItems: 'center',
            backgroundColor:'purple',
            padding:20
        }}>
            <TextInput value={reflectP} onChangeText={setReflectP} style={{backgroundColor:'white',width: '100%', borderColor:'black', borderWidth:1, padding:10,margin: 20}} placeholder='Ask a reflection question'></TextInput>
            <TextInput value={reflect} onChangeText={setReflect} multiline={true} style={{backgroundColor:'white',width: '100%', height:'70%',borderColor:'black', borderWidth:1, padding:10,margin: 20}} placeholder='Answer the reflection question'></TextInput>
            <View style={{height:'15%',width:'100%',flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <TouchableOpacity style={{height:120,width:120}} onPress={()=>setCurrQ((currQ+6)%7)}>
                        <Image 
                        source={require('../assets/left_arrow.png')}
                        style={{height:'100%',width:'100%'}}
                        resizeMode={"stretch"}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{height:120,width:120}} onPress={()=>setCurrQ((currQ+1)%7)}>
                        <Image 
                        source={require('../assets/right_arrow.png')}
                        style={{height:'100%',width:'100%'}}
                        resizeMode={"stretch"}/>
                    </TouchableOpacity>
                    
            </View>
    </View>
</View>
</React.Fragment>;



    return(
        <View style={{flex:1}}>
            {currQ==0&&namePage}
            {currQ==1&&focusPage}
            {currQ==2&&gatherPage}
            {currQ==3&&brainstormPage}
            {currQ==4&&evaluatePage}
            {currQ==5&&planPage}
            {currQ==6&&reflectPage}
        </View>
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

export default SwipeAddSetClass;