import React, {useState} from 'react';
import {Image, View, Text, Button, StyleSheet,FlatList, TextInput, ScrollView, ImagePropTypes, TouchableOpacity, AsyncStorage} from 'react-native';

import GoalInput from '../components/GoalInput';
import CustomGoalInput from '../components/CustomGoalInput';
import firebase from 'firebase'

const AssignSet = props =>{
    const db = firebase.database();
    const [useCustom, setUseCustom]= useState(true);

    const [assignTo, setAssignTo]= useState(props.assignTo);
    const [error, setError]=useState('');
    //const [groupName, setGroupName] = useState('');

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

    
    const checkAndCreateClass = (name, then)=>{
        props.setClassName(name);
        console.log('Name: '+name)
        setError('Loading...');
        db.ref('/classes/'+name.toLowerCase()).once("value", function(snapshot) {
            const data=snapshot.val();
            if(data==null){
                //console.log(props.classes);
                props.setClasses([...props.classes, {'id':name.toLowerCase(),'value':name.toLowerCase()}]);
                //db.ref('/classes/'+groupName.toLowerCase()+'/password').set(password);
                //console.log('members: '+[firebase.auth().currentUser.uid,props.nicknameToIds[assignTo]]);
                const members ={};
                members[firebase.auth().currentUser.uid]=true;
                members[(props.nicknameToIds[assignTo])]= true;
                db.ref('/classes/'+name.toLowerCase()+'/members').set(members/*new Set([firebase.auth().currentUser.uid,props.nicknameToIds[assignTo]])*/);
                db.ref('/classes/'+name.toLowerCase()+'/owner').set(firebase.auth().currentUser.uid);
                db.ref('/'+props.nicknameToIds[assignTo]+"/requests/"+name.toLowerCase()).set(true);
                db.ref('/'+firebase.auth().currentUser.uid+"/requests/"+name.toLowerCase()).set(true);
                props.setClassName(name.toLowerCase());
                
                props.setClassDetails({//'password':password,
                                    'members':[firebase.auth().currentUser.uid],
                                    'owner':firebase.auth().currentUser.uid

                });
                then();
            }
            else{

                console.log('Class already exists');
                
                then();
            }
          }, function (errorObject) {
            props.setClasses([...props.classes, {'id':name.toLowerCase(),'value':name.toLowerCase()}]);
            //db.ref('/classes/'+groupName.toLowerCase()+'/password').set(password);
            //console.log('members: '+[firebase.auth().currentUser.uid,props.nicknameToIds[assignTo]]);
            const members ={};
            members[firebase.auth().currentUser.uid]=true;
            members[(props.nicknameToIds[assignTo])]= true;
            db.ref('/classes/'+name.toLowerCase()+'/members').set(members/*new Set([firebase.auth().currentUser.uid,props.nicknameToIds[assignTo]])*/);
            db.ref('/classes/'+name.toLowerCase()+'/owner').set(firebase.auth().currentUser.uid);
            db.ref('/'+props.nicknameToIds[assignTo]+"/requests/"+name.toLowerCase()).set(true);
            db.ref('/'+firebase.auth().currentUser.uid+"/requests/"+name.toLowerCase()).set(true);
            props.setClassName(name.toLowerCase());
            
            props.setClassDetails({//'password':password,
                                'members':[firebase.auth().currentUser.uid],
                                'owner':firebase.auth().currentUser.uid

            });
            then();
            //setError("The read failed: " + errorObject.code+' Please try again');
            //console.log(errorObject.code);
          });
          
        };

    const addGoalHandler = goalTitle=>{

        console.log(props.nicknameToIds);
        if (!props.nicknameToIds.hasOwnProperty(assignTo)){
            setError('The user with the nickname you specified does not exist.')
            return;
        }
        
        props.setClassName(props.nickname+'-'+assignTo);
        const then= ()=>{
            props.setClassName(props.nickname+'-'+assignTo);
            
            const rid =props.rid;
            props.setLink("http://education.selfq.org/link?assignment="+props.rid+"&class="+(props.nickname+'-'+assignTo).replaceAll(" ", "%20"));
            var rid_contained=false;
            var l =[];
            var assignments=[];
            if(props.classDetails['assignments']!=null && props.classDetails['assignments']['set-list']!=null){
                assignments=props.classDetails['assignments']['set-list'];
            }
            console.log(props.x);
            console.log(assignments);
            assignments.forEach(element=>{
                if(element['id']!=rid){
                    l.push(element);
                }
            });
            console.log('About to set database to :'+[...l, {id: rid, value: goalTitle}])
            db.ref('/classes/'+props.nickname+'-'+assignTo+'/assignments/set-list').set([...l, {id: rid, value: goalTitle}]);
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
            db.ref('/classes/'+props.nickname+'-'+assignTo+'/assignments/details/'+rid).set(details);

            db.ref('/classes/'+props.nickname+'-'+assignTo).on("value", function(snapshot) {
                const data=snapshot.val();
                props.setClassDetails(data);

                var toPage=12;
                if(focusP!=props.qInfo['focus']['prompt']||gatherP!=props.qInfo['gather']['prompt']||brainstormP!=props.qInfo['brainstorm']['prompt']||
                    evaluateP!=props.qInfo['evaluate']['prompt']||planP!=props.qInfo['plan']['prompt']||reflectP!=props.qInfo['reflect']['prompt']  ){
                        props.setQInfo(details);
                        toPage=6;
                    }
                //console.log(details);
                props.setScreen(toPage);
                
            }, function (errorObject) {
                setError("The read failed: " + errorObject.code+' Please try again.');
            });

            props.setAssignTo('');
      };

      checkAndCreateClass(props.nickname+'-'+assignTo, then);
    };

    

      const regInput=<React.Fragment>
      <GoalInput input = {focus} setInput={setFocus} text={props.qInfo['focus']['prompt']}color ='#00FFFF' header='Select A Focus' question = {props.qInfo['focus']['prompt'] }useCustom={setUseCustom}/>
      <GoalInput input = {gather} setInput={setGather} text={props.qInfo['gather']['prompt']} color ='#AF69EF' header='Gather Information' question = {props.qInfo['gather']['prompt']}useCustom={setUseCustom}/>
      <GoalInput input = {brainstorm} setInput={setBrainstorm} text={props.qInfo['brainstorm']['prompt']} color ='orange' header='Brainstorm' question = {props.qInfo['brainstorm']['prompt']}useCustom={setUseCustom}/>
      <GoalInput input = {evaluate} setInput={setEvaluate} color ='green' text={props.qInfo['evaluate']['prompt']} header='Evaluate' question = {props.qInfo['evaluate']['prompt']}useCustom={setUseCustom}/>
      <GoalInput input = {plan} setInput={setPlan} color ='#ffdb58' text={props.qInfo['plan']['prompt']} header='Plan and Act' question = {props.qInfo['plan']['prompt']}useCustom={setUseCustom}/>
      <GoalInput input = {reflect} setInput={setReflect} text={props.qInfo['reflect']['prompt']}  color ='purple' header='Reflect' question = {props.qInfo['reflect']['prompt']}useCustom={setUseCustom}/></React.Fragment>;
  
  const custInput=<React.Fragment>
  <CustomGoalInput color='#00FFFF' input = {focus} setInput={setFocus}  header='Select A Focus' prompt={focusP} setPrompt={setFocusP}/>
  <CustomGoalInput color ='#AF69EF' input = {gather} setInput={setGather}  header='Gather Information' prompt={gatherP} setPrompt={setGatherP}/>
  <CustomGoalInput color ='yellow' input = {brainstorm} setInput={setBrainstorm}  header='Brainstorm' prompt={brainstormP} setPrompt={setBrainstormP}/>
  <CustomGoalInput color ='green' input = {evaluate} setInput={setEvaluate}  header='Evaluate' prompt={evaluateP} setPrompt={setEvaluateP}/>
  <CustomGoalInput color ='ffdb58' input = {plan} setInput={setPlan}  header='Plan and Act' prompt={planP} setPrompt={setPlanP}/>
  <CustomGoalInput color ='purple' input = {reflect} setInput={setReflect}  header='Reflect' prompt={reflectP} setPrompt={setReflectP}/>
  </React.Fragment>;
    var input=useCustom? custInput:regInput;

    return(
        <ScrollView>
                
            <View style={{
                padding:30,
                flex:1,
                flexDirection :'column',
                alignItems: 'center'
            }}>
                <Text >Assign to user </Text>
                <TextInput value = {assignTo} placeholder = 'User ID' style={{
            width: '80%', 
            borderColor:'black', 
            borderWidth:1, 
            padding:10,
            marginBottom: 10
        }} onChangeText ={text=>setAssignTo(text)}/>
                
                <Text style={{fontWeight:'bold'}} ><br /><br />Ask a question</Text>
                <TextInput value = {userInput} placeholder = 'Question' style={{
            width: '80%', 
            borderColor:'black', 
            borderWidth:1, 
            padding:10,
            marginBottom: 10
        }} onChangeText ={text=>setUserInput(text)}/>
                {input}
                <Text style={ {color: 'grey',marginTop:5}}>{error}</Text>
                <Button style={{width:'20%'}} title='ASSIGN' onPress = {addGoalHandler.bind(this, userInput)}/>
            </View>
        </ScrollView>
    );
    
}


export default AssignSet;