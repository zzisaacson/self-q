import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList } from 'react-native';
import Home from './screens/Home' 
import AddSet from './screens/AddSet';
import Login from './screens/Login';
import Tab from './components/Tab';

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
  const [courseGoals, setCourseGoals] = useState([]);

  const setGoalsHanlder=goals=>{
    db.ref().set(goals);
    return setCourseGoals(goals)
  }
  console.log("here");
  screen = <Home setScreen = {setScreen} qList ={courseGoals} setQList={setGoalsHanlder}/>
  if (currScreen==1 ){
    screen = <AddSet setScreen = {setScreen} qList ={courseGoals} setQList={setGoalsHanlder}/>
  }
  if (currScreen==2){
    screen = <Login setScreen = {setScreen}/>
  }
  return (
    <View>
      {screen}
      <View style={{flexDirection:'row'}}>
        <Tab setScreen = {setScreen} screen={0}></Tab>
        <Tab setScreen = {setScreen} screen={0}></Tab>
        <Tab setScreen = {setScreen} screen={0}></Tab>
        <Tab setScreen = {setScreen} screen={0}></Tab>
      </View>
    </View>
  );
}
