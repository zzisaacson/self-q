import React, {useState } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, TextInput, ScrollView, FlatList } from 'react-native';
import Home from './screens/Home' 
import AddSet from './screens/AddSet';
import AddCustomSet from './screens/AddCustomSet';
import Login from './screens/Login';
import Tab from './components/Tab';
import MenuBar from './components/MenuBar';
import TypeSelect from './screens/TypeSelect';
import Settings from './screens/Settings';
import AddCustomPrompts from './screens/AddCustomPrompts';
import SelectCustom from './screens/SelectCustom';
import SwipeAddSet from './screens/SwipeAddSet';


import firebase from 'firebase';
import SignUp from './screens/SignUp';
import ClassroomMain from './screens/ClassroomMain';
import ClassroomCreate from './screens/ClassroomCreate';
import ClassroomJoin from './screens/ClassroomJoin';
import ClassroomDetails from './screens/ClassDetails';
import AssignTypeSelect from './screens/AssignTypeSelect';
import AssignSet from './screens/AssignSet';
import AddSetClass from './screens/AddSetClass';
import SwipeAddSetClass from './screens/SwipeAddSetClass';
import GradingStudList from './screens/GradingStudList';
import ClassSelectCustom from './screens/ClassSelectCustom';
import LeaveFeedback from './screens/LeaveFeedback';
import FeedbackGoalView from './components/FeedbackGoalView';
import ViewFeedback from './screens/ViewFeedback';
//import { firebaseConfig } from './components/config';
//import { firebaseConfig } from './components/config';
const firebaseConfig={
  apiKey: "AIzaSyC9IrMEpuMkTgDdYnXzay5PnZ1MYgrqeyU",
  authDomain: "self-q.firebaseapp.com",
  databaseURL: "https://self-q.firebaseio.com",
  projectId: "self-q",
  storageBucket: "self-q.appspot.com",
  messagingSenderId: "815667248878",
  appId: "1:815667248878:web:5101ab55ce6deac57ffdff",
  measurementId: "G-C9QTCTBDSL"
}
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

