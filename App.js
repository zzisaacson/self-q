import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList } from 'react-native';
import Home from './screens/Home' 
import AddSet from './screens/AddSet';

import firebase from 'firebase';
import { firebaseConfig } from './components/config';
firebase.initializeApp(firebaseConfig);
const db = firebase.database();


export default function App() { 
  
  const [isAddMode, setIsAddMode]= useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  const setGoalsHanlder=goals=>{
    db.ref().set(goals);
    return setCourseGoals(goals)
  }

  screen = <Home setScreen = {setIsAddMode} qList ={courseGoals} setQList={setCourseGoals}/>
  if (isAddMode){
    screen = <AddSet setScreen = {setIsAddMode} qList ={courseGoals} setQList={setGoalsHanlder}/>
  }
  return (
    screen
  );
}
