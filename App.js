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

  if (screen==2 && firebase.auth().currentUser!=null){
    setScreen(0);
  }

  //console.log(firebase.auth().currentUser.uid)
  const setGoalsHanlder=goals=>{
    //console.log(firebase.auth().currentUser.uid)
    db.ref(firebase.auth().currentUser.uid+'/set-list').set(goals);
    return setCourseGoals(goals);
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
    else if(false){
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
    screen = <SwipeAddSet db={db} rid={rid} qList={courseGoals} setQList={setGoalsHanlder} setQInfo={setQInfo} qInfo ={qInfo} setScreen={setScreenHandler}/>
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
      <MenuBar setScreen ={setScreenHandler} screen ={currScreen} colorList={colorList}></MenuBar>
    </View>
    </View>
  );


}