export default function App() { 
  
  const [currScreen, setScreen]= useState(2);
  const [courseGoals, setCourseGoals] = useState([]);
  const [colorList, setColorList] = useState(['lightgrey','lightgrey','lightgrey','lightblue']); 
  const [qInfo, setQInfo]= useState(4);
  const [rid, setRid]=useState(0);
  const [classes, setClasses]=useState([]);
  const [classDetails, setClassDetails]=useState([]);
  const [className, setClassName]=useState('');
  const [student, setStudent]=useState('');
  const [fInfo, setFInfo]=useState('');


  if (screen==2 && firebase.auth().currentUser!=null){
    setScreen(0);
  }

  //console.log(firebase.auth().currentUser.uid)
  const setGoalsHanlder=goals=>{
    //console.log(firebase.auth().currentUser.uid)
    db.ref(firebase.auth().currentUser.uid+'/set-list').set(goals);
    return setCourseGoals(goals);
  }

  const goClassroomHandler=()=>{
    var l =[];
    //console.log(firebase.auth().currentUser.uid)
    db.ref('/classes').once("value", function(snapshot) {
      const data=snapshot.val();
      const uid = firebase.auth().currentUser.uid;
      
      for(var c in data){
          
          for(var m in data[c]['members']){
              if(uid==data[c]['members'][m]){
                  l.push({'id':c,'value':c});
              }
          }
          
      }

      console.log(l);
      setClasses(l);
      setScreenHandler(9);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code+' Please try again');
    });
    
  }

  const setScreenHandler=screen=>{
    console.log('To '+screen +' and beyond');
    var cList = [];
    if(screen == 0){
      cList= ['lightblue','lightgrey','lightgrey','lightgrey'];
    }
    else if(screen==1||screen==4||screen==7||screen==8){
      cList= ['lightgrey','lightblue','lightgrey','lightgrey'];
    }
    else if(screen==9||screen==10||screen==11||screen==12||screen==13||screen==14||screen==15||screen==16||screen==17||screen==18){
      cList= ['lightgrey','lightgrey','lightblue','lightgrey'];
    }
    else if(screen==2 ||screen==3 || screen==5) {
      cList= ['lightgrey','lightgrey','lightgrey','lightblue'];
    }
    else{
      cList= ['lightgrey','lightblue','lightgrey','lightgrey'];
    }
    setColorList(cList)
    return setScreen(screen)
  }
  screen = <Home setRid={setRid} setQInfo={setQInfo } setScreen = {setScreenHandler} qList ={courseGoals} setQList={setGoalsHanlder} setNoDB={setCourseGoals}/>
  if (currScreen==1 ){
    screen = <AddSet rid={rid} qInfo={qInfo} setQInfo={setQInfo} setScreen = {setScreenHandler} qList ={courseGoals} setQList={setGoalsHanlder}/>
  }
  if (currScreen==2){
    screen = <Login setScreen = {setScreenHandler}/>
  }
  if (currScreen==3){
    screen = <SignUp setScreen = {setScreenHandler}/>
  }
  if (currScreen==4){
    screen = <TypeSelect setQInfo={setQInfo} setScreen = {setScreen} setRid={setRid}/>
  }
  if (currScreen==5){
    screen = <Settings setScreen={setScreenHandler}/>
  }
  if (currScreen==6){
    screen = <AddCustomPrompts qInfo ={qInfo} setScreen={setScreenHandler}/>
  }
  if (currScreen==7){
    screen = <SelectCustom setQInfo={setQInfo} qInfo ={qInfo} setScreen={setScreenHandler}/>
  }
  if (currScreen==8){
    screen = <SwipeAddSet rid={rid} qList={courseGoals} setQList={setGoalsHanlder} setQInfo={setQInfo} qInfo ={qInfo} setScreen={setScreenHandler}/>
  }
  if (currScreen==9){
    screen = <ClassroomMain setClassName={setClassName} setClassDetails={setClassDetails} classes={classes} setQInfo={setQInfo} qInfo ={qInfo} setScreen={setScreenHandler}/>
  }
  if (currScreen==10){
    screen = <ClassroomCreate setClassDetails={setClassDetails}setClassName={setClassName}setQInfo={setQInfo} qInfo ={qInfo} setScreen={setScreenHandler}/>
  }
  if (currScreen==11){
    screen = <ClassroomJoin  classes={classes}setClasses={setClasses}setQInfo={setQInfo} qInfo ={qInfo} setScreen={setScreenHandler}/>
  }
  if (currScreen==12){
    screen = <ClassroomDetails setFInfo={setFInfo} setRid={setRid} name ={className}classDetails={classDetails} setQInfo={setQInfo} qInfo ={qInfo} setScreen={setScreenHandler}/>
  }
  if (currScreen==13){
    screen = <AssignTypeSelect setQInfo={setQInfo} setScreen = {setScreen} setRid={setRid}/>
  }
  if (currScreen==14){
    screen = <AssignCustom setQInfo={setQInfo} qInfo ={qInfo} setScreen={setScreenHandler}/>
  }
  if (currScreen==15){
    screen = <AssignSet className={className}rid={rid} qInfo={qInfo} setQInfo={setQInfo} setScreen = {setScreenHandler} classDetails ={classDetails}/>
  }
  if (currScreen==16){
    screen = <AddSetClass classDetails={classDetails} setClassDetails={setClassDetails}className={className}rid={rid} qInfo={qInfo} setQInfo={setQInfo} setScreen = {setScreenHandler} qList ={courseGoals} setQList={setGoalsHanlder}/>
  }
  if (currScreen==17){
    screen = <SwipeAddSetClass classDetails={classDetails} setClassDetails={setClassDetails}className={className}rid={rid} qInfo={qInfo} setQInfo={setQInfo} setScreen = {setScreenHandler} qList ={courseGoals} setQList={setGoalsHanlder}/>
  }
  if (currScreen==18){
    screen = <GradingStudList setFInfo={setFInfo}setStudent={setStudent} rid={rid}classDetails={classDetails} setClassDetails={setClassDetails}className={className}rid={rid} qInfo={qInfo} setQInfo={setQInfo} setScreen = {setScreenHandler} qList ={courseGoals} setQList={setGoalsHanlder}/>
  }
  if (currScreen==19){
    screen = <ClassSelectCustom setQInfo={setQInfo} qInfo ={qInfo} setScreen={setScreenHandler}/>
  }
  if (currScreen==20){
    screen = <LeaveFeedback fInfo={fInfo} student={student} classDetails={classDetails} setClassDetails={setClassDetails}className={className}rid={rid} qInfo={qInfo} setQInfo={setQInfo} setScreen = {setScreenHandler} qList ={courseGoals} setQList={setGoalsHanlder}/>
  }
  if (currScreen==21){
    screen = <ViewFeedback fInfo={fInfo} student={student} classDetails={classDetails} setClassDetails={setClassDetails}className={className}rid={rid} qInfo={qInfo} setQInfo={setQInfo} setScreen = {setScreenHandler} qList ={courseGoals} setQList={setGoalsHanlder}/>
  }
  //screen =<AddCustomSet setScreen = {setScreenHandler} qList ={courseGoals} setQList={setGoalsHanlder}/>
  const {width,height} = Dimensions.get("screen");
  var space = 64;
  Platform.select({
    web: space+=110
  });
  return (
    <View style={{height:height-space+64}}>
      <View style={{height:height-space}}>
        {screen}
      </View>
    <View style={{justifyContent:'flex-end'}}>
      <MenuBar goClassroom={goClassroomHandler} setScreen ={setScreenHandler} screen ={currScreen} colorList={colorList}></MenuBar>
    </View>
    </View>
  );


}
