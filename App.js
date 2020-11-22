import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView, FlatList } from 'react-native';
import Home from './screens/Home' 
import AddSet from './screens/AddSet';
import AddCustomSet from './screens/AddCustomSet';
import Login from './screens/Login';
import Tab from './components/Tab';
import MenuBar from './components/MenuBar';
import TypeSelect from './screens/TypeSelect';


import firebase from 'firebase';
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
  const [qList, setQList]= useState(4);
  const [courseGoals, setCourseGoals] = useState([]);
  const [colorList, setColorList] = useState(['lightgrey','lightgrey','lightgrey','lightblue']); 

  //console.log(firebase.auth().currentUser.uid)
  const setGoalsHanlder=goals=>{
    //console.log(firebase.auth().currentUser.uid)
    db.ref(firebase.auth().currentUser.uid+'/set-list').set(goals);
    return setCourseGoals(goals)
  }

  const setScreenHandler=screen=>{
    var cList = [];
    if(screen == 0){
      cList= ['lightblue','lightgrey','lightgrey','lightgrey'];
    }
    else if(screen==1){
      cList= ['lightgrey','lightblue','lightgrey','lightgrey'];
    }
    else if(screen==2){
      cList= ['lightgrey','lightgrey','lightblue','lightgrey'];
    }
    else if(screen==3) {
      cList= ['lightgrey','lightgrey','lightgrey','lightblue'];
    }
    else{
      cList= ['lightgrey','lightblue','lightgrey','lightgrey'];
    }
    setColorList(cList)
    return setScreen(screen)
  }
  screen = <Home setScreen = {setScreenHandler} qList ={courseGoals} setQList={setGoalsHanlder} setNoDB={setCourseGoals}/>
  if (currScreen==1 ){
    screen = <AddSet answers={answers} prompList= {qList} setScreen = {setScreenHandler} qList ={courseGoals} setQList={setGoalsHanlder}/>
  }
  if (currScreen==2){
    screen = <Login setScreen = {setScreen}/>
  }
  if (currScreen==4){
    screen = <TypeSelect setQList={setQList} setScreen = {setScreen}/>
  }
  //screen =<AddCustomSet setScreen = {setScreenHandler} qList ={courseGoals} setQList={setGoalsHanlder}/>
  const {width,height} = Dimensions.get("screen");
  return (
    <View style={{height:height}}>
      {screen}

      <MenuBar style={{justifyContent:'flexEnd', position:'absolute'}}setScreen ={setScreenHandler} screen ={currScreen} colorList={colorList}></MenuBar>
    </View>
  );
}
